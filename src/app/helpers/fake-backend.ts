import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../models/user';
import { Role } from '../models/role';
import { Pfe } from '../models/pfe';
const usersKey = 'angular-11-crud-example-users';
const usersJSON = localStorage.getItem(usersKey);
let users: User[] = [{
    id: 1,
    username: 'ons1',
    firstName: 'ons',
    lastName: 'sellami',
    role: Role.Admin,
    password: 'ons123',
    cin:125125,
    email: 'onssellami@gmail.com'
},
{
    id:2,
    username: 'nour1',
    firstName: 'nour',
    lastName: 'karoui',
    role: Role.Student,
    password: 'nour123',
    cin:123456,
    email: 'nourkaroui@gmail.com'
},
{
    id: 3,
    username: 'fares1',
    firstName: 'fares',
    lastName: 'hamouda',
    role: Role.Admin,
    password: 'fares123',
    cin:789456,
    email: 'fareshamouda@gmail.com'
},
{
    id: 4,
    username: 'nis1',
    firstName: 'nis',
    lastName: 'messaoudi',
    role: Role.Teacher,
    password: 'anis123',
    cin:321654,
    email: 'buph@gmail.com'
}];

const pfes: Pfe[]=[
    {sujet: "dev web",
    rapport:"pathtopdffile",
    entreprise:"thinkit",
    mission:"do some things",
    motsCles:["web","web2","web3"],
    valid:true,},
    {sujet: "DS",
    rapport:"pathtopdffilesecond",
    entreprise:"tanitweb",
    mission:"barcha fazet",
    motsCles:["machine learning","mc2","mc3"],
    valid:true},
    {sujet: "hack google",
    rapport:"pathtopdffilesecurity",
    entreprise:"dar souheib",
    mission:"become a birateur",
    motsCles:["ssh","openssl"],
    valid:false,}
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        // return handleRoute();
        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) 
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.endsWith('/pfes') && method === 'GET':
                    return getPfes();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.endsWith('/users') && method === 'POST':
                    return createUser();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }

        }

        // route functions
        function authenticate() {
            const { email, password } = body;
            const user = users.find(x => x.email == email && x.password == password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                email:user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                cin:user.cin,
                token: `fake-jwt-token.${user.id}`
            });
            // const { email, password } = body;
            // const user = users.find(x => x.email === email && x.password === password && x.isVerified);
            
            // if (!user) return error('Email or password is incorrect');

            // // add refresh token to user
            // user.refreshTokens.push(generateRefreshToken());
            // localStorage.setItem(usersKey, JSON.stringify(users));

            // return ok({
            //     ...basicDetails(user),
            //     jwtToken: generateJwtToken(user)
            // });
        }


        function getUsers() {
            return ok(users.map(x => basicDetails(x)));
        }

        function getPfes() {
            return ok(pfes.map(x => basicDetailsPfe(x)));
        }
        function getUserById() {
            const user = users.find(x => x.id === idFromUrl());
            return ok(basicDetails(user));
        }

        function createUser() {
            // const user = body;

            // if (users.find(x => x.email === user.email)) {
            //     return error(`User with the email ${user.email} already exists`);
            // }

            // // assign user id and a few other properties then save
            // user.id = newUserId();
            // delete user.confirmPassword;
            // users.push(user);
            // localStorage.setItem(usersKey, JSON.stringify(users));

            // return ok();
            if (!isAuthorized(Role.Admin)) return unauthorized();

            const user = body;
            if (users.find(x => x.email === user.email)) {
                return error(`Email ${user.email} is already registered`);
            }

            // assign user id and a few other properties then save
            user.id = newUserId();
            user.dateCreated = new Date().toISOString();
            user.isVerified = true;
            user.refreshTokens = [];
            delete user.confirmPassword;
            users.push(user);
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok();
        }

        function updateUser() {
            // let params = body;
            // let user = users.find(x => x.id === idFromUrl());

            // if (params.email !== user.email && users.find(x => x.email === params.email)) {
            //     return error(`User with the email ${params.email} already exists`);
            // }

            // // only update password if entered
            // if (!params.password) {
            //     delete params.password;
            // }

            // // update and save user
            // Object.assign(user, params);
            // localStorage.setItem(usersKey, JSON.stringify(users));

            // return ok();

            if (!isAuthenticated()) return unauthorized();

            let params = body;
            let user = users.find(x => x.id === idFromUrl());

            // user users can update own profile and admin users can update all profiles
            if (user.id !== currentUser().id && !isAuthorized(Role.Admin)) {
                return unauthorized();
            }

            // only update password if included
            if (!params.password) {
                delete params.password;
            }
            // don't save confirm password
            delete params.confirmPassword;

            // update and save user
            Object.assign(user, params);
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok(basicDetails(user));
        }

        function deleteUser() {
            // users = users.filter(x => x.id !== idFromUrl());
            // localStorage.setItem(usersKey, JSON.stringify(users));
            // return ok();
            if (!isAuthenticated()) return unauthorized();

            let user = users.find(x => x.id === idFromUrl());

            // user users can delete own user and admin users can delete any user
            if (user.id !== currentUser().id && !isAuthorized(Role.Admin)) {
                return unauthorized();
            }

            // delete user then save
            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message: any) {
            return throwError({ error: { message } })
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorized' } })
                .pipe(materialize(), delay(500), dematerialize());
        }

        function basicDetails(user: any) {
            const { id, cin, firstName, lastName, email, role } = user;
            return { id, cin, firstName, lastName, email, role };
        }

        function basicDetailsPfe(pfe: any) {
            const { sujet, rapport, entreprise, mission, motsCles, valid } = pfe;
            return { sujet, rapport, entreprise, mission, motsCles, valid };
        }

        function isAuthenticated() {
            return !!currentUser();
        }

        function isAuthorized(role: Role) {
            const user = currentUser();
            if (!user) return false;
            return user.role === role;
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function newUserId() {
            return users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
        }
        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }
        function isAdmin() {
            return isLoggedIn() && currentUser().role === Role.Admin;
        }
        function isStudent() {
            return isLoggedIn() && currentUser().role === Role.Student;
        }
        function isTeacher() {
            return isLoggedIn() && currentUser().role === Role.Teacher;
        }
        function currentUser() {
            // if (!isLoggedIn()) return;
            // const id = parseInt(headers.get('Authorization').split('.')[1]);
            // return users.find(x => x.id === id);
             // check if jwt token is in auth header
             const authHeader = headers.get('Authorization');
             if (!authHeader.startsWith('Bearer fake-jwt-token')) return;
 
             // check if token is expired
             const jwtToken = JSON.parse(atob(authHeader.split('.')[1]));
             const tokenExpired = Date.now() > (jwtToken.exp * 1000);
             if (tokenExpired) return;
 
             const user = users.find(x => x.id === jwtToken.id);
             return user;
        
        }
        function generateRefreshToken() {
            const token = new Date().getTime().toString();

            // add token cookie that expires in 7 days
            const expires = new Date(Date.now() + 7*24*60*60*1000).toUTCString();
            document.cookie = `fakeRefreshToken=${token}; expires=${expires}; path=/`;

            return token;
        }

        function getRefreshToken() {
            // get refresh token from cookie
            return (document.cookie.split(';').find(x => x.includes('fakeRefreshToken')) || '=').split('=')[1];
        }

    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};