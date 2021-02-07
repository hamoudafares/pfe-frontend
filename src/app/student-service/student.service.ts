import { Injectable } from '@angular/core';
import {Student} from "../models/student";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../services/authentication.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  static students: Student[] = [];



  constructor(private http: HttpClient, private auth: AuthenticationService) {

  }

  getStudents(){
    return this.http.get(`${environment.apiUrl}/students`, this.auth.getTokenHeader());
  }

  getStudentById(id: number){

    return this.http.get(`${environment.apiUrl}/students/${id}`, this.auth.getTokenHeader());

  }


  //MUSTREMOVE

  static getStudentById(id: string): Student{
    for(let student of StudentService.students){
      if(student.id == id){
        return student;
      }
    }
    return null;

  }

}
