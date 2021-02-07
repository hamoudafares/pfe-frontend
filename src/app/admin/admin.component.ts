import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    isDeleting:boolean;
    currentUserDeleted:boolean;

    constructor(private userService: UserService, private authenticationService:AuthenticationService, private router: Router) {
        this.currentUser = this.authenticationService.currentUserValue;
     }

    ngOnInit() {
        this.loading = true;
        console.log('what again?');
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            console.log("im in");
            console.log(users);
            this.users = users;
            for(let i =0; i<users.length;i++){
              //@ts-ignore
              this.users[i].id = users[i]._id;
            }
        });
    }



    deleteUser(id: string) {
        console.log("id inside delete user",id);
        if(this.currentUser.id.toString()==id){
            this.currentUserDeleted=true;
        }
        const user = this.users.find(x => x.id == id);
        if (!user) return;
        this.userService.delete(id).subscribe(
          () => {
            this.users = this.users.filter(x => x.id.toString() != id);
          }
        );
        if(this.currentUserDeleted){
            this.logout();
        }
        
      }
      logout() {
        this.router.navigate(["/login"]);
        this.authenticationService.logout();  
      }

}
