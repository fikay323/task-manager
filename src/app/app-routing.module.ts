import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TasksStartComponent } from './pages/main-page/tasks-start/tasks-start.component';
import { TasksEditComponent } from './pages/main-page/tasks-edit/tasks-edit.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './providers/auth.guard';
import { TasksResolverService } from './providers/tasks-resolver.service';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/tasks/today', pathMatch: 'full'},
  {path: 'tasks', component: PagesComponent, canActivate: [AuthGuard], resolve: [TasksResolverService], children: [
    {path: '', resolve: [TasksResolverService], component: TasksStartComponent},
    {path: 'new', component: TasksEditComponent},
    {path: ':title', resolve: [TasksResolverService], component: MainPageComponent, children: [
      {path: ':id/:name', resolve: [TasksResolverService], component: TasksEditComponent},
    ]}
  ]},
  {path: 'auth', component: AuthComponent, children: [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
