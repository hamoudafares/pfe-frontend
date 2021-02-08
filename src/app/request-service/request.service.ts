import {Injectable} from '@angular/core';
import {RequestEncadrement, statusEnum} from "../models/request";
import {Student} from "../models/student";
import {Professor} from "../models/professor";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor() { }

  getRequestsWithStudent(id: string): RequestEncadrement[] {


    //MUSTREMOVE

    this.initRequests();

    let result: RequestEncadrement[] = [];
    for(let request of RequestEncadrement.requests){
      if(request.student.id == id){
        result.push(request);
      }
    }

    return result;
  }

  getRequestsWithProfessor(id: string): RequestEncadrement[]{

    //MUSTREMOVE



    this.initRequests();

    let result: RequestEncadrement[] = [];
    for(let request of RequestEncadrement.requests){
      if(request.professor.id == id){
        result.push(request);
      }
    }

    return result;
  }

  getRequestWithStudentAndProfessor(idStud: string, idProf: string, status: statusEnum = statusEnum.pending): RequestEncadrement{

    //MUSTREMOVE

    this.initRequests();

    //


    for(let request of RequestEncadrement.requests){
      if(request.professor.id == idProf && request.student.id == idStud && request.requestStatus == status){
        return request;
      }
    }

    return null;

  }

  createRequest(student: Student, professor: Professor): void{
    if(this.getRequestWithStudentAndProfessor(student.id, professor.id) == null){
      new RequestEncadrement(student, professor);

      this.saveRequests();
    }

    else {
      console.log('request existant');
    }


  }

  deleteRequest(idStud: string, idProf: string): boolean{
    let index = -1;
    let found = false;

    //MUSTREMOVE

    this.initRequests();

    for(let request of RequestEncadrement.requests){
      index++;
      if(request.professor.id == idProf && request.student.id == idStud){
        found = true;
        break;
      }

    }


    if(found){
      RequestEncadrement.requests.splice(index, 1);
    }
    else {
      return false;
    }

    this.saveRequests();

    return true

  }

  initRequests(){
    //MUSTREMOVE

    if(RequestEncadrement.requests == null){
        RequestEncadrement.requests = [];
        this.saveRequests();

    }

  }

  saveRequests(){
    //MUSTREMOVE

  }

}
