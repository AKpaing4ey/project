import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing.module';
import { CheckInOutComponent } from './check-in-out/check-in-out.component';
import { StudentAnnouncementsComponent } from './announcements/student-announcements.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    CheckInOutComponent,
    StudentAnnouncementsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StudentRoutingModule,
    ButtonModule,
    CardModule,
    ToastModule,
    CalendarModule,
    InputTextModule,
    DropdownModule
  ],
  providers: [MessageService]
})
export class StudentModule { }
