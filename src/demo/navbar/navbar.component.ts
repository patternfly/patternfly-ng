import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';

import { NavbarItems } from './navbar-items';

import { find } from 'lodash';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  private _navItem: string = 'getstarted';
  private _navPage: string;
  private _navbarOpen: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  get navItem(): string {
    return this._navItem;
  }

  get navPage(): string {
    return this._navPage;
  }

  get navbarOpen(): boolean {
    return this._navbarOpen;
  }

  getPath(id: string): string {
    let item = find(NavbarItems.GETSTARTED, {
      id: id
    });
    return item.path;
  }

  navToItem($event: string): void {
    this._navItem = $event;

    let page;
    if ($event === 'getstarted') {
      page = this.getPath('getstarted');
    } else if ($event === 'components') {
      page = this.getPath('components');
    } else if ($event === 'directives') {
      page = this.getPath('directives');
    } else if ($event === 'pipes') {
      page = this.getPath('pipes');
    } else if ($event === 'services') {
      page = this.getPath('services');
    }
    if (page !== undefined) {
      this.navToPage(page);
    }
  }

  navToPage($event: string) {
    this._navPage = $event;
    this.router.navigate([this._navPage]);
  }

  toggleNavbar(): void {
    this._navbarOpen = !this._navbarOpen;
  }
}
