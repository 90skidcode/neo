import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api/api.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  examid: any = '';
  examType: any = '';
  exam!: FormGroup;
  constructor(private route: ActivatedRoute, private api: ApiService, private messageService: MessageService,private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.api.checkAdmin();
    this.spinner.show();
    this.exam = new FormGroup({
      "exam_name": new FormControl("", Validators.required),
      "exam_code": new FormControl("", Validators.required),
      "exam_description": new FormControl("", Validators.required)
    });

    this.route.paramMap.subscribe(params => {
      this.examid = params.get('examid');
      this.examType = params.get('type');
      if (this.examType == 'edit' || this.examType == 'view' ) {
        let dataParam = {
          'query': 'fetch',
          'key': 'exam_master',
          'column': {
            '*': '*'
          },
          'condition': {
            'status': 1,
            'exam_id': this.examid
          }
        };

        this.api.getData(dataParam).subscribe(res => {
          this.exam.patchValue({
            "exam_name": res[0].exam_name,
            "exam_code": res[0].exam_code,
            "exam_description": res[0].exam_description
          });
          this.examid = res[0].exam_id;
          this.spinner.hide();
        });
      }else if(this.examType == 'new'){       
        let dataParam = {
          'query': 'fetch',
          'key': 'exam_master',
          'column': {
            'exam_id': 'exam_id'
          },
          'condition': {}
        };

        this.api.getData(dataParam).subscribe(res => { 
          this.examid = res.length + 1;
          this.spinner.hide();
        });
      }
        
    });
  }

  addexam() {
    if (this.examType == 'edit') {
      this.spinner.show();
      let addData = {
        'query': 'update',
        'key': 'exam_master',
        'values': {},
        'condition': {
          'exam_id': this.examid
        }
      }
      addData['values'] = this.exam.value;
      this.api.getData(addData).subscribe(data => {
        this.spinner.hide();
        this.messageService.add({ severity: 'success', summary: 'Exam', detail: 'Exam Updated Succefully' });
      });
    }else if(this.examType == 'new'){
      this.spinner.show();
      let addData = this.exam.value;    
      addData['list_key'] = "AddExam";
      this.api.getData(addData, 'services.php').subscribe(data => {
        this.spinner.hide();
        if(data.status_code == '200'){
          this.exam.reset();
          this.examid++;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Exam Add Succefully' });
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
        }
      });
    }else if(this.examType == 'view'){
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'exam in View Mode' });
    }
  }
}