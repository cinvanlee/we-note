import { Injectable } from "@angular/core";
import CryptoJS from "crypto-js";
import { WeNoteService } from "../we-note/we-note.service";

const jf = window.require("jsonfile");
const shell = window.require("shelljs");

interface IPwd {
    name: string;
    pwd: string;
    type?: string;
    logo?: string;
}

@Injectable({
    providedIn: "root"
})
export class PassworderService {
    flag = "WE_NOTE";

    constructor(private wnService: WeNoteService) {}

    private encrypt(data, secret) {
        let output = "";
        try {
            output = CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();
        } catch (e) {
            // ignore
        }
        return output;
    }

    private decrypt(ciphertext, secret): IPwd[] {
        const bytes = CryptoJS.AES.decrypt(ciphertext, secret);
        let output = [];
        try {
            output = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (e) {
            // ignore
        }
        return output;
    }

    isSetup() {
        const pwdDir = this.getPwdDir();
        const pwdFilePath = `${pwdDir}/pwd.json`;
        return this.wnService.isFile(pwdFilePath);
    }

    getPwdDir() {
        const appDir = this.wnService.getAppDir();
        return `${appDir}/PASSWORDER`;
    }

    getPwdFilePath() {
        const pwdDir = this.getPwdDir();
        return`${pwdDir}/pwd.json`;
    }

    async init(secret) {
        const pwdDir = this.getPwdDir();
        const pwdFilePath = this.getPwdFilePath();
        return new Promise((resolve, reject) => {
            if (this.isSetup()) {
                resolve();
                return;
            }

            const initPwdContent = {
                flag: this.encrypt(this.flag, secret),
                pwd: this.encrypt([], secret)
            };
            try {
                shell.mkdir("-p", pwdDir);
                jf.writeFileSync(pwdFilePath, initPwdContent);
                resolve();
            } catch (e) {
                reject(new Error("Init Passworder failed."));
            }
        });
    }

    async checkSecret(secret): Promise<boolean> {
        const pwdFilePath = this.getPwdFilePath();
        return new Promise((resolve, reject) => {
            try {
                const file = jf.readFileSync(pwdFilePath);
                // @ts-ignore
                resolve(this.decrypt(file.flag, secret) === this.flag);
            } catch (e) {
                reject(new Error("Check secret failed."));
            }
        });
    }

    async getPasswords(secret): Promise<IPwd[]> {
        const pwdFilePath = this.getPwdFilePath();
        return new Promise((resolve, reject) => {
            let ciphertext;
            try {
                const file = jf.readFileSync(pwdFilePath);
                ciphertext = file.pwd;
                resolve(this.decrypt(ciphertext, secret));
            } catch (e) {
                reject(new Error("Read Passworder failed."));
            }
        });
    }

    async setPasswords(rows: IPwd[], secret: string) {
        const pwdFilePath = this.getPwdFilePath();
        return new Promise((resolve, reject) => {
            try {
                const file = jf.readFileSync(pwdFilePath);
                file.pwd = this.encrypt(rows, secret);
                jf.writeFileSync(pwdFilePath, file);
                resolve();
            } catch (e) {
                reject(new Error("Init Passworder failed."));
            }
        });
    }

    async insertOne(name, pwd, secret) {
        return new Promise(async (resolve, reject) => {
            try {
                const pwds = await this.getPasswords(secret);
                pwds.push({ name, pwd });
                await this.setPasswords(pwds, secret);
                resolve();
            } catch (e) {
                reject(new Error("Insert on row failed."));
            }
        });
    }
}
