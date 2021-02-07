import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {User} from '../models/user';
import {environment} from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public user: User = null;
    public token: string = null;

    constructor(private http: HttpClient) {
      console.log("localstorage");

      this.user = JSON.parse(localStorage.getItem('currentUser')) as User;

      console.log(this.user);

      this.token = localStorage.getItem('token');
    }

    public get currentUserValue(): User {
        return this.user;
    }

    login(email: string, password: string) {

      return this.http.post(`${environment.apiUrl}/user/login`,{ email, password });
        //
        // return this.http.post<any>(`${environment.apiUrl}/user/login`, { email, password })
        //     .pipe(map(user => {
        //         // login successful if there's a jwt token in the response
        //         if (user && user.token) {
        //             // store user details and jwt token in local storage to keep user logged in between page refreshes
        //             localStorage.setItem('currentUser', JSON.stringify(user));
        //             this.currentUserSubject.next(user);
        //         }
        //
        //         return user;
        //     }));


    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.user = null;
    }


    getTokenHeader(): {headers} {

      let headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token);

      return {
        headers: headers_object
      }

    }

}
