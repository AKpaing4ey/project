import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { StService } from '../demo/service/st.service';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    productTitle: any;

    en = 'en';

    langBool = false;


    constructor(public layoutService: LayoutService, private stS: StService) {
    }

    ngOnInit(): void {
        this.productTitle = localStorage.getItem('9');
    }

}
