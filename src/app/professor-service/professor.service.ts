import { Injectable } from '@angular/core';
import {Professor} from "../models/professor";

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  professors: Professor[] = [];

  constructor() {
    this.professors[0] = new Professor({id: 1, firstName: "Aymen",
      familyName: "Sellaouti", CIN: 1, speciality: "GL",
      email: "aymen.sellaouti@gmail.com", anneeUniversitaire: "2020/2021", profilePicUrl: "../../assets/aymen-sellaouti-pfp.jpg" });

    this.professors[0].linkedInLink = "aymen-sellaouti-b0427731";
    this.professors[0].etudiantsEncadre = [{firstName: 'Anis', familyName: 'Messaoudi', speciality: 'GL', option: 'DataScience (nchallah)'},
                                           {firstName: 'Fares', familyName: 'hamouda', speciality: 'GL', option: 'DevOps'}];

  }

  getProfessors(){
    return this.professors;
  }

  getProfessorById(id: number){
    for(let professor of this.professors){
      if(professor.id == id){
        return professor;
      }
    }
    return null;

  }



}
