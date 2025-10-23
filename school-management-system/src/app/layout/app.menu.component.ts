import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { StService } from 'src/app/demo/service/st.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];
  userRole: string = '';
  
  constructor(public layoutService: LayoutService, private http: StService) { }

  ngOnInit() {
    this.loadUserRole();
  }

  loadUserRole() {
    this.http.getString('role').then((role) => {
      this.userRole = role || '';
      this.setupMenu();
    });
  }

  setupMenu() {
    if (this.userRole.toLowerCase() === 'student') {
      this.model = [
        {
          label: 'Student',
          items: [
            {
              label: 'Check In/Out', icon: 'pi pi-sign-in',
              routerLink: ['/student/check-in-out'],
            }
          ]
        },
        {
          label: 'Account',
          items: [
            {
              label: 'Logout', icon: 'pi pi-sign-out',
              routerLink: ['/auth/login']
            }
          ]
        }
      ];
    } else {
      // Admin/Teacher menu
      this.model = [
        {
          label: 'Users',
          items: [
            {
              label: 'User', icon: 'pi pi-id-card',
              routerLink: ['/admin/user'],
            },
            {
              label: 'Role', icon: 'pi pi-sitemap',
              routerLink: ['/admin/role'],
            },
            {
              label: 'Class', icon: 'pi pi-chart-bar',
              routerLink: ['/admin/class'],
            },
              {
                  label: 'Attendance', icon: 'pi pi-share-alt',
                  routerLink: ['/admin/attendance'],
              },

              {
                  label: 'Announcement', icon: 'pi pi-tablet',
                  routerLink: ['/admin/announcement'],
              },
          ]
        },
        {
          label: 'Account',
          items: [
            {
              label: 'Logout', icon: 'pi pi-sign-out',
              routerLink: ['/auth/login']
            }
          ]
        }
      ];
    }
  }
}
