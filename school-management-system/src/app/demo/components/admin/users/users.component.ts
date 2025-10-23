import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {TableService} from 'primeng/table';
import {StService} from 'src/app/demo/service/st.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [MessageService, TableService]
})
export class UsersComponent implements OnInit {

  roleLists: any;

  selectedProduct:any;

  userName: any;

  disabled: boolean = false;

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  formGroup: any;

  selectedRole: any;

  submitted: boolean = false;

  addOrUpdate: boolean = false;

  rows = 10;

  Users: any;

  Roles: any;

  name: any;

  phone: any;

  role_id: any;

  user_id: any;

  email: any;

  password: any;

  address :any;

  status: any;


  constructor(private http: StService, private msgService: MessageService, private router: Router) {
    this.http.getString('user_id').then((result) => {
      if (result == null) {
        this.router.navigateByUrl('/auth/login');
      }
    })
  }



  ngOnInit(): void {

    this.allUsers();

    this.allRoles();
  }

    allRoles(){
        this.http.allRoles().subscribe(
            (res: any) => {
                this.Roles = res.data;
            },
            (error: any) => {
                this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(error.name), detail: 'Internet Server Error' })
            }
        )
    }

  allUsers() {
      this.http.allUser().subscribe(
          (response: any) => {
              let Users = response.data;
              this.Users = Users.reverse();
          },
          (error: any) => {
              this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(error.name), detail: 'Internet Server Error' })
          }
      )
  }

  resetForm() {
      this.name = '';
      this.email = '';
      this.phone = '';
      this.address = '';
      this.password = '';
      this.status = '';
      this.role_id = '';
  }

  successAlert(message:string = 'Success') {
      this.msgService.add({ key: 'tst', severity: 'success', summary: message, detail: 'User Create Successfully' });
  }

  errorAlert(message:string = 'Error') {
      this.msgService.add({ key: 'tst', severity: 'error', summary: message, detail: 'Internet Server Error' });

  }

  newUser() {
    this.productDialog = true;
    this.resetForm();
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.resetForm();
  }

  saveUser() {
    this.disabled = false;
    this.submitted = true;

    let obj = {
      name: this.name,
      email: this.email,
      password: this.password,
      address: this.address,
      role_id: this.roleLists.id,
      phone: this.phone,
    };
    this.http.saveUser(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.successAlert(res.message);
          this.resetForm();
          this.productDialog = false;
          this.submitted = false;
          this.disabled = false;
          this.allUsers();

        }
      },
      (err: any) => {
        this.errorAlert(err);
        this.disabled = false;
      }
    )
  };

  editProduct(data: any) {
    this.productDialog = true;
    this.addOrUpdate = true;
    this.name = data.name;
    this.email = data.email;
    this.selectedRole = data;
    this.roleLists = this.Roles.find(x => x.id == data.role_id);
    console.log(this.roleLists);
    this.phone = data.phone;
    this.userName = data.userName;
    this.user_id = data.user_id;
    this.address = data.address;
  }

  updateProduct() {

    this.submitted = true;

    let obj = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      role_id: this.roleLists.id,
      user_id: this.user_id,
      address: this.address,
    };

    this.http.updateUser(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'User Update Successfully' });

          this.name = '';
          this.email = '';
          this.phone = '';
          this.selectedRole = '';
          this.user_id = '';
          this.password = '';
          this.productDialog = false;
          this.submitted = false;
          this.addOrUpdate = false;
          this.allUsers();
        }
      }
    )
  }

  deleteProduct(obj: any) {
    this.deleteProductDialog = true;
    this.user_id = obj;
  }

  confirmDelete() {
    this.http.deleteUser(this.user_id).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'User Delete Successfully' });
          this.deleteProductDialog = false;
          this.name = '';
          this.email = '';
          this.phone = '';
          this.selectedRole = '';
          this.user_id = '';
          this.password = '';
          this.productDialog = false;
          this.submitted = false;
          this.addOrUpdate = false;
          this.http.allUser().subscribe(
            (res: any) => {
              if (res.con) {
                let Users = res.data;
                this.Users = Users.reverse();
              }
            },
            (err: any) => {
              this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(err.name), detail: 'Internet Server Error' });
            }
          )
        };
      },
      (err: any) => {
        this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(err.name), detail: 'Internet Server Error' });
      }
    )
  }
}
