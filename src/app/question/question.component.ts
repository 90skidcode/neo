import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api/api.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  
})
export class QuestionComponent implements OnInit {
  questionid: any = '';
  questionType: any = '';
  question!: FormGroup;
  constructor(private route: ActivatedRoute, private api: ApiService, private messageService: MessageService,private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.api.checkAdmin();
    this.spinner.show();
    this.question = new FormGroup({
      "question_text_en": new FormControl("", Validators.required),
      "question_text_tn": new FormControl("", Validators.required),
      "option_1_tn": new FormControl("", Validators.required),
      "option_2_tn": new FormControl("", Validators.required),
      "option_3_tn": new FormControl("", Validators.required),
      "option_4_tn": new FormControl("", Validators.required),
      "option_1_en": new FormControl("", Validators.required),
      "option_2_en": new FormControl("", Validators.required),
      "option_3_en": new FormControl("", Validators.required),
      "option_4_en": new FormControl("", Validators.required),
      "correct_answer": new FormControl("", Validators.required)
    });

    this.route.paramMap.subscribe(params => {
      this.questionid = params.get('questionid');
      this.questionType = params.get('type');
      if (this.questionType == 'edit' || this.questionType == 'view' ) {
        let dataParam = {
          'query': 'fetch',
          'key': 'question_bank',
          'column': {
            '*': '*'
          },
          'condition': {
            'status': 1,
            'question_bank_id': this.questionid
          }
        };

        this.api.getData(dataParam).subscribe(res => {
          this.question.patchValue({
            "question_text_en": res[0].question_text_en,
            "question_text_tn": res[0].question_text_tn,
            "option_1_tn": res[0].option_1_tn,
            "option_2_tn": res[0].option_2_tn,
            "option_3_tn": res[0].option_3_tn,
            "option_4_tn": res[0].option_4_tn,
            "option_1_en": res[0].option_1_en,
            "option_2_en": res[0].option_2_en,
            "option_3_en": res[0].option_3_en,
            "option_4_en": res[0].option_4_en,
            "correct_answer": res[0].correct_answer,
          });
          this.questionid = res[0].question_bank_id;
          this.spinner.hide();
        });
      }else if(this.questionType == 'new'){       
        let dataParam = {
          'query': 'fetch',
          'key': 'question_bank',
          'column': {
            'question_bank_id': 'question_bank_id'
          },
          'condition': {}
        };

        this.api.getData(dataParam).subscribe(res => { 
          this.questionid = res.length + 1;
          this.spinner.hide();
        });
      }
        
    });
  }

  addQuestion() {
    if (this.questionType == 'edit') {
      this.spinner.show();
      let addData = {
        'query': 'update',
        'key': 'question_bank',
        'values': {},
        'condition': {
          'question_bank_id': this.questionid
        }
      }
      addData['values'] = this.question.value;
      this.api.getData(addData).subscribe(data => {
        this.spinner.hide();
        this.messageService.add({ severity: 'success', summary: 'Question', detail: 'Question Updated Succefully' });
      });
    }else if(this.questionType == 'new'){
      this.spinner.show();
      let addData = {
        'query': 'add',
        'key': 'question_bank',
        'values': {}
      }
      addData['values'] = this.question.value;
      this.api.getData(addData).subscribe(data => {
        this.spinner.hide();
        this.question.reset();
        this.questionid++;
        this.messageService.add({ severity: 'success', summary: 'Question', detail: 'Question Add Succefully' });
      });
    }else if(this.questionType == 'view'){
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Question in View Mode' });
    }
  }
}