import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SoutenanceCalenderComponent } from './soutenance-calender/soutenance-calender.component';
import { IndexComponent } from './index/index.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ViewSoutenanceComponent } from './view-soutenance/view-soutenance.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { SubmitSoutenanceFormComponent } from './submit-soutenance-form/submit-soutenance-form.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUploadStudentsComponent } from './admin-upload-students/admin-upload-students.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DndDirective } from './dnd.directive';
import { ProgressComponent } from './progress/progress.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import {DefaultImagePipe} from "./pipes/default-image.pipe";

//import { fakeBackendProvider } from './helpers/fake-backend';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PfeComponent } from './pfe/pfe.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {FooterComponent} from "./footer/footer.component";
import {LocalInfoComponent} from "./local-info/local-info.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { StudentListComponent } from './student-list/student-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SoutenanceCalenderComponent,
    IndexComponent,
    SearchResultsComponent,
    ViewSoutenanceComponent,
    SettingsComponent,
    AuthenticateComponent,
    SubmitSoutenanceFormComponent,
    AdminDashboardComponent,
    AdminUploadStudentsComponent,
    NavbarComponent,
    DndDirective,
    ProgressComponent,
    ViewProfileComponent,
    SignupComponent,
    LoginComponent,
    ResetPasswordComponent,
    HomeComponent,
    AdminComponent,
    PfeComponent,
    DefaultImagePipe,
    FooterComponent,
    LocalInfoComponent,
    TeacherListComponent,
    StudentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }//,

    // provider used to create fake backend
  //  fakeBackendProvider],
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
