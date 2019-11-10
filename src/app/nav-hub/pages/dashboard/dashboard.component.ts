import { Component, OnInit } from '@angular/core';
import { NavHubService } from '../../services/nav-hub.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
    sites: any;

    constructor(private navService: NavHubService) {
    }

    ngOnInit() {
        this.sites = this.navService.sites;
    }

}
