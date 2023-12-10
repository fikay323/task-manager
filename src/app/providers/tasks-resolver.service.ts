import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { Task } from "../shared/task.model";
import { DataStorageService } from "./data-storage.service";

@Injectable({providedIn: 'root'})
export class TasksResolverService implements Resolve<Task[]> {

    constructor(private dataStorageService: DataStorageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Task[] | Observable<Task[]> | Promise<Task[]> {
        return this.dataStorageService.fetchTaskFromDatabase()
    }

}