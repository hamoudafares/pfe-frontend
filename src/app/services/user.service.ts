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
import {AuthenticationService} from "./authentication.service";
import {BehaviorSubject} from "rxjs";
import { finalize, map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/user`;
const profUrl = `${environment.apiUrl}/teachers`;
const studUrl = `${environment.apiUrl}/students`;

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject: BehaviorSubject<User>;
  private user;

  public get userValue(): User {
    return this.userSubject.value;
  }

    constructor(private http: HttpClient, private auth: AuthenticationService) {
      this.userSubject = new BehaviorSubject<User>(null);
      this.user = auth.user
    }

    getAll() {
        return this.http.get<User[]>(`${baseUrl}`, this.auth.getTokenHeader());
    }

    getById(id: string) {
        return this.http.get<User>(`${baseUrl}/${id}`, this.auth.getTokenHeader());
    }

    create(params: {role: string}) {
    console.log(params);
    if(params.role.toLowerCase() == 'student') {
      return this.http.post(`${studUrl}`, params, this.auth.getTokenHeader());
    }
    if(params.role.toLowerCase() == 'teacher') {
      return this.http.post(`${profUrl}`, params, this.auth.getTokenHeader());
    }

    return this.http.post(`${baseUrl}`, params, this.auth.getTokenHeader())

  }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params, this.auth.getTokenHeader());
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`, this.auth.getTokenHeader());
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


  validateResetToken(token: string) {
    return this.http.post(`${baseUrl}/validate-reset-token`, { token });
  }

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
