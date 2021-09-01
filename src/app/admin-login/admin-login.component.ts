import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api/api.service';
import { MessageService } from 'primeng/api';
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

  constructor(private route: ActivatedRoute, private api: ApiService, private messageService: MessageService, private spinner: NgxSpinnerService, private router: Router) {
  }

  ngOnInit(): void {
    this.api.clearSessionAndLocal();
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
      if (res.length == 1) {
        localStorage.setItem("adminuserId", res[0].admin_user_id);
        sessionStorage.setItem("login", res[0].admin_user_id);
        this.router.navigate(['/admin-dashboard']);
      }else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please check the user name and password' });
      }
    });
  }

}


