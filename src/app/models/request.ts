import {Student} from "./student";
import {Professor} from "./professor";


export enum statusEnum {
  pending = 'pending',
  refused = 'refused',
  accepted = 'accepted',
}

export class RequestEncadrement{

  static requests:RequestEncadrement[];

  student: Student;
  professor: Professor;

  requestStatus: statusEnum;

  constructor(student, professor){
    if(RequestEncadrement.requests == null){
      RequestEncadrement.requests = [];
    }
    this.student = student;
    this.professor = professor;
    this.requestStatus = statusEnum.pending;
    RequestEncadrement.requests.push(this);
  }



}
