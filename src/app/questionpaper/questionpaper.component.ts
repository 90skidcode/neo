import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-questionpaper',
  templateUrl: './questionpaper.component.html',
  styleUrls: ['./questionpaper.component.css']
})
export class QuestionpaperComponent implements OnInit {
  questionid: any = '';
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.questionid = params.get('questionid');
      const type = params.get('type');
    });
  }

}
