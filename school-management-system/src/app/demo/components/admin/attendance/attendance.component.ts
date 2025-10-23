import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TableService } from 'primeng/table';
import { StService } from 'src/app/demo/service/st.service';

@Component({
  selector: 'app-attendance',
  providers: [MessageService, TableService],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent {

  userManage: boolean = false;

  roleManage: boolean = false;

  languageManage: boolean = false;

  tableManage: boolean = false;

  colorManage: boolean = false;

  attendance_id: any;

  filterManage: boolean = false;

  tableSync: boolean = false;

  tableFetch: boolean = false;

  tableInsert: boolean = false;

  selectedProduct: any;

  role_id: any;

  first: any = 0;

  userName: any;

  roleName: any;

  selectedUsers: any;

  disabled: boolean = false;

  Class:any;

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  formGroup: any;

  selectedApprovedBy: any;

  selectedClass: any;

  selectedUser: any;

  key: any;

  value: any;

  submitted: boolean = false;

  addOrUpdate: boolean = false;

  create: any;
  update: any;
  delete: any;

  rows = 10;

  Users: any;

  Attendance: any;

  name: any;

  phone: any;

  role: any;

  user_id: any;

  email: any;

  password: any;

  checkIn :any;
  checkOut: any;
  constructor(private http: StService, private msgService: MessageService, private router: Router) {

    this.http.getString('user_id').then((result) => {
      console.log(result);
      if (result == null) {
        this.router.navigateByUrl('/auth/login');
      }
    })
  }

  // Custom time conversion function to handle timezone issues
  convertToMyanmarTime(dateString: any): string {
    if (!dateString) return '';
    
    try {
      // Create date object
      const date = new Date(dateString);
      
      // Add 6.5 hours to convert from UTC to Myanmar time
      const myanmarTime = new Date(date.getTime() + (6.5 * 60 * 60 * 1000));
      
      // Format as h:mm AM/PM
      return myanmarTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error converting time:', error);
      return dateString;
    }
  }

  ngOnInit(): void {
    this.allAttendance();
    this.allUser();
    this.allClass();
  }

  allUser(){
      this.http.allUser().subscribe(
          (res:any)=>{
              this.Users = res.data;
          },
          (err:any) => {
              console.log(err);
          }
      )
  }

  openDialog() {
    if (this.productDialog == false) {
      this.productDialog = true;
      this.addOrUpdate = false;
      this.selectedApprovedBy = '';
      this.selectedUser = '';
      this.selectedUsers = '';
      this.key = '';
      this.value = '';
      this.userManage = false;
      this.roleManage = false;
      this.languageManage = false;
      this.tableManage = false;
      this.colorManage = false;
      this.filterManage = false;
      this.tableSync = false;
      this.tableFetch = false;
      this.tableInsert = false;
    }
  }

  hideDialog() {

    this.productDialog = false;
    this.submitted = false;
    this.roleName = '';
    this.key = '';
    this.value = '';
    this.selectedUser = '';
    this.userManage = false;
    this.roleManage = false;
    this.languageManage = false;
    this.tableManage = false;
    this.colorManage = false;
    this.filterManage = false;
    this.tableSync = false;
    this.tableFetch = false;
    this.tableInsert = false;
    this.productDialog = false;
    this.submitted = false;
    this.addOrUpdate = false;
  }

  saveProduct() {
    this.disabled = true;
    this.submitted = true;
    let obj = {
        approve_by: this.selectedApprovedBy.user_id,
        user: this.selectedUser.user_id,
        checkIn_time: this.checkIn,
        checkOut_time: this.checkOut,
        class_obj: this.selectedClass.id,
    };

    this.http.saveAttendance(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Create Successfully' });
          this.dialogClose("Save");
        }
      },
      (err: any) => {
        this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(err.name), detail: 'Internet Server Error' });
        this.disabled = false;
      }
    )
  };


  deleteProduct(obj: any) {
    this.deleteProductDialog = true;
    this.attendance_id = obj;
  }

  confirmDelete() {
    let obj = {
      id: this.attendance_id
    }
    this.http.deleteAttendance(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Delete Successfully' });
          this.allAttendance();
          this.dialogClose("Delete");
        };
      },
      (err: any) => {
        this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(err.name), detail: 'Internet Server Error' });
      }
    )
  }

  dialogClose(type: any) {

    if (type === "Update") {

      this.submitted = false;
      this.productDialog = false;
      this.addOrUpdate = false;
      this.disabled = false;
      this.allAttendance();

    }
    else if (type === "Save") {

      this.productDialog = false;
      this.submitted = false;
      this.addOrUpdate = false;
      this.disabled = false;
      this.allAttendance();

    }
    else if (type === "Delete") {
      this.deleteProductDialog = false;
      this.productDialog = false;
      this.submitted = false;
      this.addOrUpdate = false;
      this.productDialog = false;
      this.submitted = false;
      this.addOrUpdate = false;
      this.allAttendance();

    }
    this.productDialog = false;
  }

  allAttendance() {
    this.http.allAttendance().subscribe(
      (res: any) => {
        if (res.con) {
          let System = res.data;
          this.Attendance = System.reverse();
        }
      },
      (err: any) => {
        this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(err.name), detail: 'Internet Server Error' });
      }
    )
  }

    allClass() {
        this.http.allClass().subscribe(
            (res: any) => {
                if (res.con) {
                    let System = res.data;
                    this.Class = System.reverse();
                }
            },
            (err: any) => {
                this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(err.name), detail: 'Internet Server Error' });
            }
        )
    }
}
