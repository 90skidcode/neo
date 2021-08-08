import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { QuestionbookComponent } from './questionbook/questionbook.component';
import { QuestionpaperComponent } from './questionpaper/questionpaper.component';
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    NavigationBarComponent,
    QuestionbookComponent,
    QuestionpaperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
