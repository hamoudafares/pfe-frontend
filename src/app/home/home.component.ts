import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';



@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;
    logged:any;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private router:Router
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        this.logged=!this.currentUser;
    }

    ngOnInit() {
        if(this.logged){
            console.log("wouhouu");
            this.router.navigate(['/login']   )     }
        this.loading = true;
        this.userService.getById(this.currentUser.id.toString()).pipe(first()).subscribe((user: User) => {
            console.log(this.currentUser);
            
            this.loading = false;
            this.userFromApi = user;
        });
        
    }
}