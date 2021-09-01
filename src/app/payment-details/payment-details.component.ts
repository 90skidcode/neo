import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../api/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  payment: any;
  loading = true;
  constructor(private router: Router, private api: ApiService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.api.checkAdmin();
    this.tableloadData();
  }

  tableloadData(){
    let dataParam = {"list_key":"paymentDetails"};

    this.api.getData(dataParam , 'services.php').subscribe(res => {
      this.payment = res.result;
      this.loading = false;
    });
  }
  
}
