import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionbook',
  templateUrl: './questionbook.component.html',
  styleUrls: ['./questionbook.component.less']
})
export class QuestionbookComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      columns: [{
        title: 'கேள்வி எண்',
        data: 'id'
      }, {
        title: 'கேள்வி',
        data: 'firstName'
      }, {
        title: 'நடவடிக்கை',
        data: 'action'
      }]
    };
  }

}
