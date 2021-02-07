import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';



@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.user;

    }

    ngOnInit() {
      console.log(this.authenticationService.user);
        this.loading = true;
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe((user: User) => {
            this.loading = false;
            this.userFromApi = user;
        });
    }
}
