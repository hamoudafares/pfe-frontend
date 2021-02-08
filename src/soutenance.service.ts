import { Injectable } from '@angular/core';
import {Soutenance} from "./soutenance";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./services/authentication.service";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SoutenanceService {

  static months = ["fillermonth", //ensures that month[1]= janvier, month[2] = fevrier etc...
                   "janvier",
                   "fevrier",
                   "mars",
                   "avril",
                   "may",
                   "juin",
                   "juillet",
                   "août",
                   "septembre",
                   "octobre",
                   "novembre",
                   "decembre",
  ];

  static daysOfTheWeek = ['dimanche',
                          'lundi',
                          'mardi',
                          'mercredi',
                          'jeudi',
                          'vendredi',
                          'samedi',
  ];

  static soutenances: Soutenance[] = [];

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    SoutenanceService.soutenances[0] = new Soutenance(["fares","ons","nour"], "28 09 2021 mardi 8:00 2h","B2");
    SoutenanceService.soutenances[1] = new Soutenance(["anis","fares","nour"],"28 09 2021 mardi 9:30 3h", "B1");
    SoutenanceService.soutenances[2] = new Soutenance(["anis","ons","nour"],"28 09 2021 mardi 10:00 1.5h", "B4");
    SoutenanceService.soutenances[3] = new Soutenance(["anis","ons","fares"],"28 09 2021 mardi 10:30 3h",  "B3");
    SoutenanceService.soutenances[4] = new Soutenance(["anis","ons","nour"],"29 09 2021 mardi 10:30 3h",  "B3");
  }

  getSoutenances(){
    return this.http.get(`${environment.apiUrl}/presentation`,this.auth.getTokenHeader());
  }

  getSoutenancesAtMonth(month:string, year:string){

    let monthStart = new Date(parseInt(year), parseInt(month)-1);

    let nextMonth = (parseInt(month)+1) %12;

    let year2 = parseInt(year);

    if(nextMonth == 0){
      year2++;
    }

    let monthEnd = new Date(nextMonth, year2);

    let date1 = monthStart.toLocaleDateString();
    let date2 = monthEnd.toLocaleDateString();

    let params = {
      date_from: date1,
      date_to: date2
    };

    let httpParams = this.auth.getTokenHeader();
    //@ts-ignore
    httpParams.params = params;

    return this.http.get(`${environment.apiUrl}/presentation/date`,httpParams);

    }

  getSoutenancesAtDay(day:string, month:string, year:string){

    let dayStart = new Date(parseInt(year), parseInt(month)-1, parseInt(day));

    let dayEnd = new Date(dayStart);
    dayEnd.setDate(dayStart.getDate());

    let date1 = dayStart.toLocaleDateString();
    let date2 = dayEnd.toLocaleDateString();

    let params = {
      date_from: date1,
      date_to: date2
    };

    let httpParams = this.auth.getTokenHeader();
    //@ts-ignore
    httpParams.params = params;

    return this.http.get(`${environment.apiUrl}/presentation/date`,httpParams);

  }

}
