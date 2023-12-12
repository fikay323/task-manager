import { Component, HostListener, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})
export class PagesComponent{
  toggledSidebar = false
  screenWidth: number
  userPresent: boolean

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userPresent = params['name'] === 'edit' ? true : false
    })
  }

  toggleSidebar() {
    this.toggledSidebar = !this.toggledSidebar
    console.log(this.toggledSidebar)
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