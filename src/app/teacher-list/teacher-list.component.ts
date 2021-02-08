import { Component, OnInit } from '@angular/core';
import {Professor} from "../models/professor";
import {ProfessorService} from "../professor-service/professor.service";

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  searchText: string;


  teachers: Professor[];

  constructor(private profService: ProfessorService) {
    profService.getProfessors().subscribe( (profs)=>{
      this.teachers = profs as Professor[]
    })
  }

  ngOnInit(): void {
  }

}
