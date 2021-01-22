import {min} from "rxjs/operators";

export class Soutenance {



  etudiant: string;
  jury: [];
  encadrant: string;

  sujet: string;
  date: string;
  salle: string;

  constructor(etudiant, jury, subject, date, supervisor, salle){ // temporary constructor
    this.date = date;
    this.etudiant = etudiant;
    this.sujet = subject;
    this.jury = jury;
    this.encadrant = supervisor;
    this.salle = salle;
  }


  getDay(): string{ // returns the day of the week
    let params = this.date.split(" ");

    return params[3].toLowerCase();

  }

  getDayDate(): string{ // returns the date of the day (e.g. the 24th etc..)
    let params = this.date.split(" ");

    return params[0];
  }

  getMonth(): string{ // returns the month of the date
    let params = this.date.split(" ");

    return params[1].toLowerCase();
  }

  getYear(): string{ // returns the year of the date
    let params = this.date.split(" ");

    return params[2];
  }

  getHourAndMinuteAsFraction(): number{ // returns the hour of the soutenance in a rational format (eg 9:30 => 9.5) useful for placement on a grid
    let params = this.date.split(" ");

    let time = params[4].split(':');

    let hour = parseInt(time[0]);
    let minute = parseInt(time[1]);

    minute = parseFloat((minute/60).toPrecision(4));

    return (hour + minute);

  }

  getExactHourAndMinute(): string{
    let params = this.date.split(" ");

    return params[4];

  }

  getDuration(): number{
    let params = this.date.split(" ");

    return parseInt(params[5].replace('h',''));
  }

  getEtudiant(): string{
    return this.etudiant;
  }

  getSujet(): string{
    return this.sujet;
  }

  getSalle(): string {
    return this.salle;
  }

}
