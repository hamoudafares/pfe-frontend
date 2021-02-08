import { Component, OnInit } from '@angular/core';
import {Professor} from "../models/professor";
import {ProfessorService} from "../professor-service/professor.service";
import {Student} from "../models/student";
import {StudentService} from "../student-service/student.service";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  searchText: string;


  students: Student[];

  constructor(private studService: StudentService) {
    studService.getStudents().subscribe( (studs)=>{
      this.students = studs as Student[];
    })
  }

  ngOnInit(): void {
  }

}
