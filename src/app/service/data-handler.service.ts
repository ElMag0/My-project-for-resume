import {Injectable} from '@angular/core';
import {Task} from '../model/Task';
import {Observable, of} from "rxjs";
import {TaskDAOArray} from "../data/dao/impl/TaskDAOArray";
import { User } from '../model/User';
import { UserDAOArray } from '../data/dao/impl/UserDAOArray';
import { Priority } from '../model/Priority';
import { PriorityDAOArray } from '../data/dao/impl/PriorityDAOArray';



@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    private taskDaoArray = new TaskDAOArray();
    private userDaoArray = new UserDAOArray();
    private priorityDaoArray = new PriorityDAOArray();

    constructor() {
    }

    getAllTasks(): Observable<Task[]> {
        return this.taskDaoArray.getAll();
    }


    getAllUsers(): Observable<User[]> {
        return this.userDaoArray.getAll()
    }

    getAllPriorities(): Observable<Priority[]> {
        return this.priorityDaoArray.getAll()
    }

    searchTasks(user: User, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
        return this.taskDaoArray.search(user, searchText, status, priority)
    }

    updateTask(task: Task): Observable<Task> {
        return this.taskDaoArray.update(task)
    }

    deleteTask(id: number): Observable<Task> {
        return this.taskDaoArray.delete(id)
    }

    updateUser(user: User): Observable<User> {
        return this.userDaoArray.update(user)
    }

    deleteUser(id: number): Observable<User> {
        return this.userDaoArray.delete(id)
    }

    addTask(task: Task): Observable<Task> {
        return this.taskDaoArray.add(task)
    }

    addUser(title: string): Observable<User> {
        return this.userDaoArray.add(new User(null, title))
    }
}
