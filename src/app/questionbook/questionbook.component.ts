
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../api/api.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-questionbook',
  templateUrl: './questionbook.component.html',
  styleUrls: ['./questionbook.component.css'],
  providers: [MessageService]
})

export class QuestionbookComponent implements OnInit {
  questions: any;
  loading = true;

  constructor(private router: Router, private api: ApiService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.tableloadData();
  }

  tableloadData(){
    let dataParam = {
      'query': 'fetch',
      'key': 'question_bank',
      'column': {
        '*': '*'
      },
      'condition': {
        'status' : 1
      }
    };

    this.api.getData(dataParam).subscribe(res => {
      this.questions = res;
      this.loading = false;
    });
  }
  
  questionAction(questions: any, type: string) {
    if (type == 'view')
      this.router.navigate(["/question/" + questions.question_bank_id + "/view"]);
    else if (type == 'edit')
      this.router.navigate(["/question/" + questions.question_bank_id + "/edit"]);
    else if (type == 'delete') {
      this.loading = true;
      let deleteData = {
        'query': 'update',
        'key': 'question_bank',
        'values': {
          'status': 0
        },
        'condition': {
          'question_bank_id':questions.question_bank_id
        }
      };

      this.api.getData(deleteData).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Question Deleted', detail: 'Question Deleted Succefully' });
        this.tableloadData();
      });
      
    }
  }
}