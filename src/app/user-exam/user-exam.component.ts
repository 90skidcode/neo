import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api/api.service';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-exam',
  templateUrl: './user-exam.component.html',
  styleUrls: ['./user-exam.component.css']
})
export class UserExamComponent implements OnInit {
  quizForm = new FormGroup({
    1: new FormControl(''),
    2: new FormControl(''),
    3: new FormControl('')
  });

  exams: any;
  questions: any;
  loading: boolean = false;
  start: boolean = true;
  process: boolean = false;
  mintues: number = 3;
  seconds: number = 5;
  end: boolean = false;
  examButtom : boolean = true;
  stateOfButton: boolean[] = [];
  score : string = '0';
  total : string = '0';
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private messageService: MessageService, private spinner: NgxSpinnerService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.spinner.show();
    this.route.paramMap.subscribe(params => {
      
      let checkPaymentData = {
        "list_key": "PaymentLanding",
        "candidate_master_id": localStorage.getItem('userId'),
        "exam_code": localStorage.getItem('examCode'),
        "exam_amount": (params.get('type') == 'F')? '0': '10',
        "type": params.get('type')
      }
      this.api.getData(checkPaymentData, 'services.php').subscribe(r => {
        if (r.status_code == '200') {
          this.getExamRules();
        }else if(r.status_code == '400'){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: r.message });
          this.spinner.hide();
          this.getExamRules();
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: r.message });
          this.spinner.hide();
          this.router.navigate(["/user-dashboard"]);
        }
      });
    });
  }

  getExamRules(){
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
        'status': 1,
        'exam_code': localStorage.getItem('examCode')
      }
    };
    this.api.getData(dataParam).subscribe(res => {
      this.exams = res;
      this.spinner.hide();
    });
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
        this.endExam();
        clearInterval(t);
      } else {
        if (this.seconds)
          this.seconds--;
        else {
          this.seconds = 59;
          this.mintues--;
        }
      }
    }, 1000);
  }

  changeState(index: any, questionId: any) {
    this.stateOfButton[index] = !this.stateOfButton[index];
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'தயவுசெய்து நீங்கள் பதிலளிக்காத கேள்விகள் மற்றும் மதிப்பிடப்பட்ட கேள்விகளை விட்டுவிட்டீர்களா என்று சரிபார்க்கவும். சமர்ப்பித்தவுடன் அதை மாற்ற முடியாது. <br>Please check if you have left any unanswered questions and dought marked questions. Once it is submitted cant able change it.',
      accept: () => {
        this.endExam();
      }
    });
  }

  endExam() {
    this.spinner.show();
    this.process = false;
    this.end = true;
    let submitData = {
      "list_key": "SubmitExam", "candidate_master_id": "1", "exam_code": localStorage.getItem('examCode'),
      "values": this.quizForm.value
    }
    this.api.getData(submitData, 'services.php').subscribe(res => {
      this.spinner.hide();
      this.score = res.result.candidate_score;
      this.total = res.result.Total_questions;
    });
  }

  home(){
    this.router.navigate(["/user-dashboard"]);
  }
}
