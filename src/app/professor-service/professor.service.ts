import { Injectable } from '@angular/core';
import {Professor} from "../models/professor";
import {Student} from "../models/student";
import {Pfe} from "../models/pfe";
import {Soutenance} from "../soutenance";
import {SoutenanceService} from "../soutenance.service";
import {RequestEncadrement} from "../models/request";
import {StudentService} from "../student-service/student.service";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../services/authentication.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

   static professors: Professor[] = [];

   constructor(private http: HttpClient, private auth: AuthenticationService) {
   }


    getProfessors(){

      return this.http.get(`${environment.apiUrl}/teachers`, this.auth.getTokenHeader());

    }

    getProfessorById(id: string){

     return this.http.get(`${environment.apiUrl}/teacers/${id}`, this.auth.getTokenHeader());

    }

    static getProfessorById(id: string){
      for(let professor of ProfessorService.professors){
        if(professor.id == id){
          return professor;
        }
      }
      return null;

    }

}
