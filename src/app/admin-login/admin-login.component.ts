import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl(''),
    userPassword: new FormControl(''),
  });

  constructor(private router: Router, private api: ApiService) {
  }

  ngOnInit(): void {

  }

  login() {
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
      if (res.length)
        this.router.navigate(['/admin-dashboard']);
      else { }
    })

  }

}


