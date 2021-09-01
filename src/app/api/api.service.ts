import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,private spinner: NgxSpinnerService) {

  }
  mainURL = 'https://glowmedia.in/neo/api/';
  //configURL = this.mainURL ;
  
  getData(data: any , url : any = 'database.php') {
    return this.http.post<any>(this.mainURL + url, data).pipe(
      retry(10),
      catchError(this.handleError)
    );
  }


  

  // Error handling 
  handleError(error: any) {
    let errorMessage = '';
    (error.error instanceof ErrorEvent) ? errorMessage = error.error.message : errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    this.spinner.hide();   
    return throwError(errorMessage);
  }
}
