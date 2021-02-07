import { Component, OnInit } from '@angular/core';
import {Student} from "../models/student";
import {StudentService} from "../student-service/student.service";

@Component({
  selector: 'app-submit-soutenance-form',
  templateUrl: './submit-soutenance-form.component.html',
  styleUrls: ['./submit-soutenance-form.component.css']
})
export class SubmitSoutenanceFormComponent implements OnInit {

  constructor() {
    let firstCall = new Student({id: 1, firstName: 'anis', familyName: 'messaoudi', CIN:'007',studentNumber:'170' });
    console.log('first call done, result:');
    console.log(firstCall);
    let secondCall = new Student({id: 1, firstName: 'shmort', familyName: 'messaoudi', CIN:'007',studentNumber:'170' });
    console.log('second call done, result:');
    console.dir(secondCall);

    console.dir(StudentService.students);

  }

  ngOnInit(): void {
  }

}
