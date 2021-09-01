import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    userPassword: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private api: ApiService,private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {

  }

  login() {
    this.spinner.show();
    let data = {
      'query': 'fetch',
      'key': 'admin_user',
      'column': {
        'admin_user_id': 'admin_user_id'
      },
      'condition': {
        'admin_user_name': this.loginForm.get('userName')?.value,
        'admin_user_password': this.loginForm.get('userPassword')?.value
      }
    }

    this.api.getData(data).subscribe((res) => {
      this.spinner.hide();
      if (res.length)
        this.router.navigate(['/admin-dashboard']);
      else { }
    });
  }

}


