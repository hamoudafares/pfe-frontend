import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { Role } from './models/role';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';
import {SoutenanceCalenderComponent} from "./soutenance-calender/soutenance-calender.component";
import { IndexComponent } from './index/index.component';
import { PfeComponent } from './pfe/pfe.component';

const routes: Routes = [
  {path: "soutenances", component:SoutenanceCalenderComponent},
  {path: "soutenances/Month/:month", component: SoutenanceCalenderComponent},
  {path: "soutenances/Week/:weekdate", component: SoutenanceCalenderComponent},
  {path: "soutenances/Day/:daydate", component: SoutenanceCalenderComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "reset-password", component:ResetPasswordComponent},
  {path: "",component:HomeComponent},
  {path: "settings", component: SettingsComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }},
  {path: "index",component:IndexComponent},
  {path: "pfe",component:PfeComponent},
  {path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
