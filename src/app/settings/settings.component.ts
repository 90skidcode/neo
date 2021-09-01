import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api/api.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings!: FormGroup;
  constructor(private route: ActivatedRoute, private api: ApiService, private messageService: MessageService,private spinner: NgxSpinnerService, private router: Router) {
  }

  ngOnInit(): void {
    this.api.checkAdmin();
    this.settings = new FormGroup({
      "admin_user_password": new FormControl("", Validators.required)
    });
  }


  addsettings() {
      this.spinner.show();
      let addData = {
        'query': 'update',
        'key': 'admin_user',
        'values': {},
        'condition': {
          'admin_user_id': localStorage.getItem('adminuserId')
        }
      }
      addData['values'] = this.settings.value;
      this.api.getData(addData).subscribe(data => {
        this.spinner.hide();
        if(data.status_code == "200" )
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password Updated Succefully' });
      else
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please try again!!!' });
      });

  }

  logout(){
    this.router.navigate(["/"]);
  }

}
