import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableService } from 'primeng/table';
import { StService } from 'src/app/demo/service/st.service';

@Component({
  selector: 'app-attendance',
  providers: [MessageService, TableService],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss'
})
export class ClassComponent {

  userManage: boolean = false;

  roleManage: boolean = false;

  languageManage: boolean = false;

  tableManage: boolean = false;

  colorManage: boolean = false;

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

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  formGroup: any;

  selectedRole: any;

  selectedTable: any;

  key: any;

  filterID: any;

  class_id:any;

  value: any;

  submitted: boolean = false;

  addOrUpdate: boolean = false;

  rows = 10;

  systemOption_id: any;

  Users: any;

  Class:any;

  classes  :any;

  Roles: any;

  name: any;

  phone: any;

  role: any;

  user_id: any;

  email: any;

  password: any;

  constructor(private http: StService, private msgService: MessageService) { }



  ngOnInit(): void {
    this.allClass();
  }

  allClass(){
    this.http.allClass().subscribe(
        (res:any)=>{
            this.Class = res.data;
        },
        (err:any)=>{
            console.log(err)
        }
    )
  }

  openDialog() {
    if (this.productDialog == false) {
      this.productDialog = true;
      this.addOrUpdate = false;
      this.classes = '';
    }
  }

  hideDialog() {

    this.productDialog = false;
    this.submitted = false;
    this.classes = '';
    this.addOrUpdate = false;
  }

  saveProduct() {

    this.disabled = true;
    this.submitted = true;

    let obj = {
      name: this.classes,
    };
    this.http.saveClass(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Create Successfully' });
          this.classes = '';
          this.submitted = false;
          this.disabled = false;
            this.productDialog = false;
          this.allClass();
        }
      },
      (err: any) => {
        this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(err.name), detail: 'Internet Server Error' });
        this.disabled = false;
      }
    )
  };

  editProduct(data) {
      this.productDialog = true;
      this.addOrUpdate = true;
      this.classes = data.name;
      this.class_id = data.id;
      console.log(this.classes,this.class_id);
  }

  updateProduct() {

    this.submitted = true;

    let obj = {
      name: this.classes,
      id: this.class_id,
    };
    this.http.updateClass(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Update Successfully' });
          this.selectedRole = '';
          this.selectedUsers = '';
          this.selectedTable = '';
          this.value = '';
          this.key = '';
          this.productDialog = false;
          this.submitted = false;
          this.addOrUpdate = false;

          this.allClass();
        }
      }
    )
  }

  deleteProduct(obj: any) {
    this.deleteProductDialog = true;
    this.systemOption_id = obj;
  }

  confirmDelete() {

    this.http.deleteClass(this.systemOption_id).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Delete Successfully' });
          this.deleteProductDialog = false;
          this.selectedRole = '';
          this.selectedUsers = '';
          this.selectedTable = '';
          this.key = '';
          this.value = '';
          this.productDialog = false;
          this.submitted = false;
          this.addOrUpdate = false;
          this.productDialog = false;
          this.submitted = false;
          this.addOrUpdate = false;
          this.allClass();
        };
      },
      (err: any) => {
        this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(err.name), detail: 'Internet Server Error' });
      }
    )
  }
}
