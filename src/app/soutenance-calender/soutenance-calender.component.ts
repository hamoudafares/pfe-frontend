import { Component, OnInit } from '@angular/core';
import {SoutenanceService} from "../soutenance.service";
import {Soutenance} from "../soutenance";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {generateI18nBrowserWebpackConfigFromContext} from "@angular-devkit/build-angular/src/utils/webpack-browser-config";


const DIV_SIZE = 100;
const DIV_MARGIN = 10;

@Component({
  selector: 'app-soutenance-calender',
  templateUrl: './soutenance-calender.component.html',
  styleUrls: ['./soutenance-calender.component.css']
})


export class SoutenanceCalenderComponent implements OnInit {

  soutenancesAtMonth: Soutenance[][];

  soutenancesAtDay: Soutenance[][];

  modeEnum:String[] = ["Month", "day"];

  mode: String;

  date: String = '';

  datesArray: string[]; // used to store all dates in the month (and the few days before/after) for ease of iteration

  constructor(private soutenanceService: SoutenanceService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let route = this.router.url.split("/");
    if(route[2].toLowerCase() == 'day') {
      this.mode = this.modeEnum[1];
      this.activatedRoute.params.subscribe(params => {
        let dayDate:string = params["daydate"];
        this.getSoutenancesAtDay(dayDate);
      });
    }
    else if(route[2].toLowerCase() == 'month') {
      this.mode = this.modeEnum[0];
      this.activatedRoute.params.subscribe(params => {
        let monthDate:string = params["month"];
        this.getSoutenancesAtMonth(monthDate);
      });
    }
  }

  getSoutenancesAtDay(dayDate: String): void{
    let day = dayDate.substr(0,2);
    let month = dayDate.substr(2,2);
    let year = dayDate.substr(4,4);

    this.date = day + "/" + month + "/" + year;

    let soutenances = this.soutenanceService.getSoutenancesAtDay(day, month, year);

    this.soutenancesAtDay = [];
    this.soutenancesAtDay[0] = [];

    let columns = 0;

    for(let soutenance of soutenances){ // on insere les soutenances de maniere "parallele", c'est a dire si deux
                                        // ne peuvent pas etre inséres simulatneement (8h->10h et 9h->11h), on les
                                        // inseres dans deux colonnes paralleles pour mieux visualiser


      for (let i = 0; i <= columns; i++) { //on essaye d'inserer chaque soutenances dans une colonne conveniente


        let insertable = true;
        for (let j = 0; j < this.soutenancesAtDay[i].length; j++) { // on verifie toutes les soutenances pour colonne i

          let start1 = this.soutenancesAtDay[i][j].getHourAndMinuteAsFraction();
          let start2 = soutenance.getHourAndMinuteAsFraction();

          let duree1 = this.soutenancesAtDay[i][j].getDuration();
          let duree2 = soutenance.getDuration();

          let end1 = start1 + duree1;
          let end2 = start2 + duree2;

          insertable = (start1 >= end2) || (start2 >= end1); // on verifie le conflit temporaire
          if(!insertable)break; // s'il ya un seul conflit, on quitte et essaye la colonne suivante

        }
        if(insertable){
          this.soutenancesAtDay[i].push(soutenance); // si la colonne est inserable dans i, on l'insere et on quitte
          break;
        }
        else {

          if(i == columns){ //si on a essayer toutes les colonnes, on crée une nouvelle colonne
            columns++;
            this.soutenancesAtDay[columns] = [];
          }
        }

      }

    }

    console.dir(this.soutenancesAtDay);


  }

  getSoutenancesAtMonth(monthDate: string){
    let month = monthDate.substr(0, 2);
    let year = monthDate.substr(2,4);
    this.date = SoutenanceService.months[parseInt(month)]+'/'+month + "/" + year;

    let soutenances = this.soutenanceService.getSoutenancesAtMonth(month, year);

    // formats date in a certain format

    const dateOptions = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    let date = new Date(parseInt(year),parseInt(month)-1);
    console.log(date.toLocaleTimeString("fr-fr",dateOptions));

    let firstDay = date.toLocaleTimeString("fr-fr",dateOptions).split(' ')[0]; // gets the first weekday in the month (e.g. lundi mardi)
    // this next part sets the first visible day to monday always, so that the calender is always in the form monday - saturday
    let dayIndex = SoutenanceService.daysOfTheWeek.indexOf(firstDay.toLowerCase())-1;
    date.setDate(date.getDate() - dayIndex);
    console.log(date.toLocaleTimeString('fr-fr',dateOptions));
    this.datesArray = [];


    let stopper = 0;

    while (date.getMonth() != (parseInt(month) -1)){
      this.datesArray.push(date.toLocaleDateString('fr-fr',{day: 'numeric',month: 'numeric'}));
      date.setDate(date.getDate() + 1);
      stopper++;
      if(stopper == 7)break;
    }
    stopper = 0;
    let lastDate = new Date(date.getTime());

    while (date.getMonth() == (parseInt(month)-1)){


      console.log("added " + date.toLocaleDateString());

      this.datesArray.push(date.toLocaleDateString('fr-fr',{day: 'numeric',month: 'numeric'}));
      date.setDate(date.getDate() + 1);
      lastDate = new Date(date.getTime());
      let day = date.toLocaleDateString('fr-fr',dateOptions).split(' ')[0];
      if(day.toLowerCase()=='dimanche'){
        date.setDate(date.getDate() + 1);
      }
      stopper++;
      if(stopper==31)break;
    }


    let finalDay = lastDate.toLocaleTimeString('fr-fr',dateOptions).split(' ')[0];
    dayIndex = SoutenanceService.daysOfTheWeek.indexOf(finalDay.toLowerCase());
    stopper = 0;
    if(dayIndex==0)dayIndex=7;

    while(dayIndex<=6){
      this.datesArray.push(date.toLocaleDateString('fr-fr',{day: 'numeric',month: 'numeric'}));
      date.setDate(date.getDate() + 1);
      dayIndex++;
    }



    console.log(date.toLocaleDateString('fr-fr',{day: 'numeric',month: 'numeric'}));
    console.log(this.datesArray);
    console.log(this.datesArray.length);
  }

  getCalenderBlockDisplacement(soutenance: Soutenance): number{
    let hour = soutenance.getHourAndMinuteAsFraction();
    return (hour-8)*(DIV_SIZE)+DIV_MARGIN;

  }

  getCalenderBlockSize(soutenance: Soutenance): number{
    let duration = soutenance.getDuration();
    return duration * (DIV_SIZE)-DIV_MARGIN;
  }

  getNumberOfWeeks(): number[]{ //used to return iterable collection for ngfor
    let weeknb = Math.ceil(this.datesArray.length/6);
    let numbers:number[] = [];
    for (let i = 0; i < weeknb; i++) {
      numbers.push(i);
    }
    console.log(numbers);
    return numbers;

  }

  getDatesAtWeek(week: number): string[]{
    return this.datesArray.slice(week*6, week*6+6);
  }

  isInMonth(dateDay: string): boolean{
    let currentMonth = this.date.split('/')[1];
    let month = dateDay.split('/')[1];
    return month==currentMonth;
  }

  getNumberOfSoutenancesAtDay(date: string){
    let day = date.split('/')[0];
    let month = date.split('/')[1];
    let year = this.date.split('/')[2];
    let soutenances = this.soutenanceService.getSoutenancesAtDay(day, month, year);

    let count = soutenances.length;

    if(count==0){
      return 'pas de soutenances';
    }
    if(count==1){
      return '<b>1</b> soutenance <br>' + 'par <b>' + soutenances[0].getEtudiant() + "</b>";
    }


    return (""+count).bold() + " soutenances";


  }

  getDateFormatted(date: string): string{
    let day = date.split('/')[0];
    let month = date.split('/')[1];
    let year = this.date.split('/')[2];
    return day+month+year;
  }
}