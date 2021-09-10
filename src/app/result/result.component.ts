import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api/api.service';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  questionid: any;

  constructor(private router: Router,private route: ActivatedRoute, private api: ApiService, private messageService: MessageService, private spinner: NgxSpinnerService) {

  }
  questions: any;
  ngOnInit(): void {
    this.api.checkUser(); 
    this.spinner.show();
    this.route.paramMap.subscribe(params => {
      this.questionid = params.get('id');
      let data = { "list_key": "CandidateExamDetails", "candidate_master_id": localStorage.getItem('userId'), "exam_code": "1" }
      this.api.getData(data, 'services.php').subscribe(res => {
        if (res.status_code == '200') {
          this.questions = res.result;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        }

        this.spinner.hide();
      });
    });
  }
  home(){
    this.router.navigate(["/user-dashboard"]);
  }
}
