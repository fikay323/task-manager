import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { TaskListComponent } from './pages/sidebar/task-list/task-list.component';
import { ListListsComponent } from './pages/sidebar/list-lists/list-lists.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { TodayComponent } from './pages/main-page/today/today.component';
import { UpcomingComponent } from './pages/main-page/upcoming/upcoming.component';
import { StickyWallComponent } from './pages/main-page/sticky-wall/sticky-wall.component';
import { PersonalComponent } from './pages/main-page/personal/personal.component';
import { WorkTasksComponent } from './pages/main-page/work-tasks/work-tasks.component';
import { TasksStartComponent } from './pages/main-page/tasks-start/tasks-start.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TasksEditComponent } from './pages/main-page/tasks-edit/tasks-edit.component';
import { DateFilterPipe } from './providers/date-filter.pipe';
import { FormsModule } from '@angular/forms';
import { StringFilterPipe } from './providers/string-filter.pipe';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './providers/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PagesComponent,
    TaskListComponent,
    ListListsComponent,
    MainPageComponent,
    TodayComponent,
    UpcomingComponent,
    StickyWallComponent,
    PersonalComponent,
    WorkTasksComponent,
    TasksStartComponent,
    LoginComponent,
    RegisterComponent,
    TasksEditComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    DateFilterPipe,
    StringFilterPipe,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
