import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SoutenanceCalenderComponent} from "./soutenance-calender/soutenance-calender.component";

const routes: Routes = [
  {path: "soutenances", component:SoutenanceCalenderComponent},
  {path: "soutenances/Month/:month", component: SoutenanceCalenderComponent},
  {path: "soutenances/Week/:weekdate", component: SoutenanceCalenderComponent},
  {path: "soutenances/Day/:daydate", component: SoutenanceCalenderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
