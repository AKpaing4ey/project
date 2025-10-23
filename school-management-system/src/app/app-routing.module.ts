import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', redirectTo: 'admin/user', pathMatch: 'full' },
                    { path: 'documentation', loadChildren: () => import('./demo/components/me/me.module').then(m => m.MeModule) },
                    { path: 'admin', loadChildren: () => import('./demo/components/admin/admin.module').then(m => m.AdminModule) },
                    { path: 'student', loadChildren: () => import('./demo/components/student/student.module').then(m => m.StudentModule) },
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
