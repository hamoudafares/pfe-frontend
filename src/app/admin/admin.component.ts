import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';


@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
    loading = false;
    users: User[]=[];
    currentUser:User;
    searchText;
    // isDeleting:boolean;

    constructor(private userService: UserService, private authenticationService:AuthenticationService) {
        this.currentUser = this.authenticationService.currentUserValue;
     }

    ngOnInit() {
        this.loading = true;
        console.log('what again?');
        
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            console.log("im in");
            
            this.users = users;
        });
    }

    // deleteAccount(id: string) {
    //     const user = this.users.find(x => x.id == id);
    //     user.isDeleting = true;
    //     this.userService.delete(id)
    //         .pipe(first())
    //         .subscribe(() => {
    //             this.users = this.users.filter(x => x.id != id) 
    //         });
    // }
}