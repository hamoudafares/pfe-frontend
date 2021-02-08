// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { Observable, of, throwError } from 'rxjs';
// import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
// import { User } from '../models/user';
// import { Role } from '../models/role';
// import { Pfe } from '../models/pfe';
// const usersKey = 'angular-11-crud-example-users';
// const usersJSON = localStorage.getItem(usersKey);
// let users: User[] = usersJSON ? JSON.parse(usersJSON) : [{
//     id: 1,
//     title: 'Mrs',
//     username: 'ons1',
//     firstName: 'ons',
//     lastName: 'sellami',
//     role: Role.Student,
//     password: 'ons123',
//     email: 'onssellami@gmail.com'
// },
//   {
//     id: 2,
//     title: 'Mrs',
//     username: 'anis',
//     firstName: 'anis',
//     lastName: 'messaoudi',
//     role: Role.Student,
//     password: 'anis123',
//     email: 'buph@outlook.com'
//   }];
//
// const pfes: Pfe[]=[
//     {sujet: "dev web",
//     rapport:"pathtopdffile",
//     entreprise:"thinkit",
//     mission:"do some things",
//     motsCles:["web","mobile","fullstack"],
//     valid:true,},
//     {sujet: "DS",
//     rapport:"pathtopdffilesecond",
//     entreprise:"tanitweb",
//     mission:"barcha fazet",
//     motsCles:["ai","machine learning","deep learning"],
//     valid:true},
//     {sujet: "hack google",
//     rapport:"pathtopdffilesecurity",
//     entreprise:"dar souheib",
//     mission:"become a birateur",
//     motsCles:["ssh","openssl","cesar"],
//     valid:true,}
// ];
// // const users: User[] = [
// //     { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
// //     { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
// // ];
//
// @Injectable()
// export class FakeBackendInterceptor implements HttpInterceptor {
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const { url, method, headers, body } = request;
//         // return handleRoute();
//         // wrap in delayed observable to simulate server api call
//         return of(null)
//             .pipe(mergeMap(handleRoute))
//             .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
//             .pipe(delay(500))
//             .pipe(dematerialize());
//
//         function handleRoute() {
//             switch (true) {
//                 case url.endsWith('/users/authenticate') && method === 'POST':
//                     return authenticate();
//                 case url.endsWith('/users') && method === 'GET':
//                     return getUsers();
//                 case url.endsWith('/pfes') && method === 'GET':
//                     return getPfes();
//                 case url.match(/\/users\/\d+$/) && method === 'GET':
//                     return getUserById();
//                 case url.endsWith('/users') && method === 'POST':
//                     return createUser();
//                 case url.match(/\/users\/\d+$/) && method === 'PUT':
//                     return updateUser();
//                 case url.match(/\/users\/\d+$/) && method === 'DELETE':
//                     return deleteUser();
//                 default:
//                     // pass through any requests not handled above
//                     return next.handle(request);
//             }
//
//         }
//
//         // route functions
//         function authenticate() {
//             const { email, password } = body;
//             const user = users.find(x => x.email == email && x.password == password);
//             if (!user) return error('Username or password is incorrect');
//             return ok({
//                 id: user.id,
//                 username: user.username,
//                 email:user.email,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 role: user.role,
//                 token: `fake-jwt-token.${user.id}`
//             });
//         }
//
//         function getUsers() {
//             return ok(users.map(x => basicDetails(x)));
//         }
//
//         function getPfes() {
//             return ok(pfes.map(x => basicDetails(x)));
//         }
//         // function getUserById() {
//         //     const user = users.find(x => x.id === idFromUrl());
//         //     return ok(basicDetails(user));
//         // }
//
//         function getUserById() {
//             if (!isLoggedIn()) return unauthorized();
//
//             // only admins can access other user records
//             if (!isAdmin() && currentUser().id !== idFromUrl()) return unauthorized();
//
//             const user = users.find(x => x.id === idFromUrl());
//             return ok(user);
//         }
//
//         function unauthorized() {
//             return throwError({ status: 401, error: { message: 'unauthorized' } });
//         }
//
//         function createUser() {
//             const user = body;
//
//             if (users.find(x => x.email === user.email)) {
//                 return error(`User with the email ${user.email} already exists`);
//             }
//
//             // assign user id and a few other properties then save
//             user.id = newUserId();
//             delete user.confirmPassword;
//             users.push(user);
//             localStorage.setItem(usersKey, JSON.stringify(users));
//
//             return ok();
//         }
//
//         function updateUser() {
//             let params = body;
//             let user = users.find(x => x.id === idFromUrl());
//
//             if (params.email !== user.email && users.find(x => x.email === params.email)) {
//                 return error(`User with the email ${params.email} already exists`);
//             }
//
//             // only update password if entered
//             if (!params.password) {
//                 delete params.password;
//             }
//
//             // update and save user
//             Object.assign(user, params);
//             localStorage.setItem(usersKey, JSON.stringify(users));
//
//             return ok();
//         }
//
//         function deleteUser() {
//             users = users.filter(x => x.id !== idFromUrl());
//             localStorage.setItem(usersKey, JSON.stringify(users));
//             return ok();
//         }
//
//         // helper functions
//
//         function ok(body?: any) {
//             return of(new HttpResponse({ status: 200, body }))
//                 .pipe(delay(500)); // delay observable to simulate server api call
//         }
//
//         function error(message: any) {
//             return throwError({ error: { message } })
//                 .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
//         }
//
//         function basicDetails(user: any) {
//             const { id, title, firstName, lastName, email, role } = user;
//             return { id, title, firstName, lastName, email, role };
//         }
//
//         function idFromUrl() {
//             const urlParts = url.split('/');
//             return parseInt(urlParts[urlParts.length - 1]);
//         }
//
//         function newUserId() {
//             return users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
//         }
//         function isLoggedIn() {
//             const authHeader = headers.get('Authorization') || '';
//             return authHeader.startsWith('Bearer fake-jwt-token');
//         }
//         function isAdmin() {
//             return isLoggedIn() && currentUser().role === Role.Admin;
//         }
//         function currentUser() {
//             if (!isLoggedIn()) return;
//             const id = parseInt(headers.get('Authorization').split('.')[1]);
//             return users.find(x => x.id === id);
//         }
//
//     }
// }
//
// export const fakeBackendProvider = {
//     // use fake backend in place of Http service for backend-less development
//     provide: HTTP_INTERCEPTORS,
//     useClass: FakeBackendInterceptor,
//     multi: true
// };
