import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api/api.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  exams: any;
  loading: boolean = false;
  constructor(private router: Router, private api: ApiService, private messageService: MessageService,private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.api.checkUser();    
    this.spinner.show();
    let dataParam = {
      "list_key":"getUserDashboard",
      "candidate_master_id":localStorage.getItem('userId')
    };

    this.api.getData(dataParam, 'services.php').subscribe(res => {
      if(res.status_code == '200'){
        this.exams = res.result;
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      
      this.spinner.hide();
    });
  }

  conditionCheckForExam(examCode: string, type: string) {
    localStorage.setItem('examCode', examCode);
    if(type == 'C'){
      window.open('https://www.payumoney.com/paybypayumoney/#/D21DB42F4AD06C2C9912A538D1A2A1F9', "_self"); 
    }else if(type == 'F'){
      this.router.navigate(["/user-exam/F"]);
    }    
  }

  viewResult(examCode: string){
    this.router.navigate(["/result/"+examCode]);
  }

}
