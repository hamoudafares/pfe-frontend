import { Role } from "./role";

export class User {
    id: number;
    CIN: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    token?: string;
    salt:string;
    //isDeleting: boolean = false;
    email: string;
}