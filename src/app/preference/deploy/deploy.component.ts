import { Component, OnInit } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd";
import { HexoService } from "../../core/services/hexo/hexo.service";
import { TabService } from "../../core/services/tab/tab.service";
import { IHexo } from "../../core/services/we-note/we-note.interface";
import { WeNoteService } from "../../core/services/we-note/we-note.service";

@Component({
    selector: "app-deploy",
    templateUrl: "./deploy.component.html",
    styleUrls: ["./deploy.component.less"]
})
export class DeployComponent implements OnInit {
    blogEngine = "";
    hexo: IHexo;
    isHexoInstalled = false;
    initLoading = false;
    deployLoading = false;
    config = {};

    constructor(
        private wnService: WeNoteService,
        private hexoService: HexoService,
        private notify: NzNotificationService,
        private tabService: TabService
    ) {}

    ngOnInit() {
        this.initPageData();
    }

    async initPageData() {
        this.blogEngine = await this.wnService.getAppConfigByKey("blogEngine");
        this.hexo = await this.wnService.getAppConfigByKey("hexo");
        this.isHexoInstalled = this.hexoService.isHexoInstalled();
        this.config = await this.hexoService.getConfig();
    }

    openPostsDirInFinder() {
        this.wnService.openInFinder(this.hexo.dir);
    }

    initHexo() {
        this.initLoading = true;
        setTimeout(async () => {
            try {
                await this.hexoService.init();
                this.notify.success("SUCCESS", "Hexo installed.");
            } catch (e) {
                this.notify.error("ERROR", e.message);
            }
            this.initLoading = false;
            this.isHexoInstalled = this.hexoService.isHexoInstalled();
        }, 200);
    }

    async deploy() {
        this.deployLoading = true;
        await this.hexoService.note2hexo();
        this.deployLoading = false;
    }

    async startHexoServer() {
        try {
            await this.hexoService.startHexoServer();
            this.notify.success("SUCCESS", "Hexo server started.");
        } catch (e) {
            this.notify.error("ERROR", e.message);
        }
    }

    async stopHexoServer() {
        try {
            await this.hexoService.stopHexoServer();
        } catch (e) {
            this.notify.error("ERROR", e.message);
        }
    }

    previewHexo() {
        this.tabService.openWebview({
            path: "http://localhost:4000",
            name: "HEXO"
        });
    }

    async saveConfig() {
        try {
            await this.hexoService.saveConfig(this.config);
            this.notify.success("SUCCESS", "Hexo config saved.");
        } catch (e) {
            this.notify.error("ERROR", e.message);
        }
    }
}
