import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckInOutComponent } from './check-in-out/check-in-out.component';
import { StudentAnnouncementsComponent } from './announcements/student-announcements.component';

const routes: Routes = [
  { path: 'announcements', component: StudentAnnouncementsComponent },
  { path: 'check-in-out', component: CheckInOutComponent },
  { path: '', redirectTo: 'announcements', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
