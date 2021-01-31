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

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private alertService: AlertService
  ) {}

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };
      this.form = this.formBuilder.group({
          password: ['', [Validators.minLength(6),Validators.nullValidator]],
          confirmPassword: ['', Validators.nullValidator]
      }, formOptions);

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

  private updateUser() {
      this.userService.update(this.id, this.form.value)
          .pipe(first())
          .subscribe(() => {
              this.alertService.success('User updated', { keepAfterRouteChange: true });
              this.router.navigate(['/home'], { relativeTo: this.route });
          })
          .add(() => this.loading = false);
  }

}
