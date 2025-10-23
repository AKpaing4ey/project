import { Component, OnInit } from '@angular/core';
import { StService } from '../../service/st.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  username = '';
  role: any;
  email = '';
  port: any;
  DCF: any = `C:\\eStream\\SQLAccounting\\Share\\Default.DCF`;
  portInput = true;
  DCFBool = true;
  edit = true;
  conn = false;
  editDCF = true;
  connDCF = false;
  constructor(private ST: StService, private http: StService, private router: Router) {
    this.http.getString('user_id').then((result) => {
      console.log(result);
      if (result == null || result == undefined) {
        this.router.navigateByUrl('/auth/login');
      }
    })
  }



  ngOnInit(): void {
    console.log(this.DCF)
    this.ST
      .getString('name')
      .then((result) => {
        this.username = result;
      })
      .catch((error) => {
        console.log(error);
      });

    this.ST
      .getString('email')
      .then((result) => {
        this.email = result;
      })
      .catch((error) => {
        console.log(error);
      });

    this.ST
      .getString('role')
      .then((result) => {
        this.role = result;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
