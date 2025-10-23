import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StService } from 'src/app/demo/service/st.service';

@Component({
  selector: 'app-check-in-out',
  templateUrl: './check-in-out.component.html',
  styleUrls: ['./check-in-out.component.scss']
})
export class CheckInOutComponent implements OnInit {
  
  user_id: any;
  user_name: any;
  user_role: any;
  checkInTime: any;
  checkOutTime: any;
  selectedClass: any;
  classes: any[] = [];
  attendanceRecords: any[] = [];
  todayAttendance: any = null;
  
  constructor(
    private http: StService, 
    private msgService: MessageService, 
    private router: Router
  ) {
    this.checkAuth();
  }

  ngOnInit(): void {
    this.loadUserData();
    this.loadClasses();
    this.loadTodayAttendance();
  }

  checkAuth() {
    this.http.getString('user_id').then((result) => {
      if (result == null) {
        this.router.navigateByUrl('/auth/login');
      }
    });
  }

  loadUserData() {
    this.http.getString('user_id').then((id) => {
      this.user_id = id;
      console.log('Loaded user_id:', this.user_id);
    });
    this.http.getString('name').then((name) => {
      this.user_name = name;
      console.log('Loaded user_name:', this.user_name);
    });
    this.http.getString('role').then((role) => {
      this.user_role = role;
      console.log('Loaded user_role:', this.user_role);
    });
  }

  loadClasses() {
    this.http.allClass().subscribe(
      (res: any) => {
        if (res.con) {
          this.classes = res.data;
        }
      },
      (err: any) => {
        console.error('Error loading classes:', err);
      }
    );
  }

  loadTodayAttendance() {
    this.http.allAttendance().subscribe(
      (res: any) => {
        console.log('Attendance response:', res);
        if (res.con) {
          this.attendanceRecords = res.data;
          this.findTodayAttendance();
        } else {
          console.log('Attendance API returned con: false');
        }
      },
      (err: any) => {
        console.error('Error loading attendance:', err);
        this.msgService.add({ 
          key: 'tst', 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Failed to load attendance data' 
        });
      }
    );
  }

  findTodayAttendance() {
    const today = new Date().toDateString();
    console.log('Looking for today\'s attendance:', today);
    console.log('User ID:', this.user_id);
    console.log('All attendance records:', this.attendanceRecords);
    
    this.todayAttendance = this.attendanceRecords.find(record => {
      // Try different possible date fields
      const recordDate1 = record.created_at ? new Date(record.created_at).toDateString() : null;
      const recordDate2 = record.since ? new Date(record.since).toDateString() : null;
      const recordDate3 = record.date ? new Date(record.date).toDateString() : null;
      
      console.log('Checking record:', record);
      console.log('created_at:', recordDate1);
      console.log('since:', recordDate2);
      console.log('date:', recordDate3);
      console.log('user:', record.user);
      
      // Check if any date matches today and user matches
      const dateMatches = recordDate1 === today || recordDate2 === today || recordDate3 === today;
      const userMatches = record.user == this.user_id || record.user_id == this.user_id;
      
      console.log('Date matches:', dateMatches);
      console.log('User matches:', userMatches);
      
      return dateMatches && userMatches;
    });
    
    console.log('Found today\'s attendance:', this.todayAttendance);
  }

  checkIn() {
    if (!this.selectedClass) {
      this.msgService.add({ 
        key: 'tst', 
        severity: 'warn', 
        summary: 'Warning', 
        detail: 'Please select a class before checking in' 
      });
      return;
    }

    if (!this.user_id) {
      this.msgService.add({ 
        key: 'tst', 
        severity: 'error', 
        summary: 'Error', 
        detail: 'User not authenticated. Please login again.' 
      });
      this.router.navigateByUrl('/auth/login');
      return;
    }

    const now = new Date();
    const obj = {
      user: this.user_id,
      checkIn_time: now,
      checkOut_time: null,
      class_obj: this.selectedClass.id,
      approve_by: null // Will be set by admin later
    };

    console.log('Check-in data:', obj);

    this.http.saveAttendance(obj).subscribe(
      (res: any) => {
        console.log('Check-in response:', res);
        if (res.con) {
          this.msgService.add({ 
            key: 'tst', 
            severity: 'success', 
            summary: 'Success', 
            detail: 'Check-in successful!' 
          });
          this.loadTodayAttendance();
        } else {
          this.msgService.add({ 
            key: 'tst', 
            severity: 'error', 
            summary: 'Error', 
            detail: res.msg || 'Check-in failed' 
          });
        }
      },
      (err: any) => {
        console.error('Check-in error:', err);
        this.msgService.add({ 
          key: 'tst', 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Check-in failed. Please try again.' 
        });
      }
    );
  }

  checkOut() {
    if (!this.todayAttendance) {
      this.msgService.add({ 
        key: 'tst', 
        severity: 'warn', 
        summary: 'Warning', 
        detail: 'No check-in record found for today' 
      });
      return;
    }

    const now = new Date();
    const obj = {
      id: this.todayAttendance.id,
      checkOut_time: now
    };

    this.http.updateAttendance(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ 
            key: 'tst', 
            severity: 'success', 
            summary: 'Attendance Complete!', 
            detail: 'You have successfully completed your attendance for today!' 
          });
          this.loadTodayAttendance();
        } else {
          this.msgService.add({ 
            key: 'tst', 
            severity: 'error', 
            summary: 'Error', 
            detail: res.msg || 'Check-out failed' 
          });
        }
      },
      (err: any) => {
        this.msgService.add({ 
          key: 'tst', 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Check-out failed. Please try again.' 
        });
      }
    );
  }

  // Custom time conversion function to handle timezone issues
  convertToMyanmarTime(dateString: any): string {
    if (!dateString) return '';
    
    try {
      console.log('Original time:', dateString);
      
      // Create date object
      const date = new Date(dateString);
      console.log('Date object:', date);
      console.log('UTC time:', date.toISOString());
      
      // Add 6.5 hours to convert from UTC to Myanmar time
      const myanmarTime = new Date(date.getTime() + (6.5 * 60 * 60 * 1000));
      console.log('Myanmar time:', myanmarTime);
      
      // Format as h:mm AM/PM
      const formattedTime = myanmarTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      
      console.log('Formatted time:', formattedTime);
      return formattedTime;
    } catch (error) {
      console.error('Error converting time:', error);
      return dateString;
    }
  }

  logout() {
    this.http.removeString('user_id');
    this.http.removeString('role');
    this.http.removeString('email');
    this.http.removeString('name');
    this.router.navigateByUrl('/auth/login');
  }
}
