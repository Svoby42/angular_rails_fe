import { Role } from "./role.enum"

export class User{
    id: number | undefined;
    full_name: string = "";
    email: string = "";    
    password: string = "";
    password_confirmation: string = ""
    name: string = "";
    token: string = "";
    role: Role = Role.USER;
}