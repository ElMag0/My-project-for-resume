import {User} from "../../../model/User";
import {Observable, of} from "rxjs";
import {Priority} from "../../../model/Priority";
import {Task} from 'src/app/model/Task';
import {TestData} from "../../TestData";


export class TaskDAOArray {


    getAll(): Observable<Task[]> {
        return of(TestData.tasks);
    }


    add(task: Task): Observable<Task> {
        if (task.id === null || task.id === 0) {
            task.id = this.getLastIdTask()
        }
        TestData.tasks.push(task)
        return of(task)
    }

    getLastIdTask(): number {
        return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1
    }

    delete(id: number): Observable<Task> {
        const taskTmp = TestData.tasks.find(t => t.id === id);
        TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1)
        return of(taskTmp)
    }


    search(user: User, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
        return of(this.searchTasks(user, searchText, status, priority));
    }

    private searchTasks(user: User, searchText: string, status: boolean, priority: Priority): Task[] {
        let allTasks = TestData.tasks

        if (status != null) {
            allTasks = allTasks.filter(task => task.completed === status)
        }

        if (user != null) {
            allTasks = allTasks.filter(task => task.user === user);
        }

        if (priority != null) {
            allTasks = allTasks.filter(task => task.priority === priority);
        }

        if (searchText != null) {
            allTasks = allTasks.filter(
                task =>
                    task.title.toUpperCase().includes(searchText.toUpperCase()) 
            );
        }
        return allTasks
    }

    update(task: Task): Observable<Task> {
        const taskTmp = TestData.tasks.find(t => t.id === task.id)
        TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task )
        return of(task)
    }

}