import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { NavbarItems } from './navbar-items';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'navbar-side',
  styleUrls: ['./navbar-side.component.less'],
  templateUrl: './navbar-side.component.html'
})
export class NavbarSideComponent implements OnInit {
  @Input() navItem: string;
  @Input() navPage: string;
  @Input() navbarOpen: boolean = false;

  @Output('onNavItemSelect') onNavItemSelect = new EventEmitter();
  @Output('onNavPageSelect') onNavPageSelect = new EventEmitter();

  private _collapsed: any = {};
  private components: any[] = NavbarItems.COMPONENTS;
  private directives: any[] = NavbarItems.DIRECTIVES;
  private getStarted: any[] = NavbarItems.GETSTARTED;
  private pipes: any[] = NavbarItems.PIPES;
  private services: any[] = NavbarItems.SERVICES;

  constructor() {
  }

  ngOnInit(): void {
  }

  getIds(item: any): any[] {
    let ids: any = [];
    if (item.children !== undefined) {
      item.children.forEach((child: any) => {
        ids.push(child.id);
      });
    } else {
      ids.push(item.id);
    }
    return ids;
  }

  isCollapsed(name: string): boolean {
    if (this._collapsed[name] === undefined) {
      this._collapsed[name] = false; // default open
    }
    return this._collapsed[name];
  }

  isPageSelected(name: string[]): boolean {
    let found = false;
    name.forEach((pageName) => {
      if (this.navPage === pageName) {
        found = true;
        return;
      }
    });
    return found;
  }

  isNavbarOpen(): boolean {
    return this.navbarOpen;
  }

  isNavItemSelected(name: string) {
    return (this.navItem === name);
  }

  selectNavItem($event: MouseEvent, name: string): void {
    this.onNavItemSelect.emit(name);
  }

  selectNavPage($event: MouseEvent, name: string): void {
    this.onNavPageSelect.emit(name);
  }

  toggleCollapsed($event: any, name: string): void {
    this._collapsed[name] = !this.isCollapsed(name);
  }
}
