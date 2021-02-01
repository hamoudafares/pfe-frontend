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

const baseUrl = `${environment.apiUrl}/users`;

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`baseUrl`);
    }

    getById(id: number) {
        return this.http.get<User>(`baseUrl/${id}`);
    }

    create(params: any) {
      return this.http.post(baseUrl, params);
  }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}
