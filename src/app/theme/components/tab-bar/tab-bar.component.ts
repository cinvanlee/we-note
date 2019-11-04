import { Component, OnInit } from '@angular/core';
import { appUtil } from '../../../helper/app';

@Component({
    selector: 'app-tab-bar',
    templateUrl: './tab-bar.component.html',
    styleUrls: ['./tab-bar.component.scss']
})
export class TabBarComponent implements OnInit {
    tabBarList: any = [];

    constructor() {
    }

    async ngOnInit() {
        this.tabBarList = await appUtil.getAppConfig('tabBarList');
    }

}
