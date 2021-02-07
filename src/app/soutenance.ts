import {Student} from "./models/student";
import {Professor} from "./models/professor";

export class Soutenance {



  student: Student;
  jury:string[] = [];
  president: Professor;
  datetime: string;
  room: string;
  session: any;

  constructor( jury, date, salle){ // temporary constructor
    this.datetime = date;
    this.jury = jury;
    this.room = salle;
  }


  getDay(): string{ // returns the day of the week
    let params = this.datetime.split(" ");

    return params[3].toLowerCase();

  }

  getDayDate(): string{ // returns the datetime of the day (e.g. the 24th etc..)
    let params = this.datetime.split(" ");

    return params[0];
  }

  getMonth(): string{ // returns the month of the datetime
    let params = this.datetime.split(" ");

    return params[1].toLowerCase();
  }

  getYear(): string{ // returns the year of the datetime
    let params = this.datetime.split(" ");

    return params[2];
  }

  getHourAndMinuteAsFraction(): number{ // returns the hour of the soutenance in a rational format (eg 9:30 => 9.5) useful for placement on a grid
    let params = this.datetime.split(" ");

    let time = params[4].split(':');

    let hour = parseInt(time[0]);
    let minute = parseInt(time[1]);

    minute = parseFloat((minute/60).toPrecision(4));

    return (hour + minute);

  }

  getExactHourAndMinute(): string{
    let params = this.datetime.split(" ");

    return params[4];

  }

  getDuration(): number{
    let params = this.datetime.split(" ");

    return parseInt(params[5].replace('h',''));
  }

  getEtudiantName(): string{
    return this.student.firstName;
  }

  getSujet(): string{
    return this.student.pfe.sujet;
  }

  getSalle(): string {
    return this.room;
  }

  getJuryFormattedString(): string{
    let result:string = '';
    if(this.jury.length==0){
      return 'Aucun membre du jury';
    }
    for (let i = 0; i < this.jury.length; i++) {
      result = result + this.jury[i].toString();
      if(i < this.jury.length-2){
        result = result + ', ';
      }
      else if(i== this.jury.length-2){
        result = result + ' et '
      }
      else {
        result = result+ '.';
      }
    }

    return result;

  }

}
