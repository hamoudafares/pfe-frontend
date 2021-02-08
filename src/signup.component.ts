import { Component, Input, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { MustMatch } from '../helpers/must-match.validator';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  loading = false;
  submitted = false;

  userRole:string;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    // // password not required in edit mode
    // const passwordValidators = [Validators.minLength(6),Validators.required];
    // passwordValidators.push(Validators.required);

    this.form = this.formBuilder.group({
      cin: ['',Validators.required],
      firstName: ['', Validators.required],
      familyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      speciality: ['', Validators.nullValidator],
      annee: ['', Validators.nullValidator],
      option: ['', Validators.nullValidator],
      studentNumber: [0, Validators.nullValidator],
      // password: ['', [Validators.minLength(6), Validators.required]],
      // confirmPassword: ['', Validators.required]
    });

    this.userService.getById(this.id)
      .pipe(first())
      .subscribe((x: { [key: string]: any; }) => this.form.patchValue(x));

  }

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
    this.createUser();
  }


  private createUser() {
    this.userService.create(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('User added', { keepAfterRouteChange: true });
        this.router.navigate(['/admin']);
      }, error => {})
      .add(() => this.loading = false);
  }

  changeRole(){
    //@ts-ignore
    this.userRole = this.form.controls['role'].value;
  }

  // onSubmit(f: NgForm){
  //   console.log(f.value);
  //   console.log(f.value['password']);
  //   console.log(f.value['confirmPassword']);
  //   this.authenticate.addUser(f,this.hide);
  // }
//   user: User = new User();

//   constructor(private userService: UserService,private router: Router) { }

//   newUser(): void {
//     this.user = new User();
//   }

//   save() {
//     this.userService.addUser(this.user).subscribe((data: any) => {
//       console.log(data)
//       this.user = new User();
//       this.gotoMain();
//     }, 
//       (error: any) => console.log(error));;
//   } 
//   onSubmit() {
//     this.save(); 
//     console.log('onsubmit success');   
//   }

//   gotoMain() {
//     this.router.navigate(["/login"]);
//   }
}
