import { User } from "./user.model";

export class Post{
    id: number | undefined;
    title: string = "";
    content: string = "";
    user: User = new User;
}