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
import { Role } from '../models/role';
import { User } from '../models/user';
import { MatDialogRef } from "@angular/material/dialog";



@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    currentUser: User;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        public dialogRef: MatDialogRef<LoginComponent>
    ) { 
        // redirect to home if already logged in
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
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    redirect(){
      this.router.navigate(['/signup']);
    }
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                _data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
    close() {
        this.dialogRef.close();
      }
}


