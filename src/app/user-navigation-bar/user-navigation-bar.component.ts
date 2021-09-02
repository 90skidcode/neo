import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../api/api.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-user-navigation-bar',
  templateUrl: './user-navigation-bar.component.html',
  styleUrls: ['./user-navigation-bar.component.css']
})
export class UserNavigationBarComponent implements OnInit {
  count : any = 0;
  constructor(private router: Router, private api: ApiService, private messageService: MessageService,private spinner: NgxSpinnerService) { }
  
  ngOnInit(): void {
    let dataParam = {
      'query': 'fetch',
      'key': 'candidate_master',
      'column': {
        'book_count': 'book_count'
      },
      'condition': {
        'status': 1,
        'candidate_master_id': localStorage.getItem('userId')
      }
    };
    this.api.getData(dataParam).subscribe(res => {
      this.count = (res[0].book_count) ?res[0].book_count : 0 ;
    });
  }

  logout(){
    this.router.navigate(["/user-login"]);
  }
}
