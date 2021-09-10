import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from "angular-datatables";
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { QuestionbookComponent } from './questionbook/questionbook.component';
import { QuestionpaperComponent } from './questionpaper/questionpaper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { QuestionComponent } from './question/question.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamComponent } from './exam/exam.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserExamComponent } from './user-exam/user-exam.component';
import { UserNavigationBarComponent } from './user-navigation-bar/user-navigation-bar.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { SettingsComponent } from './settings/settings.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import {DialogModule} from 'primeng/dialog';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ResultComponent } from './result/result.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    NavigationBarComponent,
    QuestionbookComponent,
    QuestionpaperComponent,
    QuestionComponent,
    ExamListComponent,
    ExamComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserDashboardComponent,
    UserExamComponent,
    UserNavigationBarComponent,
    SettingsComponent,
    PaymentDetailsComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    TableModule,
    ButtonModule,
    ToastModule,
    BrowserAnimationsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CardModule,
    NgxSpinnerModule,
    ConfirmDialogModule,
    DialogModule,
    AngularEditorModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

