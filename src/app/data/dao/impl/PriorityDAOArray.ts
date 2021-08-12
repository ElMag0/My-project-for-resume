import {Observable, of} from "rxjs";
import {Priority} from "../../../model/Priority";
import { TestData } from "../../TestData";

export class PriorityDAOArray   {

    getAll(): Observable<Priority[]> {
        return of(TestData.priorities)
    }

}