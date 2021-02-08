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

  getStudentById(id: string){

    return this.http.get(`${environment.apiUrl}/students/${id}`, this.auth.getTokenHeader());

  }

  encadrerEtudiant(studId: string, profId: string){
    let teacherCredentials = {teacherId: profId};


    return this.http.patch(`${environment.apiUrl}/students/add-supervisor/${studId}`, teacherCredentials, this.auth.getTokenHeader());

  }

}
