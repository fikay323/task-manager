import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { Task } from "../shared/task.model";
import { DataStorageService } from "./data-storage.service";
import { TasksService } from "./Tasks.service";

@Injectable({providedIn: 'root'})
export class TasksResolverService implements Resolve<Task[]> {
    fetched: boolean = false

    constructor(private dataStorageService: DataStorageService, private taskService: TasksService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Task[] | Observable<Task[]> | Promise<Task[]> {
        if(this.fetched) {
            const array = this.taskService.getTasks()
            return array
        } else {
            this.fetched = true
            return this.dataStorageService.fetchTaskFromDatabase()
        }
    }

}