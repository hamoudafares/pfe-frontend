import { Role } from "./role";
import {Pfe} from "./pfe";

export class User {
    id: string;
    CIN: number;
    username: string;
    password: string;
    firstName: string;
    familyName: string;
    role: Role;
    token?: string;
    salt:string;
    email: string;
    profilePic:string;


    set _id(value: string){
      this.id = value;
    }

}
