import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NavbarItems } from './navbar-items';

import { find, includes } from 'lodash';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnDestroy, OnInit {
  private _navItem: string = 'getstarted';
  private _navPage: string = 'welcome';
  private _navbarOpen: boolean = false;
  private subscription: Subscription;

  constructor(private location: Location, private router: Router) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    // Support for browser back button
    this.subscription = this.location.subscribe((popState: PopStateEvent) => {
      if (popState.type === 'popstate') {
        if (!includes(popState.url, this._navPage)) {
          this._navPage = (popState.url.length > 0) ? popState.url.substring(1, popState.url.length) : 'welcome';
          this._navItem = this.findNavItem(this._navPage);
        }
      }
    }) as Subscription;
  }

  // Accessors

  get navItem(): string {
    return this._navItem;
  }

  get navPage(): string {
    return this._navPage;
  }

  get navbarOpen(): boolean {
    return this._navbarOpen;
  }

  // Actions

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
      if (page === 'welcome') {
        this._navPage = page;
        this.router.navigate([this._navPage]);
      } else {
        this.navToPage(page);
      }
    }
  }

  navToPage($event: string) {
    this._navPage = $event;
    this._navbarOpen = false; // Close nav for mobile
    this.router.navigate([this._navPage]);
  }

  toggleNavbar(): void {
    this._navbarOpen = !this._navbarOpen;
  }

  // Private

  private findNavItem(path: string): string {
    let item = this._navItem;
    if (this.hasNavPage(NavbarItems.GETSTARTED, path)) {
      item = 'getstarted';
    }
    if (this.hasNavPage(NavbarItems.COMPONENTS, path)) {
      item = 'components';
    }
    if (this.hasNavPage(NavbarItems.DIRECTIVES, path)) {
      item = 'directives';
    }
    if (this.hasNavPage(NavbarItems.PIPES, path)) {
      item = 'pipes';
    }
    if (this.hasNavPage(NavbarItems.SERVICES, path)) {
      item = 'services';
    }
    return item;
  }

  private hasNavPage(items: any[], path: string): boolean {
    let hasPage: boolean = false;
    items.forEach((item: any) => {
      if (item.children !== undefined) {
        item.children.forEach((child: any) => {
          if (child.path === path) {
            hasPage = true;
            return;
          }
        });
      } else if (item.path === path) {
        hasPage = true;
        return;
      }
    });
    return hasPage;
  }
}
