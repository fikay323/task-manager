import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})
export class PagesComponent{
    sidebarCollapsed = false
    @ViewChild('sidebar') sideBar: any

    constructor(private renderer: Renderer2) {}

    toggleSideBar() {
        const sideBar = this.sideBar.nativeElement
        if(this.sideBar.nativeElement.clientWidth === 0){
            const classesToAdd = ['p-3', 'w-[200px]', 'translate-x-0'];
            const nativeElement = this.sideBar.nativeElement;
            classesToAdd.forEach(className => {
              this.renderer.addClass(nativeElement, className);
            });
            const classesToRemove = ['p-0', 'w-0', 'translate-x-[-200%]'];
            classesToRemove.forEach(className => {
              this.renderer.removeClass(nativeElement, className);
            });
        } else {
            const classesToRemove = ['p-3', 'w-[200px]', 'translate-x-0', 'md:w-[200px]', 'md:translate-x-0', 'md:p-3'];
            const nativeElement = this.sideBar.nativeElement;
            classesToRemove.forEach(className => {
              this.renderer.removeClass(nativeElement, className);
            });
            const classesToAdd = ['p-0', 'w-0', 'translate-x-[-200%]'];
            classesToAdd.forEach(className => {
              this.renderer.addClass(nativeElement, className);
            });
        }
    }
}