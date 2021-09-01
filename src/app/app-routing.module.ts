import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { QuestionComponent } from './question/question.component';
import { ExamListComponent } from "./exam-list/exam-list.component";
import { ExamComponent } from './exam/exam.component'
import { UserRegisterComponent } from "./user-register/user-register.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { UserExamComponent } from "./user-exam/user-exam.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { SettingsComponent } from "./settings/settings.component";
import { PaymentDetailsComponent } from "./payment-details/payment-details.component";
const routes: Routes = [
  { path: '', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'question/:questionid/:type', component: QuestionComponent },
  { path: 'exam-dashboard', component: ExamListComponent },
  { path: 'exam/:examid/:type', component: ExamComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'user-exam/:type', component: UserExamComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'payment', component: PaymentDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
