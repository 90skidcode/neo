import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm = new FormGroup({
    userPhone: new FormControl("", Validators.required),
    userPassword: new FormControl("", Validators.required),
  });

  constructor(private router: Router, private api: ApiService, private spinner: NgxSpinnerService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.api.clearSessionAndLocal();
  }

  login() {
    this.spinner.show();
    let data = {
      'query': 'fetch',
      'key': 'candidate_master',
      'column': {
        'candidate_master_id': 'candidate_master_id'
      },
      'condition': {
        'candidate_mobile': this.loginForm.get('userPhone')?.value,
        'candidate_password': this.loginForm.get('userPassword')?.value
      }
    }

    this.api.getData(data).subscribe((res) => {
      this.spinner.hide();
      if (res.length == '1') {
        localStorage.setItem("userId", res[0].candidate_master_id);
        sessionStorage.setItem("login", res[0].candidate_master_id);
        this.router.navigate(['/user-dashboard']);
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong. Please try Again!!' });
      }
    })

  }


}
