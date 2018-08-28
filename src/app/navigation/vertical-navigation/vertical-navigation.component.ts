import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { VerticalNavigationItem } from './vertical-navigation-item';
import { WindowReference } from '../../utilities/window.reference';

import { uniqueId } from 'lodash';

/**
 * Vertical Navigation component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { VerticalNavigationModule } from 'patternfly-ng/navigation';
 * // Or
 * import { VerticalNavigationModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [VerticalNavigationModule, BsDropdownModule.forRoot(),...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-vertical-navigation',
  templateUrl: './vertical-navigation.component.html'
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
   * Container for page content
   */
  @Input() contentContainer: HTMLElement;

  /**
   * Indicates whether or not this is a mobile friendly navigation, default: false
   */
  @Input() ignoreMobile: boolean = false;

  /**
   * The navigation items used to build the menu
   */
  @Input() items: VerticalNavigationItem[];

  /**
   * Indicates whether or not to allow the secondary to persist, default: false
   */
  @Input() persistentSecondary: boolean = false;

  /**
   * Allow pinnable menus when they are open, default: false
   */
  @Input() pinnableMenus: boolean = false;

  /**
   * Boolean to indicate whether or not to show badges, default: false
   */
  @Input() showBadges: boolean = false;

  /**
   * Show menu icons, default: true
   */
  @Input() showIcons: boolean = true;

  /**
   * Boolean indicating menu is shown initially collapsed
   *
   * Note that this does not apply for the mobile state
   */
  @Input() showMenuCollapsed: boolean = false;

  /**
   * Show top banner, default: true
   */
  @Input() showTopBanner: boolean = true;

  /**
   * Sets an active flag on items when they are selected, default: false
   */
  @Input() updateActiveItemsOnClick: boolean = false;

  /**
   * This event is fired any time the user has initiated navigation
   */
  @Output('onNavigationEvent') navigationEvent = new EventEmitter();

  /**
   * This event is fired any time an item in the navigation is clicked
   */
  @Output('onItemClickEvent') itemClickEvent = new EventEmitter();

  private _activeSecondary: boolean = false;
  private _collapsedSecondaryNav: boolean = false;
  private _collapsedTertiaryNav: boolean = false;
  private _forceHidden: boolean = false;
  private _hoverSecondaryNav: boolean = false;
  private _hoverTertiaryNav: boolean = false;
  private _inMobileState: boolean;
  private _navCollapsed: boolean = false;
  private _showMobileNav: boolean = false;
  private _showMobileSecondary: boolean = false;
  private _showMobileTertiary: boolean = false;

  // Private internal variables
  private hoverTimeout: number;
  private routeChangeListener: any;
  private breakpoints: any = {
    'tablet': 768,
    'desktop': 1200
  };
  private explicitCollapse: boolean = false;
  private hoverDelay: number = 500;
  private hideDelay: number = this.hoverDelay + 200;
  private id: string = uniqueId('pfng-vertical-navigation');
  private windowListener: any;

  /**
   * The default constructor
   */
  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private router: Router,
              private windowRef: WindowReference) {
  }

  /**
   * Setup component configuration upon initialization
   */
  ngOnInit() {
    this.windowListener = this.windowRef.nativeWindow.addEventListener('resize', (event: any) => {
      this.onResize(event);
    });

    this.routeChangeListener = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
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

    if (this.showMenuCollapsed !== undefined) {
      this.explicitCollapse = this.showMenuCollapsed;
    }
    this.initBodyElement();
    this.checkNavState();
  }

  /**
   * Destroy listeners
   */
  ngOnDestroy() {
    if (this.routeChangeListener !== undefined) {
      this.routeChangeListener.unsubscribe();
    }
    if (this.windowListener !== undefined) {
      this.windowRef.nativeWindow.removeEventListener('resize', this.windowListener);
    }
  }

  /**
   * Return an ID for the given element prefix and index (e.g., 'pfng-vertical-navigation1-item0')
   *
   * Note: The ID prefix can be overridden by providing an id for the pfng-list tag.
   *
   * @param {string} suffix The element suffix (e.g., 'item')
   * @param {number} index The current item index
   * @returns {string}
   */
  protected getId(suffix: string, index: number): string {
    let result = this.id;
    if (this.elementRef.nativeElement.id !== undefined && this.elementRef.nativeElement.id.length > 0) {
      result = this.elementRef.nativeElement.id;
    }
    return result + '-' + suffix + index;
  }

  // Accessors

  /**
   * Returns flag indicating if secondary menu is active
   *
   * @returns {boolean} True if secondary menu is active
   */
  get activeSecondary(): boolean {
    return this._activeSecondary;
  }

  /**
   * Returns flag indicating if mobile nav should be shown
   *
   * @returns {boolean} True if mobile nav should be shown
   */
  get showMobileNav(): boolean {
    return this._showMobileNav;
  }

  /**
   * Returns flag indicating if mobile secondary should be shown
   *
   * @returns {boolean} True if mobile secondary should be shown
   */
  get showMobileSecondary(): boolean {
    return this._showMobileSecondary;
  }

  /**
   * Returns flag indicating if mobile tertiary should be shown
   *
   * @returns {boolean} True if mobile tertiary should be shown
   */
  get showMobileTertiary(): boolean {
    return this._showMobileTertiary;
  }

  /**
   * Returns flag indicating if secondary nav is being hovered over
   *
   * @returns {boolean} True if secondary nav is being hovered over
   */
  get hoverSecondaryNav(): boolean {
    return this._hoverSecondaryNav;
  }

  /**
   * Returns flag indicating if tertiary nav is being hovered over
   *
   * @returns {boolean} True if tertiary nav is being hovered over
   */
  get hoverTertiaryNav(): boolean {
    return this._hoverTertiaryNav;
  }

  /**
   * Returns flag indicating if secondary nav is collapsed
   *
   * @returns {boolean} True if secondary nav is collapsed
   */
  get collapsedSecondaryNav(): boolean {
    return this._collapsedSecondaryNav;
  }

  /**
   * Returns flag indicating if tertiary nav is collapsed
   *
   * @returns {boolean} True if tertiary nav is collapsed
   */
  get collapsedTertiaryNav(): boolean {
    return this._collapsedTertiaryNav;
  }

  /**
   * Returns flag indicating if nav should be entirely hidden when screen is below desktop resolution
   *
   * @returns {boolean} True if nav should be entirely hidden
   */
  get forceHidden(): boolean {
    return this._forceHidden;
  }

  /**
   * Returns flag indicating if the navigation is in a mobile state
   *
   * @returns {boolean} True if the navigation is in a mobile state
   */
  get inMobileState(): boolean {
    return this._inMobileState;
  }

  /**
   * Returns flag indicating if nav is collapsed
   *
   * @returns {boolean} True if nav is collapsed
   */
  get navCollapsed(): boolean {
    return this._navCollapsed;
  }

  // Actions

  /**
   * Clear all active items
   */
  public clearActiveItems(): void {
    this.items.forEach((item) => {
      item.trackActiveState = false;
      if (item.children !== undefined) {
        item.children.forEach((secondary) => {
          secondary.trackActiveState = false;
          if (secondary.children !== undefined) {
            secondary.children.forEach((tertiary) => {
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
    this.items.forEach((topLevel) => {
      if (updatedRoute.indexOf(topLevel.url) > -1) {
        topLevel.trackActiveState = true;
      }
      if (topLevel.children !== undefined) {
        topLevel.children.forEach((secondLevel) => {
          if (updatedRoute.indexOf(secondLevel.url) > -1) {
            secondLevel.trackActiveState = true;
            topLevel.trackActiveState = true;
          }
          if (secondLevel.children !== undefined) {
            secondLevel.children.forEach((thirdLevel) => {
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
  public handleNavBarToggleClick(): void {
    if (this.inMobileState === true) {
      // Toggle the mobile nav
      if (this.showMobileNav === true) {
        this._showMobileNav = false;
      } else {
        // Always start at the primary menu
        this.updateMobileMenu();
        this._showMobileNav = true;
      }
    } else if (this.navCollapsed === true) {
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
    if (this.inMobileState === true) {
      if (item.children !== undefined && item.children.length > 0) {
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
  public handleSecondaryClick(primary: VerticalNavigationItem, secondary: VerticalNavigationItem): void {
    if (this.inMobileState === true) {
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
  public handleTertiaryClick(primary: VerticalNavigationItem, secondary: VerticalNavigationItem,
      tertiary: VerticalNavigationItem): void {
    if (this.inMobileState === true) {
      this.updateMobileMenu();
    }
    this.navigateToItem(tertiary);
  }

  /**
   *  Show secondary nav bar on hover of primary nav items
   * @param item
   */
  public handlePrimaryHover(item: VerticalNavigationItem): void {
    if (item.children !== undefined && item.children.length > 0) {
      if (this.inMobileState !== true) {
        if (item.blurTimeout !== undefined) {
          clearTimeout(item.blurTimeout);
          item.blurTimeout = undefined;
        } else if (this.hoverTimeout === undefined && !item.trackHoverState) {
          item.hoverTimeout = setTimeout(() => {
            this._hoverSecondaryNav = true;
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
  public handlePrimaryBlur(item: VerticalNavigationItem): void {
    if (item.children !== undefined && item.children.length > 0) {
      if (item.hoverTimeout !== undefined) {
        clearTimeout(item.hoverTimeout);
        item.hoverTimeout = undefined;
      } else if (item.blurTimeout === undefined && item.trackHoverState) {
        item.blurTimeout = setTimeout(() => {
          item.trackHoverState = false;
          if (this.primaryHover() !== true) {
            this._hoverSecondaryNav = false;
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
    if (item.children !== undefined && item.children.length > 0) {
      if (this.inMobileState !== true) {
        if (item.blurTimeout !== undefined) {
          clearTimeout(item.blurTimeout);
          item.blurTimeout = undefined;
        } else if (this.hoverTimeout === undefined) {
          item.navHoverTimeout = setTimeout(() => {
            this._hoverTertiaryNav = true;
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
  public handleSecondaryBlur(item: VerticalNavigationItem): void {
    if (item.children !== undefined && item.children.length > 0) {
      if (item.hoverTimeout !== undefined) {
        clearTimeout(item.hoverTimeout);
        item.hoverTimeout = undefined;
      } else if (item.blurTimeout === undefined) {
        item.blurTimeout = setTimeout(() => {
          item.trackHoverState = false;
          if (this.secondaryHover() !== true) {
            this._hoverTertiaryNav = false;
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
  public collapseSecondaryNav(item: VerticalNavigationItem): void {
    if (this.inMobileState === true) {
      this.updateMobileMenu();
    } else {
      if (item.secondaryCollapsed === true) {
        this.updateSecondaryCollapsedState(false, item);
        this.forceHideSecondaryMenu();
      } else {
        this.updateSecondaryCollapsedState(true, item);
      }
    }
    this._hoverSecondaryNav = false;
  }

  /**
   * Collapse tertiary navigation
   * @param item
   */
  public collapseTertiaryNav(item: VerticalNavigationItem): void {
    if (this.inMobileState === true) {
      this.items.forEach((primaryItem) => {
        if (primaryItem.children !== undefined) {
          primaryItem.children.forEach((secondaryItem) => {
            if (secondaryItem === item) {
              this.updateMobileMenu(primaryItem);
            }
          });
        }
      });
    } else {
      if (item.tertiaryCollapsed === true) {
        this.updateTertiaryCollapsedState(false, item);
        this.forceHideSecondaryMenu();
      } else {
        this.updateTertiaryCollapsedState(true, item);
      }
    }
    this._hoverSecondaryNav = false;
    this._hoverTertiaryNav = false;
  }

  // Private

  private addClass(className: string): void {
    let element = this.elementRef.nativeElement;
    this.renderer.addClass(element, className);
  }

  private removeClass(className: string): void {
    let element = this.elementRef.nativeElement;
    this.renderer.removeClass(element, className);
  }

  private initBodyElement(): void {
    if (this.contentContainer === undefined) {
      return;
    }
    if (this.showBadges === true) {
      this.renderer.addClass(this.contentContainer, 'nav-pf-vertical-with-badges');
    }
    if (this.persistentSecondary === true) {
      this.renderer.addClass(this.contentContainer, 'nav-pf-persistent-secondary');
    }
    if (this.showIcons !== true) {
      this.renderer.addClass(this.contentContainer, 'hidden-icons-pf');
    }
  }

  private updateMobileMenu(selected?: VerticalNavigationItem, secondaryItem?: VerticalNavigationItem): void {
    this.items.forEach((item) => {
      item.mobileItem = false;
      if (item.children !== undefined) {
        item.children.forEach((nextSecondary) => {
          nextSecondary.mobileItem = false;
        });
      }
    });

    if (selected !== undefined) {
      selected.mobileItem = true;
      if (secondaryItem) {
        secondaryItem.mobileItem = true;
        this._showMobileSecondary = false;
        this._showMobileTertiary = true;
      } else {
        this._showMobileSecondary = true;
        this._showMobileTertiary = false;
      }
    } else {
      this._showMobileSecondary = false;
      this._showMobileTertiary = false;
    }
  }

  private checkNavState() {
    let width = this.windowRef.nativeWindow.innerWidth;

    // Check to see if we need to enter/exit the mobile state
    if (this.ignoreMobile !== true && width < this.breakpoints.tablet) {
      if (this.inMobileState !== true) {
        this._inMobileState = true;

        // Set the body class to the correct state
        if (this.contentContainer !== undefined) {
          this.renderer.removeClass(this.contentContainer, 'collapsed-nav');
          this.renderer.addClass(this.contentContainer, 'hidden-nav');
        }

        // Reset the collapsed states
        this.updateSecondaryCollapsedState(false);
        this.updateTertiaryCollapsedState(false);

        this.explicitCollapse = false;
      }
    } else {
      this._inMobileState = false;
      this._showMobileNav = false;

      // Set the body class back to the default
      if (this.contentContainer !== undefined) {
        this.renderer.removeClass(this.contentContainer, 'hidden-nav');
      }
    }

    if (this.explicitCollapse === true) {
      this._navCollapsed = true;
      this.addClass('collapsed-nav');
    } else {
      this._navCollapsed = false;
      this.removeClass('collapsed-nav');
    }
  }

  private collapseMenu(): void {
    this._navCollapsed = true;

    // Set the body class to the correct state
    if (this.contentContainer !== undefined) {
      this.renderer.addClass(this.contentContainer, 'collapsed-nav');
    }

    this.explicitCollapse = true;
  }

  private expandMenu() {
    this._navCollapsed = false;

    // Set the body class to the correct state
    if (this.contentContainer !== undefined) {
      this.renderer.removeClass(this.contentContainer, 'collapsed-nav');
    }

    this.explicitCollapse = false;

    // Dispatch a resize event when showing the expanding then menu to
    // allow content to adjust to the menu sizing
    this.windowRef.nativeWindow.dispatchEvent(new Event('resize'));
  }

  private forceHideSecondaryMenu() {
    this._forceHidden = true;
    setTimeout(() => {
      this._forceHidden = false;
    }, 500);
  }

  private setParentActive(item: VerticalNavigationItem) {
    this.items.forEach((topLevel) => {
      if (topLevel.children !== undefined) {
        topLevel.children.forEach((secondLevel) => {
          if (secondLevel === item) {
            topLevel.trackActiveState = true;
          }
          if (secondLevel.children !== undefined) {
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

  private getFirstNavigateChild(item: VerticalNavigationItem): VerticalNavigationItem {
    let firstChild;
    if (item.children === undefined || item.children.length < 1) {
      firstChild = item;
    } else {
      firstChild = this.getFirstNavigateChild(item.children[0]);
    }
    return firstChild;
  }

  private setSecondaryItemVisible() {
    this._activeSecondary = false;

    if (this.persistentSecondary === true && !this.inMobileState) {
      this.items.forEach((topLevel) => {
        if (topLevel.children) {
          topLevel.children.forEach((secondLevel) => {
            if (secondLevel.trackActiveState) {
              this._activeSecondary = true;
            }
          });
        }
      });
      if (this.contentContainer !== undefined) {
        if (this.activeSecondary === true) {
          this.renderer.addClass(this.contentContainer, 'secondary-visible-pf');
        } else {
          this.renderer.removeClass(this.contentContainer, 'secondary-visible-pf');
        }
      }
    }
  }

  private navigateToItem(item: VerticalNavigationItem): void {
    let navItem = this.getFirstNavigateChild(item);
    if (navItem) {
      this._showMobileNav = false;
      let navTo = navItem.url;
      if (navTo) {
        this.router.navigateByUrl(navTo);
      }
      if (this.navigationEvent) {
        this.navigationEvent.emit(navItem);
      }
    }

    if (this.updateActiveItemsOnClick) {
      this.clearActiveItems();
      navItem.trackActiveState = true;
      this.setParentActive(navItem);
    }

    // Dismiss items (leaf nodes) immediately upon click
    if (!item.children) {
      this._hoverSecondaryNav = false;
      this._hoverTertiaryNav = false;
      this.items.forEach((primary) => {
        if (!this.persistentSecondary) {
          primary.trackHoverState = false;
        }
        if (primary.children !== undefined) {
          primary.children.forEach((secondary) => {
            if (!this.persistentSecondary) {
              secondary.trackHoverState = false;
            }
          });
        }
      });
    } else {
      this.setSecondaryItemVisible();
    }
    this.itemClickEvent.emit(item);
  }

  private primaryHover(): boolean {
    let hover = false;
    this.items.forEach((item) => {
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
        item.children.forEach((secondaryItem) => {
          if (secondaryItem.trackHoverState) {
            hover = true;
          }
        });
      }
    });
    return hover;
  }

  private updateSecondaryCollapsedState(setCollapsed: boolean, collapsedItem?: VerticalNavigationItem) {
    if (collapsedItem !== undefined) {
      collapsedItem.secondaryCollapsed = setCollapsed;
    }
    if (setCollapsed === true) {
      this._collapsedSecondaryNav = true;

      if (this.contentContainer !== undefined) {
        this.renderer.addClass(this.contentContainer, 'collapsed-secondary-nav-pf');
      }
    } else {
      // Remove any collapsed secondary menus
      if (this.items !== undefined) {
        this.items.forEach((item) => {
          item.secondaryCollapsed = false;
        });
      }
      this._collapsedSecondaryNav = false;

      if (this.contentContainer !== undefined) {
        this.renderer.removeClass(this.contentContainer, 'collapsed-secondary-nav-pf');
      }
    }
  }

  private updateTertiaryCollapsedState(setCollapsed: boolean, collapsedItem?: VerticalNavigationItem): void {
    if (collapsedItem !== undefined) {
      collapsedItem.tertiaryCollapsed = setCollapsed;
    }
    if (setCollapsed === true) {
      this._collapsedTertiaryNav = true;
      this.updateSecondaryCollapsedState(false);

      if (this.contentContainer !== undefined) {
        this.renderer.addClass(this.contentContainer, 'collapsed-tertiary-nav-pf');
      }
    } else {
      // Remove any collapsed secondary menus
      if (this.items !== undefined) {
        this.items.forEach((item) => {
          if (item.children && item.children.length > 0) {
            item.children.forEach((secondaryItem) => {
              secondaryItem.tertiaryCollapsed = false;
            });
          }
        });
      }
      this._collapsedTertiaryNav = false;

      if (this.contentContainer !== undefined) {
        this.renderer.removeClass(this.contentContainer, 'collapsed-tertiary-nav-pf');
      }
    }
  }
}
