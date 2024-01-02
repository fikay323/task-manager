import { Component, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TasksService } from "../providers/Tasks.service";

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})
export class PagesComponent{
  toggledSidebar = true
  screenWidth: number
  userPresent: boolean
  removeNav: boolean = true

  constructor(private route: ActivatedRoute, private taskService: TasksService) {}
  ngOnInit() {
    this.screenWidth = window.innerWidth
    this.adjustBasedOnWidth()
    this.taskService.screenWidth.subscribe(width => {
      this.toggledSidebar = width < 501 ? true : false
    })
    this.route.params.subscribe(params => {
      this.userPresent = params['name'] === 'edit' ? true : false
    })
    this.taskService.removeNavbar.subscribe(bool => {
      console.log(bool)
      this.removeNav = bool
      this.toggledSidebar = bool
    })
  }

  toggleSidebar() {
    this.toggledSidebar = !this.toggledSidebar
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = window.innerWidth;
    this.adjustBasedOnWidth();
  }

  adjustBasedOnWidth(): void {
    if (this.screenWidth < 500) {
      this.toggledSidebar = true
    } else if(this.screenWidth < 680 && this.screenWidth > 500 && this.userPresent === false) {
      this.toggledSidebar = true
    } else {
      this.toggledSidebar = false
    }
  }
}