import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StService } from 'src/app/demo/service/st.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-student-announcements',
  templateUrl: './student-announcements.component.html',
  styleUrls: ['./student-announcements.component.scss']
})
export class StudentAnnouncementsComponent implements OnInit {
  
  announcements: any[] = [];
  loading: boolean = true;
  
  constructor(
    private http: StService,
    private router: Router,
    private msgService: MessageService
  ) { }

  ngOnInit(): void {
    this.checkAuth();
    this.loadActiveAnnouncements();
  }

  checkAuth() {
    this.http.getString('user_id').then((result) => {
      if (result == null) {
        this.router.navigateByUrl('/auth/login');
      }
    });
  }

  loadActiveAnnouncements() {
    this.http.allAnnouncement().subscribe(
      (res: any) => {
        this.loading = false;
        if (res.con) {
          // Filter only active announcements (status = true)
          this.announcements = res.data.filter((announcement: any) => announcement.status === true);
          
          // If no announcements, go directly to check-in/out
          if (this.announcements.length === 0) {
            this.goToCheckInOut();
          }
        } else {
          this.goToCheckInOut();
        }
      },
      (err: any) => {
        this.loading = false;
        console.error('Error loading announcements:', err);
        this.goToCheckInOut();
      }
    );
  }

  goToCheckInOut() {
    this.router.navigateByUrl('/student/check-in-out');
  }

  closeAnnouncements() {
    // Clear any stored announcements
    this.http.removeString('active_announcements');
    this.goToCheckInOut();
  }

  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  }
}
