import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { DoctorComponent } from './doctor/doctor.component';
import { TeamLeaderComponent } from './team-leader/team-leader.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin'] } },
  { path: 'doctor', component: DoctorComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['doctor'] } },
  { path: 'team-leader', component: TeamLeaderComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['teamLeader'] } },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: 'home' } // Handle unknown routes

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
