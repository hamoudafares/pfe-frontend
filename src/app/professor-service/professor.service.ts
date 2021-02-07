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
       ProfessorService.professors.push(new Professor({id: 5, firstName: "Aymen",
       familyName: "Sellaouti", CIN: 1, speciality: "GL",
       email: "aymen.sellaouti@gmail.com", anneeUniversitaire: "2020/2021", profilePicUrl: "../../assets/aymen-sellaouti-pfp.jpg" }));

       ProfessorService.professors[0].linkedInLink = "aymen-sellaouti-b0427731";
    //   ProfessorService.professors[0].encadrer(new Student({id: 1, firstName: 'anis', familyName: 'messaoudi',
    //     CIN:'007',studentNumber:'170', speciality: 'GL', email:"buph@outlook.com", linkedInLink:'' }));
       ProfessorService.professors[0].encadrer(new Student({id: 2, firstName: 'fares', familyName: 'hamouda',
         CIN:'008',studentNumber:'171', speciality: 'GL' }));
       ProfessorService.professors[0].encadrer(new Student({id: 3, firstName: 'nour', familyName: 'karoui',
         CIN:'009',studentNumber:'172', speciality: 'GL' }));
       ProfessorService.professors[0].encadrer(new Student({id: 1, firstName: 'ons', familyName: 'sellami',
         CIN:'010',studentNumber:'173', speciality: 'GL' }));
       ProfessorService.professors[0].etudiantsEncadre[0].pfe = new Pfe({sujet: 'platform e-learning for humour',
         entreprise: 'funny people Inc.', motsCles: ['construction', 'web dev', 'humour'], mission: 'construction d\'' +
           'une platforme e-learning pour l\'humeur'});

     ProfessorService.professors[0].etudiantsEncadre[0].soutenance = new Soutenance(["fares","ons","nour"],"28 09 2021 mardi 8:00 2h","B2");
     new Student({id: 4, firstName: 'anis', familyName: 'messaoudi',
       CIN:'007',studentNumber:'170', speciality: 'GL', email:"buph@outlook.com", linkedInLink:'' });
   }


    getProfessors(){

      return this.http.get(`${environment}/teachers`, this.auth.getTokenHeader());

    }

    getProfessorById(id: string){

     return this.http.get(`${environment}/teacers/${id}`, this.auth.getTokenHeader());

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
