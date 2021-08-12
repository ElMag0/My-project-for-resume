import {Observable, of} from "rxjs";
import {User} from "../../../model/User";
import { TestData } from "../../TestData";

export class UserDAOArray {

    getAll(): Observable<User[]> {
        return of(TestData.users)
    }


    add(user: User): Observable<User> {
        if(user.id === null || user.id === 0) {
            user.id = this.getLastIdUser()
        }
        TestData.users.push(user)
        return of(user)
    }

    getLastIdUser(): number {
        return Math.max.apply(Math, TestData.users.map(user => user.id)) + 1
    }

    delete(id: number): Observable<User> {

        TestData.tasks.forEach(task => {
            if (task.user && task.user.id === id) {
                task.user = null
            }
            
        })

        const usrTmp = TestData.users.find(t => t.id === id)
        TestData.users.splice(TestData.users.indexOf(usrTmp), 1)
        return of(usrTmp)
    }

    update(user: User): Observable<User> {
        const tmpUser = TestData.users.find(t => t.id === user.id)
        TestData.users.splice(TestData.users.indexOf(tmpUser), 1, user)
        return of(tmpUser)
    }

}