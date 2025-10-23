import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TableService } from 'primeng/table';
import { StService } from 'src/app/demo/service/st.service';

@Component({
  selector: 'app-pcode',
  providers: [MessageService, TableService],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss'
})
export class AnnouncementComponent {

  selectedStatus: any;

  title: any;

  content: any;

  Announcements: any[];

  active = [
    { status: true }, { status: false }
  ]

  disabled: boolean = false;

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  formGroup: any;

  submitted: boolean = false;

  addOrUpdate: boolean = false;

  rows = 10;

    notice_id :any;

  constructor(private http: StService, private msgService: MessageService, private router: Router) {

    this.http.getString('user_id').then((result) => {
      if (result == null) {
        this.router.navigateByUrl('/auth/login');
      }
    })
  }



  ngOnInit(): void {

    this.allList();


  }

    editProduct(data) {
        this.productDialog = true;
        this.addOrUpdate = true;
        this.title = data.title;
        this.notice_id = data.id;
        this.content = data.content;
        this.selectedStatus = { status: data.status };
        console.log(this.selectedStatus);
    }

  openDialog() {
    if (this.productDialog == false) {
      this.productDialog = true;
      this.addOrUpdate = false;
    }
  }

  hideDialog() {

    this.productDialog = false;
    this.submitted = false;
    this.addOrUpdate = false;
  }
  saveProduct() {

    this.disabled = true;
    this.submitted = true;

    let obj = {
      title: this.title,
      content: this.content,
      status: this.selectedStatus.status,
    };
    console.log(obj);
    this.http.saveAnnouncement(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Filter Create Successfully' });
          this.productDialog = false;
          this.submitted = false;
          this.disabled = false;

          this.allList();
        }
      },
      (err: any) => {
        this.error(err, false);
        this.disabled = false;
      }
    )
  };


  updateProduct() {

    this.submitted = true;

      let obj = {
          title: this.title,
          content: this.content,
          status: this.selectedStatus.status,
          id: this.notice_id
      };
    this.http.updateAnnouncement(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.error(res, true);
          this.productDialog = false;
          this.submitted = false;
          this.addOrUpdate = false;
          this.allList();
        }
      }
    )
  }

  deleteProduct(id: any) {
    this.deleteProductDialog = true;
    this.notice_id = id;
  }

  confirmDelete() {
      let obj = {
          id: this.notice_id,
      }
      console.log(obj);
    this.http.deleteAnnouncement(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.error(res, true);
          this.deleteProductDialog = false;
          this.productDialog = false;
          this.submitted = false;
          this.addOrUpdate = false;
          this.productDialog = false;
          this.submitted = false;
          this.addOrUpdate = false;
          this.allList();
        };
      },
      (err: any) => {
        this.error(err, false);
      }
    )
  }


  allList() {
      this.http.allAnnouncement().subscribe(
          (res: any) => {
              this.Announcements = res.data;
          },
          (err: any) => {
              this.error(err, false);
          }
      )
  }

  error(e: any, status: any) {
    if (status == true) {
      this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Successfully' });
    } else {
      this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(e.name), detail: 'Internet Server Error' })
    }
  }
}
