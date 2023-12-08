import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { TaskListComponent } from './pages/sidebar/task-list/task-list.component';
import { ListListsComponent } from './pages/sidebar/list-lists/list-lists.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { TodayComponentComponent } from './pages/main-page/today-component/today-component.component';
import { UpcomingComponentComponent } from './pages/main-page/upcoming-component/upcoming-component.component';
import { StickyWallComponentComponent } from './pages/main-page/sticky-wall-component/sticky-wall-component.component';
import { PersonalComponentComponent } from './pages/main-page/personal-component/personal-component.component';
import { WorkTasksComponentComponent } from './pages/main-page/work-tasks-component/work-tasks-component.component';
import { TasksStartComponentComponent } from './pages/main-page/tasks-start-component/tasks-start-component.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TaskListComponent,
    ListListsComponent,
    MainPageComponent,
    TodayComponentComponent,
    UpcomingComponentComponent,
    StickyWallComponentComponent,
    PersonalComponentComponent,
    WorkTasksComponentComponent,
    TasksStartComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
