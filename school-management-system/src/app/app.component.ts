import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { StService } from './demo/service/st.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent{

    constructor(private primengConfig: PrimeNGConfig, private http: StService) {
        this.primengConfig.ripple = true;

    }
}
