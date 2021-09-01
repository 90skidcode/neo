import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  userRegisterForm = new FormGroup({
    candidate_name: new FormControl('', Validators.required),
    candidate_mobile: new FormControl('', Validators.required),
    candidate_email: new FormControl('', Validators.required),
    candidate_book_code: new FormControl(''),
    candidate_password: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private api: ApiService,private spinner: NgxSpinnerService, private messageService: MessageService) {
  }

  ngOnInit(): void {

  }

  userRegister() {
    this.spinner.show();
    let data = {
      'query': 'add',
      'key': 'candidate_master',
      'values': {}
    }
    data['values'] = this.userRegisterForm.value
    this.api.getData(data).subscribe((res) => {
      this.spinner.hide();
      if (res.status_code == '200')
        this.router.navigate(['/user-dashboard']);
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong. Please try Again!!' });
       }
    })

  }

}