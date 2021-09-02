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
    candidate_mobile: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    candidate_email: new FormControl('', [Validators.required, Validators.pattern("^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$")]),
    candidate_book_code: new FormControl(''),
    candidate_password: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private api: ApiService, private spinner: NgxSpinnerService, private messageService: MessageService) {
    this.api.clearSessionAndLocal();
  }

  ngOnInit(): void {
    this.api.clearSessionAndLocal();
  }

  userRegister() {
    this.spinner.show();
      let data = this.userRegisterForm.value;
      data['list_key'] = "CandidateInsert";      
      this.api.getData(data, 'services.php').subscribe((res) => {
        this.spinner.hide();
        if (res.status_code == '200'){
          this.router.navigate(['/user-login']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "User resister Successfully !! Please Login!!" });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        }
      })
    }
}