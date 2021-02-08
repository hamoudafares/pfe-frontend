import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { MustMatch } from '../helpers/must-match.validator';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { Role } from '../models/role';



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
  @Input() urllink:string;
  user = this.userService.userValue;
  currentUser: User;
  navigateTo:any;

  serverLoaded: boolean = false;
  
 
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private alertService: AlertService,
      private authenticationService: AuthenticationService
  ) {
    this.currentUser = authenticationService.user;
  }

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      console.log("this users id is route param",this.id);
      console.log('this user is', this.user);

      if(this.id == null){
        this.id = this.currentUser.id;
        if(this.id== null){
          this.router.navigate(['']);
        }
      }

      this.userService.getById(this.id).subscribe( (userData)=>{

        this.user = userData as User;

        const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };
        this.form = this.formBuilder.group({
          firstName: [this.user.firstName, Validators.required],
          lastName: [this.user.familyName, Validators.required],
          email: [this.user.email, [Validators.required, Validators.email]],
          role: [this.user.role, Validators.required],
          cin:[this.user.CIN,Validators.required],
          password: ['', [Validators.minLength(6),Validators.nullValidator]],
          confirmPassword: ['', Validators.nullValidator],
          profilePic:[this.user.profilePic,Validators.nullValidator]
        }, formOptions);

        //console.log("form",this.form);
        this.serverLoaded = true;

        this.userService.getById(this.id)
          .pipe(first())
          .subscribe(x => this.form.patchValue(x));
      }, (err)=>{this.router.navigate(['']);});


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
//   onSubmitImage(){
//     this.submitted = true;
//     this.loading = true;
//     this.selectFile(event);
//     console.log("selectFile",this.selectFile(event));
//     console.log("image submitted user pp",this.user.profilePic);
    
//   }
  selectFile(event){
      if(event.target.files){
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (event:any)=>{
              //console.log("event target result", event.target.result);
              
              this.urllink = event.target.result;
              //console.log("urllink ", this.urllink);
              
          }
      }
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
  navigation(){
    if(this.isAdmin){
        this.navigateTo="/admin"
    }
   else{
       this.navigateTo="/home"
   }
   this.router.navigate([this.navigateTo], { relativeTo: this.route });
  }

private updateUser() {
    this.selectFile(event);
    this.userService.update(this.id, this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
                this.alertService.success('Update successful', { keepAfterRouteChange: true });
                if(this.isAdmin){
                    this.navigateTo="/admin"
                }
               else{
                   this.navigateTo="/home"
               }
               this.router.navigate([this.navigateTo], { relativeTo: this.route });
            },
            error: error => {
                this.alertService.error(error);
                this.loading = false;
            }
        });
}

}
