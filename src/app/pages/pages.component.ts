import { Component, HostListener, Renderer2, ViewChild } from "@angular/core";

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})
export class PagesComponent{
  toggledSidebar = true
  screenWidth: number

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
    } else {
      this.toggledSidebar = false
    }
  }
}