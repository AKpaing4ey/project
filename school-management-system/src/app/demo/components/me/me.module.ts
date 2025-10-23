import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeRoutingModule } from './me-routing.module';
import { MeComponent } from './me.component';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        MeRoutingModule,
        FormsModule
    ],
    declarations: [MeComponent]
})
export class MeModule { }
