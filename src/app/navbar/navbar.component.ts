import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { LoginComponent } from '../login/login.component';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  closeResult = '';
  constructor(private router: Router,
    private authenticationService: AuthenticationService,public matDialog: MatDialog) { 
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit(): void {
    console.log(this.currentUser.profilePic);
    
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.router.navigate([".."]);
    this.authenticationService.logout();  
  }

  openDialog() {
    this.matDialog.open(LoginComponent,{
      height: '400px',
      width: '600px',
    });
  }


}
