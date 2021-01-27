import { Injectable } from '@angular/core';
import {Soutenance} from "./soutenance";

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

  soutenances: Soutenance[] = [];

  constructor() {
    this.soutenances[0] = new Soutenance("anis",["fares","ons","nour"],"humour","28 09 2021 mardi 8:00 2h","aymen","B2");
    this.soutenances[1] = new Soutenance("ons",["anis","fares","nour"],"dancing","28 09 2021 mardi 9:30 3h","aymen 2", "B1");
    this.soutenances[2] = new Soutenance("fares",["anis","ons","nour"],"saa-ism","28 09 2021 mardi 10:00 1.5h","aymen 3", "B4");
    this.soutenances[3] = new Soutenance("nour",["anis","ons","fares"],"fiver","28 09 2021 mardi 10:30 3h", "aymen", "B3");
    this.soutenances[4] = new Soutenance("fares",["anis","ons","nour"],"fiver","29 09 2021 mardi 10:30 3h", "aymen", "B3");
  }

  getSoutenances(): Soutenance[]{
    return this.soutenances;
  }

  getSoutenancesAtMonth(month:string, year:string): Soutenance[]{
    let soutenancesAtMonth: Soutenance[] = [];

    for(let soutenance of this.soutenances){
      if((soutenance.getMonth() == month)&&(soutenance.getYear() == year)){
        soutenancesAtMonth.push(soutenance);
      }
    }

    return soutenancesAtMonth;  }

  getSoutenancesAtDay(day:string, month:string, year:string): Soutenance[]{

    let soutenancesAtDay: Soutenance[] = [];

    for(let soutenance of this.soutenances){
      if((soutenance.getDayDate() == day)&&(soutenance.getMonth() == month)&&(soutenance.getYear() == year)){
        soutenancesAtDay.push(soutenance);
      }
    }

    return soutenancesAtDay;
  }

}
