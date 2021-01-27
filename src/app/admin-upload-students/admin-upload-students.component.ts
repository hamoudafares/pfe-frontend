import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-upload-students',
  templateUrl: './admin-upload-students.component.html',
  styleUrls: ['./admin-upload-students.component.css']
})
export class AdminUploadStudentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const excelToJson = require('convert-excel-to-json');

  }

}
