import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { MustMatch } from '../helpers/must-match.validator';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  form: FormGroup;
  id: string;
  loading = false;
  submitted = false;
  urllink:string="assets/images/default.png";
  user = this.userService.userValue;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private alertService: AlertService
  ) {}

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      console.log(this.id);
      
      const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };
      this.form = this.formBuilder.group({
            firstName: [this.user.firstName, Validators.required],
            lastName: [this.user.lastName, Validators.required],
            email: [this.user.email, [Validators.required, Validators.email]],
            role: [this.user.role, Validators.required],
            cin:[this.user.cin,Validators.required],
            password: ['', [Validators.minLength(6),Validators.nullValidator]],
            confirmPassword: ['', Validators.nullValidator]
      }, formOptions);
    //   this.userService.getById(Number(this.id))
    //         .pipe(first())
    //         .subscribe(x => this.form.patchValue(x));
    //         console.log("parsed id"+Number(this.id));

    this.userService.update(this.user.id.toString(), this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
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
      this.updateUser();
  }
  onSubmitImage(){
    this.submitted = true;
    this.loading = true;
      this.selectFile(event);
  }
  selectFile(event){
      if(event.target.files){
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (event:any)=>{
              this.urllink = event.target.result;
          }
      }
  }

//   private updateUser() {
//       this.userService.update(this.id, this.form.value)
//           .pipe(first())
//           .subscribe(() => {
//               this.alertService.success('User updated', { keepAfterRouteChange: true });
//               this.router.navigate(['/home'], { relativeTo: this.route });
//           })
//           .add(() => this.loading = false);
//   }
private updateUser() {
    this.userService.update(this.id, this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
                this.alertService.success('Update successful', { keepAfterRouteChange: true });
                this.router.navigate(['/home'], { relativeTo: this.route });
            },
            error: error => {
                this.alertService.error(error);
                this.loading = false;
            }
        });
}

}

// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { first } from 'rxjs/operators';
// import { UserService } from '../services/user.service';
// import { AlertService } from '../services/alert.service';
// import { MustMatch } from '../helpers/must-match.validator';


// @Component({ templateUrl: 'update.component.html' })
// export class SettingsComponent implements OnInit {
//     user = this.userService.userValue;
//     form: FormGroup;
//     loading = false;
//     submitted = false;
//     deleting = false;

//     constructor(
//         private formBuilder: FormBuilder,
//         private route: ActivatedRoute,
//         private router: Router,
//         private userService: UserService,
//         private alertService: AlertService
//     ) { }

//     ngOnInit() {
//         this.form = this.formBuilder.group({
//             cin: [this.user.cin, Validators.required],
//             firstName: [this.user.firstName, Validators.required],
//             lastName: [this.user.lastName, Validators.required],
//             email: [this.user.email, [Validators.required, Validators.email]],
//             password: ['', [Validators.minLength(6)]],
//             confirmPassword: ['']
//         }, {
//             validator: MustMatch('password', 'confirmPassword')
//         });
//     }

//     // convenience getter for easy access to form fields
//     get f() { return this.form.controls; }

//     onSubmit() {
//         this.submitted = true;

//         // reset alerts on submit
//         this.alertService.clear();

//         // stop here if form is invalid
//         if (this.form.invalid) {
//             return;
//         }

//         this.loading = true;
//         this.userService.update(this.user.id.toString(), this.form.value)
//             .pipe(first())
//             .subscribe({
//                 next: () => {
//                     this.alertService.success('Update successful', { keepAfterRouteChange: true });
//                     this.router.navigate(['../'], { relativeTo: this.route });
//                 },
//                 error: error => {
//                     this.alertService.error(error);
//                     this.loading = false;
//                 }
//             });
//     }

//     onDelete() {
//         if (confirm('Are you sure?')) {
//             this.deleting = true;
//             this.userService.delete(this.user.id.toString())
//                 .pipe(first())
//                 .subscribe(() => {
//                     this.alertService.success('Account deleted successfully', { keepAfterRouteChange: true });
//                 });
//         }
//     }
// }