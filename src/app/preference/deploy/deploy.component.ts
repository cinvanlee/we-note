import { Component, OnInit } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd";
import { HexoService } from "../../core/services/hexo/hexo.service";
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
    hexoServerLoading = false;

    constructor(
        private wnService: WeNoteService,
        private hexoService: HexoService,
        private notify: NzNotificationService
    ) {}

    ngOnInit() {
        this.initPageData();
    }

    async initPageData() {
        this.blogEngine = await this.wnService.getAppConfigByKey("blogEngine");
        this.hexo = await this.wnService.getAppConfigByKey("hexo");
        this.isHexoInstalled = this.hexoService.isHexoInstalled();
    }

    openPostsDirInFinder() {
        this.wnService.openInFinder(this.hexo.dir);
    }

    initHexo() {
        this.initLoading = true;
        setTimeout(async () => {
            try {
                const res = await this.hexoService.init();
                if (res.success) {
                    this.notify.success(res.message, res.data);
                } else {
                    this.notify.error(res.message, res.data);
                }
            } catch (e) {
                this.notify.error(e.message, e.data);
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

    startHexoServer() {
        this.hexoServerLoading = true;
        setTimeout(async () => {
            try {
                const res = await this.hexoService.startHexoServer();
                if (res.success) {
                    this.notify.success(res.message, res.data);
                } else {
                    this.notify.error(res.message, res.data);
                }
                this.hexoServerLoading = false;
            } catch (e) {
                this.hexoServerLoading = false;
                this.notify.error(e.message, e.data);
            }
        }, 200);
    }
}
