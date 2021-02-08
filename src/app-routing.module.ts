import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SoutenanceCalenderComponent} from "./soutenance-calender/soutenance-calender.component";
import {AdminUploadStudentsComponent} from "./admin-upload-students/admin-upload-students.component";
import {ViewProfileComponent} from "./view-profile/view-profile.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {HomeComponent} from "./home/home.component";
import {SettingsComponent} from "./settings/settings.component";
import {AdminComponent} from "./admin/admin.component";
import {AuthGuard} from "./helpers/auth.guard";
import {Role} from "./models/role";
import {IndexComponent} from "./index/index.component";
import {PfeComponent} from "./pfe/pfe.component";
import {SubmitSoutenanceFormComponent} from "./submit-soutenance-form/submit-soutenance-form.component";
import {TeacherListComponent} from "./teacher-list/teacher-list.component";
import {StudentListComponent} from "./student-list/student-list.component";

const routes: Routes = [
  {path: "soutenances", component:SoutenanceCalenderComponent},
  {path: "soutenances/Month/:month", component: SoutenanceCalenderComponent},
  {path: "soutenances/Week/:weekdate", component: SoutenanceCalenderComponent},
  {path: "soutenances/Day/:daydate", component: SoutenanceCalenderComponent},
  {path: "soutenances/:xd", component: SoutenanceCalenderComponent},
  {path: "admin/upload", component: AdminUploadStudentsComponent},
  {path: "profile/professor/:id", component: ViewProfileComponent},
  {path: "profile/student/:id", component: ViewProfileComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "reset-password", component:ResetPasswordComponent},
  {path: "",component:HomeComponent},
  {path: "settings", component: SettingsComponent},
  {path: "settings/:id", component: SettingsComponent, canActivate: [AuthGuard], data: { roles: [ Role.Admin]}},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }},
  {path: "index",component:IndexComponent},
  {path: "pfe",component:PfeComponent},
  {path: "test",component:SubmitSoutenanceFormComponent},
  {path: "teacherlist",component:TeacherListComponent},
  {path: "studentlist",component:StudentListComponent},
  {path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
