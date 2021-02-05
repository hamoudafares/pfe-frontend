// import { Injectable } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   [x: string]: any;
//   static userList=[];
//   constructor() { }
//   checkUser(form: NgForm,hidden: boolean,logged: boolean){
//     for (var i=0;i<UserService.userList.length;i++){
//       if ((UserService.userList[i].email==form.value['email'])&&(UserService.userList[i].password==form.value['password'])){
//         hidden=true;
//         logged=false;
//         console.log("logged");
//       }
//       else{
//         logged=true;
//         hidden=false;
//         console.log('wrong info');
//       }
//     }
//   }

//   addUser(user:Object): Observable<Object>{
//     if (user['password']!=user['confirmPassword']){ 
//       console.log(UserService.userList) ;
//       console.log("reconfirm");
//     }
//     else{
//       console.log(user);
//       UserService.userList.push(user);
//       console.log(UserService.userList) ;
//       console.log("signedup");
//       return this.http.post(`${this.baseUrl}`, user);
//   }
//   }
//   //this method returns a user using its id
//   findUser(id:number):Object{
//     return UserService.userList[id];
//   }

//   changePassword(form:NgForm,){
//     for (var i=0;i<UserService.userList.length;i++){

//     } 
//   }

// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/users`;

@Injectable({ providedIn: 'root' })
export class UserService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(null);
        this.user = this.userSubject.asObservable();
    }
    public get userValue(): User {
        return this.userSubject.value;
    }

    getAll() {
        return this.http.get<User[]>(baseUrl);
    }


    getById(id: string) {
        return this.http.get<User>(`${baseUrl}/${id}`);
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${baseUrl}/authenticate`, { email, password }, { withCredentials: true })
            .pipe(map(user => {
                this.userSubject.next(user);
                this.startRefreshTokenTimer();
                return user;
            }));
    }

    logout() {
        this.http.post<any>(`${baseUrl}/revoke-token`, {}, { withCredentials: true }).subscribe();
        this.stopRefreshTokenTimer();
        this.userSubject.next(null);
        this.router.navigate(['/user/login']);
    }

    refreshToken() {
        return this.http.post<any>(`${baseUrl}/refresh-token`, {}, { withCredentials: true })
            .pipe(map((user) => {
                this.userSubject.next(user);
                this.startRefreshTokenTimer();
                return user;
            }));
    }

    register(user: User) {
        return this.http.post(`${baseUrl}/register`, user);
    }

    verifyEmail(token: string) {
        return this.http.post(`${baseUrl}/verify-email`, { token });
    }

    create(params: any) {
      return this.http.post(baseUrl, params);
  }

    update(id: string, params: any) {
        // return this.http.put(`${baseUrl}/${id}`, params);
        return this.http.put(`${baseUrl}/${id}`, params)
            .pipe(map((user: any) => {
                // update the current user if it was updated
                if (user.id === this.userValue.id) {
                    // publish updated user to subscribers
                    user = { ...this.userValue, ...user };
                    this.userSubject.next(user);
                }
                return user;
            }));
    }

    delete(id: string) {
        // return this.http.delete(`${baseUrl}/${id}`);
        return this.http.delete(`${baseUrl}/${id}`)
            .pipe(finalize(() => {
                // auto logout if the logged in user was deleted
                if (id === this.userValue.id.toString())
                    this.logout();
            }));
    }

    validateResetToken(token: string) {
        return this.http.post(`${baseUrl}/validate-reset-token`, { token });
    }

    // logout() {
    //     this.http.post<any>(`${baseUrl}/revoke-token`, {}, { withCredentials: true }).subscribe();
    //     this.stopRefreshTokenTimer();
    //     this.userSubject.next(null);
    //     this.router.navigate(['/login']);
    // }

    forgotPassword(email: string) {
        return this.http.post(`${baseUrl}`, { email });
    }

    resetPassword(token: string, password: string, confirmPassword: string) {
        return this.http.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
    }

    private refreshTokenTimeout;

    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        const token = JSON.parse(atob(this.userValue.token.split('.')[1]));

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(token.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
    
}
