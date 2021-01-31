import { Role } from "./role";

export class User {
    id: number;
    title:string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    token?: string;
    //isDeleting: boolean = false;
    email: string;
}