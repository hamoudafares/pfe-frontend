// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AlertService } from '../services/alert.service';

// @Component({
//   selector: 'app-reset-password',
//   templateUrl: './reset-password.component.html',
//   styleUrls: ['./reset-password.component.css']
// })
// export class ResetPasswordComponent implements OnInit {
//     form: NgForm;
//     loading = false;
//     submitted = false;
//   constructor(private router: Router,private alertService: AlertService) { }

//   ngOnInit(): void {
//   }
//   onSubmit() {
//     this.submitted = true;

//     // reset alerts on submit
//     this.alertService.clear();

//     // stop here if form is invalid
//     if (this.form.invalid) {
//         return;
//     }
//     this.loading = true;
// }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';



@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
  })
export class ResetPasswordComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.alertService.clear();
        this.userService.forgotPassword(this.f.email.value)
            .pipe(first())
            .pipe(finalize(() => this.loading = false))
            .subscribe({
                next: () => this.alertService.success('Please check your email for password reset instructions'),
                error: error => this.alertService.error(error)
            });
    }
}
