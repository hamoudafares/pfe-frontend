import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Pfe } from '../models/pfe';
import { Role } from '../models/role';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { PfeService } from '../services/pfe.service';

@Component({
  selector: 'app-pfe',
  templateUrl: './pfe.component.html',
  styleUrls: ['./pfe.component.css']
})
export class PfeComponent implements OnInit {
  pfes: Pfe[]=[];
  searchText: any;
  len:any;
  currentUser: User;

  constructor(private pfeService: PfeService, private authenticationService:AuthenticationService) {
    this.currentUser = this.authenticationService.user;
   }
 
  ngOnInit(): void {
        this.pfeService.getAll().pipe(first()).subscribe(pfes => {
          this.pfes = pfes;
          this.len=pfes.length;
    });
   }
   get isAdmin() {
    return this.currentUser && this.currentUser?.role === Role.Admin;
  }
  get isTeacher() {
    return this.currentUser && this.currentUser?.role === Role.Professor;
  }
  get isStudent() {
    return this.currentUser && this.currentUser?.role === Role.Student;
  }
}
