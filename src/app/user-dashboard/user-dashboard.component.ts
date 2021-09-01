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
    this.spinner.show();
    let dataParam = {
      'query': 'fetch',
      'key': 'exam_master',
      'column': {
        'exam_name': 'exam_name',
        'exam_code': 'exam_code',
        'exam_description': 'exam_description',
      },
      'condition': {
        'status': 1
      }
    };

    this.api.getData(dataParam).subscribe(res => {
      this.exams = res;
      this.spinner.hide();
    });
  }

  conditionCheckForExam(examCode: string) {
    this.router.navigate(["/user-exam/"+examCode]);
  }

}
