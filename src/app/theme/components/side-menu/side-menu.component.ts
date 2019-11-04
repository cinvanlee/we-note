import { Component, OnInit } from '@angular/core';
import { appUtil } from '../../../helper/app';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
    sideMenuList: any = [];

    pathname = window.location.pathname;

    constructor() {
    }

    async ngOnInit() {
        this.sideMenuList = await appUtil.getAppConfig('sideMenuList');
    }

}
