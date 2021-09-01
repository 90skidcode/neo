import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api/api.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-user-exam',
  templateUrl: './user-exam.component.html',
  styleUrls: ['./user-exam.component.css']
})
export class UserExamComponent implements OnInit {
  exams: any;
  questions : any;
  loading: boolean = false;
  start: boolean = true;
  process: boolean = false;
  mintues: number = 3;
  seconds: number = 5;
  end: boolean = false;
  
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private messageService: MessageService, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.spinner.show();
    this.route.paramMap.subscribe(params => {
      let dataParam = {
        'query': 'fetch',
        'key': 'exam_master',
        'column': {
          'exam_name': 'exam_name',
          'exam_code': 'exam_code',
          'exam_description': 'exam_description',
        },
        'condition': {
          'status': 1,
          'exam_code': params.get('examid')
        }
      };

      this.api.getData(dataParam).subscribe(res => {
        this.exams = res;
        this.spinner.hide();
      });
    })
  }

  startExam(examCode: string) {
    this.start = false;
    this.process = true;
    this.getQuestions(examCode);
  }

  getQuestions(examCode: string) {
    this.spinner.show();
    let dataParam = {
      'query': 'fetch',
      'key': 'question_bank',
      'column': {
        "question_bank_id": "question_bank_id",
        "question_text_en": "question_text_en",
        "question_text_tn": "question_text_tn",
        "option_1_tn": "option_1_tn",
        "option_2_tn": "option_2_tn",
        "option_3_tn": "option_3_tn",
        "option_4_tn": "option_4_tn",
        "option_5_tn": "option_5_tn",
        "option_1_en": "option_1_en",
        "option_2_en": "option_2_en",
        "option_3_en": "option_3_en",
        "option_4_en": "option_4_en",
        "option_5_en": "option_5_en"
      },
      'condition': {
        'status': 1,
        'exam_code': examCode
      }
    };

    this.api.getData(dataParam).subscribe(res => {
      this.questions = res;
      this.spinner.hide();
      this.startTimer();
    });
   
  }

  startTimer() {
    let t = setInterval(() => {
      if (this.mintues == 0 && this.seconds == 0) {
        console.log("hi");
        this.process = false;
        this.end = true;
        clearInterval(t);
      } else {
        if (this.seconds)
          this.seconds--;
        else {
          this.seconds = 5;
          this.mintues--;
        }
      }
    }, 1000);
  }
}
