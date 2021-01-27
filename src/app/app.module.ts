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

@NgModule({
  declarations: [
    AppComponent,
    SoutenanceCalenderComponent,
    IndexComponent,
    SearchResultsComponent,
    ViewProfileComponent,
    ViewSoutenanceComponent,
    SettingsComponent,
    AuthenticateComponent,
    SubmitSoutenanceFormComponent,
    AdminDashboardComponent,
    AdminUploadStudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
