import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TeamLeaderComponent } from './team-leader/team-leader.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { AdministrationPanelComponent } from './administration-panel/administration-panel.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team-list/team-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'team-leader',
    component: TeamLeaderComponent,
    canActivate: [AuthGuard],
  },
  { path: 'doctor', component: DoctorComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  {
    path: 'administration-panel',
    component: AdministrationPanelComponent,
    canActivate: [AdminAuthGuard],
  },
  { path: 'student', component: StudentComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    TeamLeaderComponent,
    DoctorComponent,
    AdminComponent,
    StudentComponent,
    LoginComponent,
    HomeComponent,
    AdministrationPanelComponent,
    RegistrationFormComponent,
    TeamComponent,
    TeamListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
