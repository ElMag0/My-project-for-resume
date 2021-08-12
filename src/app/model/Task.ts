import {Priority} from "./Priority";
import {User} from "./User";

export class Task {
    id: number;
    title: string;
    completed: boolean;
    priority?: Priority;
    user?: User;
    date?: Date;
    inactive?: boolean


    constructor(id: number, title: string, completed: boolean, priority?: Priority, user?: User, date?: Date, inactive?: boolean) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.priority = priority;
        this.user = user;
        this.date = date;
        this.inactive = inactive
    }
}