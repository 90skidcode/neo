import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../api/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  exam: any;
  loading = true;
  constructor(private router: Router, private api: ApiService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.tableloadData();
  }

  tableloadData(){
    let dataParam = {
      'query': 'fetch',
      'key': 'exam_master',
      'column': {
        'exam_id': 'exam_id',
        'exam_name':'exam_name',
        'exam_code':'exam_code',
        'exam_description':'exam_description',
      },
      'condition': {
        'status' : 1
      }
    };

    this.api.getData(dataParam).subscribe(res => {
      this.exam = res;
      this.loading = false;
    });
  }
  
  examAction(exams: any, type: string) {
    if (type == 'view')
      this.router.navigate(["/exam/" + exams.exam_id + "/view"]);
    else if (type == 'edit')
      this.router.navigate(["/exam/" + exams.exam_id + "/edit"]);
    else if (type == 'delete') {
      this.loading = true;
      let deleteData = {
        'query': 'update',
        'key': 'exam_master',
        'values': {
          'status': 0
        },
        'condition': {
          'exam_id':exams.exam_id
        }
      }

      this.api.getData(deleteData).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Exam Deleted', detail: 'Exam Deleted Succefully' });
        this.tableloadData();
      });
      
    }else if(type == 'new')
    this.router.navigate(["/exam/0/new"]);
  }
}
