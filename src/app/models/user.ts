import { Role } from "./role";

export class User {
    id: number;
    cin: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    token?: string;
    email: string;
    profilePic?:string;
}