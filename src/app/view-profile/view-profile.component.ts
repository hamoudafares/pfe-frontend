import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProfessorService} from "../professor-service/professor.service";
import {Professor} from "../models/professor";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  mode: string;
  professor: Professor = null;
  noSuchPerson: boolean = false;

  constructor(private professorService: ProfessorService, private activatedRoute: ActivatedRoute, private router: Router) {
    let urlMode = this.router.url.split('/')[2];

    console.log(urlMode);
    if(urlMode.toLowerCase() == 'professor'){
      this.mode = 'professor';
      activatedRoute.params.subscribe( params => {
        let id = parseInt(params['id']);
        this.professor = professorService.getProfessorById(id);

        if(this.professor == null){
          this.noSuchPerson = true;
        }


      });
    }
    else if(urlMode.toLowerCase() == 'student'){
      this.mode = 'student';
    }

  }

  ngOnInit(): void {
  }



}
