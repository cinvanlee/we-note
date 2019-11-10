import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: [ './layout.component.scss' ]
})
export class LayoutComponent implements OnInit {
    menus = [
        { path: '/debug/icon', name: '图标', icon: 'face' },
        { path: '/debug/material', name: 'Material', icon: 'palette' }
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
