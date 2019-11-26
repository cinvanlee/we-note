import { Component, OnInit } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd";
import { PassworderService } from "../../services/passworder/passworder.service";

@Component({
    selector: "app-passworder",
    templateUrl: "./passworder.component.html",
    styleUrls: ["./passworder.component.less"]
})
export class PassworderComponent implements OnInit {
    showLocked = false;
    showSetup = false;
    showPwds = false;

    i = 0;
    initSecret = "";
    initSecretAgain = "";
    secret = "";
    passwords = [];

    constructor(private pwdService: PassworderService, private notify: NzNotificationService) {}

    ngOnInit() {
        const isSetup = this.pwdService.isSetup();
        if (isSetup) {
            this.showLocked = true;
        } else {
            this.showSetup = true;
        }
    }

    async setup() {
        if (this.initSecret !== this.initSecretAgain) {
            this.notify.error("ERROR", "Password and Re-entered Password do not match.");
            return;
        }
        await this.pwdService.init(this.initSecret);
        this.notify.success("SUCCESS", "Passworder has been installed.");
        this.showLocked = true;
        this.showSetup = false;
    }

    async unlock() {
        const valid = await this.pwdService.checkSecret(this.secret);
        if (!valid) {
            this.notify.error("ERROR", "Incorrect password.");
            return;
        }
        this.passwords = await this.pwdService.getPasswords(this.secret);
        this.showLocked = false;
        this.showPwds = true;
    }

    async addRow() {
        this.passwords = [
            ...this.passwords,
            {
                name: "1",
                type: "",
                pwd: "",
                logo: ""
            }
        ];
        this.i++;
        console.log(this.passwords);
    }
}
