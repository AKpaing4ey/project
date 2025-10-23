import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {TableService} from 'primeng/table';
import {StService} from 'src/app/demo/service/st.service';

@Component({
  selector: 'app-role',
  providers: [MessageService, TableService],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent implements OnInit {

  selectedProduct: any;

  tasks: any;

  update: any;

  create: any;

  delete: any;

  role_id: any;

  roleid: any;

  plist: any;

  sole = false;

  first: any = 0;

  userName: any;

  roleName: any;

  disabled: boolean = false;

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  editCRUDDialog: boolean = false;

  CRUD: any;

  formGroup: any;

  selectedRole: any;

  submitted: boolean = false;

  addOrUpdate: boolean = false;

  editDialog = false;

  rows = 10;

  Users: any;

  Roles: any;

  name: any;

  phone: any;

  role: any;

  user_id: any;

  email: any;

  password: any;

  constructor(private http: StService, private msgService: MessageService, private router: Router) {
  }

  ngOnInit(): void {

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

  openDialog() {
      this.editDialog = true;
      this.addOrUpdate = false;
      this.roleName = '';
      this.role_id = '';
  }

  hideDialog() {
    this.editDialog = false;
    this.submitted = false;
      this.addOrUpdate = true;
      this.roleName = '';
    this.role_id = '';
  }

  saveProduct() {

    this.disabled = false;
    this.submitted = false;

    let obj = {
      name: this.roleName,
    };

    this.http.saveRole(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'User Create Successfully' });
          console.log(res);
          this.hideDialog()
          this.allRoles();
        }
      },
      (err: any) => {
        this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(err.name), detail: 'Internet Server Error' });
        this.disabled = false;
      }
    )
  };

  editProduct(event: any) {
    this.editDialog = true;
    this.addOrUpdate = true;
    this.roleName = event.name;
    this.role_id = event.id;
    console.log(event);
  }


  updateProduct() {
    this.disabled = false;
    this.submitted = false;
    this.addOrUpdate = true;
    let obj = {
      name: this.roleName,
      id: this.role_id
    };

    this.http.updateRole(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Role Update Successfully' });
            this.hideDialog();
            this.allRoles();
        }
      }
    )
  }

  deleteProduct(obj: any) {
    this.deleteProductDialog = true;
    this.role_id = obj;
  }

  confirmDelete() {
    let obj = {
      id: this.role_id
    }
    this.http.deleteRole(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Role Delete Successfully' });
          this.deleteProductDialog = false;
          this.roleName = '';
          this.role_id = '';
          this.productDialog = false;
          this.submitted = false;
          this.addOrUpdate = false;
          this.allRoles();
        }
      },
      (err: any) => {
        this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(err.name), detail: 'Internet Server Error' });
      }
    )
  }
}
