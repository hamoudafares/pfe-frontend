// import { Component, Input, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { UserService } from '../services/user.service';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   @Input() hidden = true;
//   @Input() logged =true;
//   constructor(private authenticate:UserService) { }

//   ngOnInit(): void {
//   }  
//   onSubmit(f: NgForm){
//     console.log(f.value);
//     // console.log(this.user);
//     // this.checkUser(f);
//     this.authenticate.checkUser(f,this.hidden,this.logged);
//   }
// }

//second 

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import {error} from "selenium-webdriver";
import {environment} from "../../environments/environment";
import jwt_decode from "jwt-decode";
import {User} from "../models/user";
import {Role} from "../models/role";
import {UserService} from "../services/user.service";
import { MatDialogRef } from '@angular/material/dialog';


@Component({ templateUrl: 'login.component.html' })

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

  //   users: User[] = [{
  //     id: '1',
  //     username: 'ons1',
  //     firstName: 'ons',
  //     familyName: 'sellami',
  //     role: Role.Admin,
  //     password: 'ons123',
  //     CIN :125125,
  //     email: 'onssellami@gmail.com',
  //     profilePic:'default.png',
  // }];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        public dialogRef: MatDialogRef<LoginComponent>
    ) { 
        // redirect to home if already logged in

      // MUSTREMOVE
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    redirect(){
      this.router.navigate(['/signup']);
    }
    async onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
        return;
      }

      this.loading = true;
      let response= {success: false, error: ''};
      this.authenticationService.login(this.f.email.value, this.f.password.value).subscribe( (token) => {
        // @ts-ignore
        let userData = jwt_decode(token.access_token);

        this.authenticationService.user = new User();
        console.log(userData);
        // @ts-ignore
        this.authenticationService.user.id = userData.id;
        // @ts-ignore
        this.authenticationService.user.email = userData.email;
        // @ts-ignore
        this.authenticationService.user.CIN = userData.cin;
        // @ts-ignore
        switch (userData.role[0].toLowerCase()) {
          case "student": this.authenticationService.user.role = Role.Student;break;
          case "teacher": this.authenticationService.user.role = Role.Professor;break;
          case "admin": this.authenticationService.user.role = Role.Admin;break;
        }
        response.success = true;


        localStorage.setItem('currentUser', JSON.stringify(this.authenticationService.user));

        //@ts-ignore, saving the token

        localStorage.setItem('token', token.access_token);

        console.log('user ' + localStorage.getItem('currentUser'));



      }, err => { response.success = false; response.error = err}, ()=>{
        if (response.success) {

          this.router.navigate(['']);
        } else {
          this.error = response.error;
          this.loading = false;
      }

      });


    }
   
    close() {
      this.dialogRef.close();
    }
}


