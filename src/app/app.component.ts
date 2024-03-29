import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AppConfig } from "../environments/environment";
import { ElectronService } from "./core/services/electron/electron.service";
import { TabService } from "./core/services/tab/tab.service";
import { WeNoteService } from "./core/services/we-note/we-note.service";

@Component({
    selector: "app-root",
    template: "<router-outlet></router-outlet>"
})
export class AppComponent {
    constructor(
        public electronService: ElectronService,
        private translate: TranslateService,
        private wnService: WeNoteService,
        private tabService: TabService
    ) {
        translate.setDefaultLang("en");
        console.log("AppConfig", AppConfig);

        if (electronService.isElectron) {
            console.log(process.env);
            console.log("Mode electron");
            console.log("Electron ipcRenderer", electronService.ipcRenderer);
            console.log("NodeJS childProcess", electronService.childProcess);
        } else {
            console.log("Mode web");
        }

        this.wnService.initAppConfig();
        this.tabService.activeCachedTab();
    }
}
