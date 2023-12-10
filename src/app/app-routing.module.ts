import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TasksStartComponent } from './pages/main-page/tasks-start/tasks-start.component';
import { PersonalComponent } from './pages/main-page/personal/personal.component';
import { UpcomingComponent } from './pages/main-page/upcoming/upcoming.component';
import { TodayComponent } from './pages/main-page/today/today.component';
import { StickyWallComponent } from './pages/main-page/sticky-wall/sticky-wall.component';
import { WorkTasksComponent } from './pages/main-page/work-tasks/work-tasks.component';
import { TasksEditComponent } from './pages/main-page/tasks-edit/tasks-edit.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './providers/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/tasks', pathMatch: 'full'},
  {path: 'tasks', component: PagesComponent, canActivate: [AuthGuard], children: [
    {path: '', component: TasksStartComponent},
    {path: 'upcoming', component: UpcomingComponent}, 
    {path: 'today', component: TodayComponent}, 
    {path: 'sticky-wall', component: StickyWallComponent}, 
    {path: 'personal', component: PersonalComponent}, 
    {path: 'work', component: WorkTasksComponent}, 
    {path: 'new', component: TasksEditComponent},
    {path: ':name/:id', outlet: 'taskDetail', component: TasksEditComponent},
  ]},
  {path: 'auth', component: AuthComponent, children: [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
