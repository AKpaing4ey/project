import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'user', data: { breadcrumb: 'Button' }, loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
    { path: 'class', data: { breadcrumb: 'Button' }, loadChildren: () => import('./class/class.module').then(m => m.ClassModule) },
    { path: 'role', data: { breadcrumb: 'Button' }, loadChildren: () => import('./roles/role.module').then(m => m.RoleModule) },
  { path: 'attendance', data: { breadcrumb: 'Button' }, loadChildren: () => import('./attendance/attendance.module').then(m => m.AttendanceModule) },
  { path: 'announcement', data: { breadcrumb: 'Button' }, loadChildren: () => import('./announcement/announcement.module').then(m => m.AnnouncementModule) },
  { path: '**', redirectTo: '/notfound' }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
