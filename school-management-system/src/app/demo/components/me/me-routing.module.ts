import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MeComponent } from './me.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: MeComponent }
    ])],
    exports: [RouterModule]
})
export class MeRoutingModule { }
