import {
  Component, ElementRef, EventEmitter,
  Input, OnDestroy, OnInit, Output, Renderer2, TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationItemConfig } from './navigation-item-config';

/**
 * Vertical navigation component
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-vertical-navigation',
  styleUrls: ['./vertical-navigation.component.less'],
  templateUrl: './vertical-navigation.component.html',
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class VerticalNavigationComponent implements OnInit, OnDestroy {

  /**
   * Source for the brand logo at the top
   */
  @Input() brandSrc: string;

  /**
   * Alternate text to display for the logo
   */
  @Input() brandAlt: string;

  /**
   * Boolean to indicate whether or not to show badges
   */
  @Input() showBadges: boolean;

  /**
   * Indicates whether or not to allow the secondary to persist
   */
  @Input() persistentSecondary: boolean;

  /**
   * Allow pinnable menus when they are open
   */
  @Input() pinnableMenus: boolean;

  /**
   * Hide menu items
   */
  @Input() hiddenIcons: boolean;

  /**
   * The navigation items used to build the menu
   */
  @Input() items: NavigationItemConfig[];

  /**
   * Sets an active flag on items when they are selected
   */
  @Input() updateActiveItemsOnClick: boolean;

  /**
   * Indicates whether or not this is a mobile friendly navigation
   */
  @Input() ignoreMobile: boolean;

  /**
   * Hide top banner optionally
   */
  @Input() hideTopBanner: boolean;

  /**
   * This event is fired any time the user has initiated navigation
   */
  @Output('onNavigationEvent') navigationEvent = new EventEmitter();

  /**
   * This event is fired any time an item in the navigation is clicked
   */
  @Output('onItemClickEvent') itemClickEvent = new EventEmitter();

  private activeSecondary: boolean = false;
  private showMobileNav: boolean = false;
  private showMobileSecondary: boolean = false;
  private showMobileTertiary: boolean = false;
  private hoverSecondaryNav: boolean = false;
  private hoverTertiaryNav: boolean = false;
  private collapsedSecondaryNav: boolean = false;
  private collapsedTertiaryNav: boolean = false;
  private navCollapsed: boolean = false;
  private hoverTimeout: number;
  private forceHidden: boolean = false;
  private inMobileState: boolean;
  private routeChangeListener: any;

  // Private internal functions
  private breakpoints: any = {
    'tablet': 768,
    'desktop': 1200
  };
  private explicitCollapse: boolean = false;
  private hoverDelay: number = 500;
  private hideDelay: number = this.hoverDelay + 200;

  /**
   * The default constructor
   */
  constructor(private elementRef: ElementRef, private renderer: Renderer2, private router: Router) {
  }

  ngOnInit() {
    this.routeChangeListener = this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        if (!this.updateActiveItemsOnClick) {
          this.clearActiveItems();
          this.initActiveItems();
        }
      }
    });

    if (!this.updateActiveItemsOnClick) {
      this.clearActiveItems();
      this.initActiveItems();
    }

    this.initBodyElement();
    this.checkNavState();
  }

  ngOnDestroy() {
    this.routeChangeListener.unsubscribe();
  }

  private addClass(className: string): void {
    let element = this.elementRef.nativeElement;
    this.renderer.addClass(element, className);
  }

  private removeClass(className: string): void {
    let element = this.elementRef.nativeElement;
    this.renderer.removeClass(element, className);
  }

  private initBodyElement(): void {
    if (this.showBadges) {
      this.addClass('nav-pf-vertical-with-badges');
    }
    if (this.persistentSecondary) {
      this.addClass('nav-pf-persistent-secondary');
    }
    if (this.hiddenIcons) {
      this.addClass('hidden-icons-pf');
    }
  }

  private updateMobileMenu(selected?: NavigationItemConfig, secondaryItem?: NavigationItemConfig): void {
    this.items.forEach((item) => {
      item.mobileItem = false;
      if (item.children) {
        item.children.forEach((nextSecondary) => {
          nextSecondary.mobileItem = false;
        });
      }
    });

    if (selected) {
      selected.mobileItem = true;
      if (secondaryItem) {
        secondaryItem.mobileItem = true;
        this.showMobileSecondary = false;
        this.showMobileTertiary = true;
      } else {
        this.showMobileSecondary = true;
        this.showMobileTertiary = false;
      }
    } else {
      this.showMobileSecondary = false;
      this.showMobileTertiary = false;
    }
  }

   private checkNavState() {
    window.innerWidth;
    let width = window.innerWidth;

    // Check to see if we need to enter/exit the mobile state
    if (!this.ignoreMobile && width < this.breakpoints.tablet) {
      if (!this.inMobileState) {
        this.inMobileState = true;

        //Set the body class to the correct state
        this.removeClass('collapsed-nav');
        this.addClass('hidden-nav');

        // Reset the collapsed states
        this.updateSecondaryCollapsedState(false);
        this.updateTertiaryCollapsedState(false);

        this.explicitCollapse = false;
      }
    } else  {
      this.inMobileState = false;
      this.showMobileNav = false;

      // Set the body class back to the default
      this.removeClass('hidden-nav');
    }

    if (this.explicitCollapse) {
      this.navCollapsed = true;
      this.addClass('collapsed-nav');
    } else {
      this.navCollapsed = false;
      this.removeClass('collapsed-nav');
    }
  }

  private collapseMenu(): void {
    this.navCollapsed = true;

    //Set the body class to the correct state
    this.addClass('collapsed-nav');

    this.explicitCollapse = true;
  }

  private expandMenu() {
    this.navCollapsed = false;

    //Set the body class to the correct state
    this.removeClass('collapsed-nav');

    this.explicitCollapse = false;

    // Dispatch a resize event when showing the expanding then menu to
    // allow content to adjust to the menu sizing
    window.dispatchEvent(new Event('resize'));
  }

  private forceHideSecondaryMenu() {
    this.forceHidden = true;
    setTimeout(() => {
      this.forceHidden = false;
    }, 500);
  }

  private setParentActive(item: NavigationItemConfig) {
    this.items.forEach((topLevel) => {
      if (topLevel.children) {
        topLevel.children.forEach((secondLevel) => {
          if (secondLevel === item) {
            topLevel.trackActiveState = true;
          }
          if (secondLevel.children) {
            secondLevel.children.forEach((thirdLevel) => {
              if (thirdLevel === item) {
                topLevel.trackActiveState = true;
                secondLevel.trackActiveState = true;
              }
            });
          }
        });
      }
    });
  }

  private getFirstNavigateChild(item: NavigationItemConfig): NavigationItemConfig {
    var firstChild;
    if (!item.children || item.children.length < 1) {
      firstChild = item;
    } else {
      firstChild = this.getFirstNavigateChild(item.children[0]);
    }
    return firstChild;
  }

  private setSecondaryItemVisible() {
    this.activeSecondary = false;

    if (this.persistentSecondary && !this.inMobileState) {
      this.items.forEach((topLevel) => {
        if (topLevel.children) {
          topLevel.children.forEach((secondLevel) => {
            if (secondLevel.trackActiveState) {
              this.activeSecondary = true;
            }
          });
        }
      });
      if (this.activeSecondary) {
        this.addClass('secondary-visible-pf');
      } else {
        this.removeClass('secondary-visible-pf');
      }
    }
  }

  private navigateToItem(item: NavigationItemConfig): void {
    let navItem = this.getFirstNavigateChild(item);
    let navTo;
    if (navItem) {
      this.showMobileNav = false;
      navTo = navItem.url;
      if (navTo) {
        this.router.navigateByUrl(navTo);
      }
      if(this.navigationEvent) {
        this.navigationEvent.emit(navItem);
      }
    }

    if (this.itemClickEvent) {
      this.itemClickEvent.emit(item);
    }

    if (this.updateActiveItemsOnClick ) {
      this.clearActiveItems();
      navItem.trackActiveState = true;
      this.setParentActive(navItem);
      this.setSecondaryItemVisible();
    }
    this.setSecondaryItemVisible();
  }

  private primaryHover(): boolean {
    let hover = false;
    this.items.forEach( (item) => {
      if (item.trackHoverState) {
        hover = true;
      }
    });
    return hover;
  }

  private secondaryHover(): boolean {
    let hover = false;
    this.items.forEach((item) => {
      if (item.children && item.children.length > 0) {
        item.children.forEach( (secondaryItem) => {
          if (secondaryItem.trackHoverState) {
            hover = true;
          }
        });
      }
    });
    return hover;
  }

  private updateSecondaryCollapsedState(setCollapsed: boolean, collapsedItem?: NavigationItemConfig) {
    if (collapsedItem) {
      collapsedItem.secondaryCollapsed = setCollapsed;
    }
    if (setCollapsed) {
      this.collapsedSecondaryNav = true;

      this.addClass('collapsed-secondary-nav-pf');
    } else {
      // Remove any collapsed secondary menus
      if (this.items) {
        this.items.forEach( (item)  => {
          item.secondaryCollapsed = false;
        });
      }
      this.collapsedSecondaryNav = false;

      this.removeClass('collapsed-secondary-nav-pf');
    }
  }

  private updateTertiaryCollapsedState(setCollapsed: boolean, collapsedItem?: NavigationItemConfig): void {
    if (collapsedItem) {
      collapsedItem.tertiaryCollapsed = setCollapsed;
    }
    if (setCollapsed) {
      this.collapsedTertiaryNav = true;

      this.addClass('collapsed-tertiary-nav-pf');
      this.updateSecondaryCollapsedState(false);
    } else {
      // Remove any collapsed secondary menus
      if (this.items) {
        this.items.forEach( (item) => {
          if (item.children && item.children.length > 0) {
            item.children.forEach( (secondaryItem) => {
              secondaryItem.tertiaryCollapsed = false;
            });
          }
        });
      }
      this.collapsedTertiaryNav = false;

      this.removeClass('collapsed-tertiary-nav-pf');
    }
  }

  /**
   * Clear all active items
   */
  public clearActiveItems(): void{
    this.items.forEach( (item) => {
      item.trackActiveState = false;
      if (item.children) {
        item.children.forEach( (secondary) => {
          secondary.trackActiveState = false;
          if (secondary.children) {
            secondary.children.forEach( (tertiary) => {
              tertiary.trackActiveState = false;
            });
          }
        });
      }
    });
  }

  /**
   * Initialize the active items in the vertical navigation
   */
  public initActiveItems(): void {
    let updatedRoute = this.router.url;
    // //Setting active state on load
    this.items.forEach( (topLevel)  => {
      if (updatedRoute.indexOf(topLevel.url) > -1) {
        topLevel.trackActiveState = true;
      }
      if (topLevel.children) {
        topLevel.children.forEach( (secondLevel) => {
          if (updatedRoute.indexOf(secondLevel.url) > -1) {
            secondLevel.trackActiveState = true;
            topLevel.trackActiveState = true;
          }
          if (secondLevel.children) {
            secondLevel.children.forEach( (thirdLevel) => {
              if (updatedRoute.indexOf(thirdLevel.url) > -1) {
                thirdLevel.trackActiveState = true;
                secondLevel.trackActiveState = true;
                topLevel.trackActiveState = true;
              }
            });
          }
        });
      }
    });
  }

  /**
   * Public resize event called when the window size changes
   * @param event
   */
  public onResize(event: any): void {
    this.checkNavState();
  }

  /**
   * Handles the navbar hamburger toggle click
   */
  public handleNavBarToggleClick(): void{

    if (this.inMobileState) {
      // Toggle the mobile nav
      if (this.showMobileNav) {
        this.showMobileNav = false;
      } else {
        // Always start at the primary menu
        this.updateMobileMenu();
        this.showMobileNav = true;
      }
    } else if (this.navCollapsed) {
      this.expandMenu();
    } else {
      this.collapseMenu();
    }
  }

  /**
   * Primary item selection handler
   * @param item
   */
  public handlePrimaryClick(item: any): void {
    if (this.inMobileState) {
      if (item.children && item.children.length > 0) {
        this.updateMobileMenu(item);
      } else {
        this.updateMobileMenu();
        this.navigateToItem(item);
      }
    } else {
      this.navigateToItem(item);
    }
  }

  /**
   * Secondary item selection handler
   * @param primary
   * @param secondary
   */
  public handleSecondaryClick(primary: NavigationItemConfig, secondary: NavigationItemConfig): void {
    if (this.inMobileState) {
      if (secondary.children && secondary.children.length > 0) {
        this.updateMobileMenu(primary, secondary);
      } else {
        this.updateMobileMenu();
        this.navigateToItem(secondary);
      }
    } else {
      this.navigateToItem(secondary);
    }
  }

  /**
   * Tertiary item selection handler
   * @param primary
   * @param secondary
   * @param tertiary
   */
  public handleTertiaryClick(primary: NavigationItemConfig, secondary: NavigationItemConfig, tertiary: NavigationItemConfig): void {
    if (this.inMobileState) {
      this.updateMobileMenu();
    }

    this.navigateToItem(tertiary);
  }

  /**
   *  Show secondary nav bar on hover of primary nav items
   * @param item
   */
  public handlePrimaryHover(item: NavigationItemConfig): void {
    if (item.children && item.children.length > 0) {
      if (!this.inMobileState) {
        if (item.blurTimeout !== undefined) {
          clearTimeout(item.blurTimeout);
          item.blurTimeout = undefined;
        } else if (this.hoverTimeout === undefined && !item.trackHoverState) {
          item.hoverTimeout = setTimeout(() => {
            this.hoverSecondaryNav = true;
            item.trackHoverState = true;
            item.hoverTimeout = undefined;
          }, this.hoverDelay);
        }
      }
    }
  }

  /**
   * Hides menus on blur
   * @param item
   */
  public handlePrimaryBlur(item: NavigationItemConfig): void {
    if (item.children && item.children.length > 0) {
      if (item.hoverTimeout !== undefined) {
        clearTimeout(item.hoverTimeout);
        item.hoverTimeout = undefined;
      } else if (item.blurTimeout === undefined && item.trackHoverState) {
        item.blurTimeout = setTimeout(() => {
          item.trackHoverState = false;
          if (!this.primaryHover()) {
            this.hoverSecondaryNav = false;
          }
          item.blurTimeout = undefined;
        }, this.hideDelay);
      }
    }
  }

  /**
   * Show tertiary nav bar on hover of secondary nav items
   * @param item
   */
  public handleSecondaryHover(item: any): void {
    if (item.children && item.children.length > 0) {
      if (!this.inMobileState) {
        if (item.blurTimeout !== undefined) {
          clearTimeout(item.blurTimeout);
          item.blurTimeout = undefined;
        } else if (this.hoverTimeout === undefined) {
          item.navHoverTimeout = setTimeout( () => {
            this.hoverTertiaryNav = true;
            item.trackHoverState = true;
            item.navHoverTimeout = undefined;
          }, this.hoverDelay);
        }
      }
    }
  }

  /**
   * Hides menus on blur
   * @param item
   */
  public handleSecondaryBlur(item: NavigationItemConfig): void {
    if (item.children && item.children.length > 0) {
      if (item.hoverTimeout !== undefined) {
        clearTimeout(item.hoverTimeout);
        item.hoverTimeout = undefined;
      } else if (item.blurTimeout === undefined) {
        item.blurTimeout = setTimeout( () => {
          item.trackHoverState = false;
          if (!this.secondaryHover()) {
            this.hoverTertiaryNav = false;
          }
          item.blurTimeout = undefined;
        }, this.hideDelay);
      }
    }
  }

  /**
   * Collapse secondary navigation
   * @param item
   */
  public collapseSecondaryNav(item: NavigationItemConfig): void {
    if (this.inMobileState) {
      this.updateMobileMenu();
    } else {
      if (item.secondaryCollapsed) {
        this.updateSecondaryCollapsedState(false, item);
        this.forceHideSecondaryMenu();
      } else {
        this.updateSecondaryCollapsedState(true, item);
      }
    }

    this.hoverSecondaryNav = false;
  };

  /**
   * Collapse tertiary navigation
   * @param item
   */
  public collapseTertiaryNav(item: NavigationItemConfig): void {
    if (this.inMobileState) {
      this.items.forEach((primaryItem) => {
        if (primaryItem.children) {
          primaryItem.children.forEach((secondaryItem) => {
            if (secondaryItem === item) {
              this.updateMobileMenu(primaryItem);
            }
          });
        }
      });
    } else {
      if (item.tertiaryCollapsed) {
        this.updateTertiaryCollapsedState(false, item);
        this.forceHideSecondaryMenu();
      } else {
        this.updateTertiaryCollapsedState(true, item);
      }
    }

    this.hoverSecondaryNav = false;
    this.hoverTertiaryNav = false;
  }
}
