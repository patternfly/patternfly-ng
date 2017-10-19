import { ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItemConfig } from './navigation-item-config';
import { WindowReference } from '../utilities/window.reference';
/**
 * Vertical navigation component
 */
export declare class VerticalNavigationComponent implements OnInit, OnDestroy {
    private elementRef;
    private renderer;
    private router;
    private windowRef;
    /**
     * Source for the brand logo at the top
     */
    brandSrc: string;
    /**
     * Alternate text to display for the logo
     */
    brandAlt: string;
    /**
     * Boolean to indicate whether or not to show badges
     */
    showBadges: boolean;
    /**
     * Indicates whether or not to allow the secondary to persist
     */
    persistentSecondary: boolean;
    /**
     * Allow pinnable menus when they are open
     */
    pinnableMenus: boolean;
    /**
     * Hide menu items
     */
    hiddenIcons: boolean;
    /**
     * The navigation items used to build the menu
     */
    items: NavigationItemConfig[];
    /**
     * Sets an active flag on items when they are selected
     */
    updateActiveItemsOnClick: boolean;
    /**
     * Indicates whether or not this is a mobile friendly navigation
     */
    ignoreMobile: boolean;
    /**
     * Hide top banner optionally
     */
    hideTopBanner: boolean;
    /**
     * This event is fired any time the user has initiated navigation
     */
    navigationEvent: EventEmitter<{}>;
    /**
     * This event is fired any time an item in the navigation is clicked
     */
    itemClickEvent: EventEmitter<{}>;
    /**
     * Internal boolean to track if secondary menu is active
     * @type {boolean}
     */
    activeSecondary: boolean;
    /**
     * Internal boolean to track if mobile nav should be shown
     * @type {boolean}
     */
    showMobileNav: boolean;
    /**
     * Internal boolean to track if mobile secondary should be shown
     * @type {boolean}
     */
    showMobileSecondary: boolean;
    /**
     * Internal boolean to track if mobile tertiary should be shown
     * @type {boolean}
     */
    showMobileTertiary: boolean;
    /**
     * Track if secondary nav is being hovered over
     * @type {boolean}
     */
    hoverSecondaryNav: boolean;
    /**
     * Track if tertiary nav is being hovered over
     * @type {boolean}
     */
    hoverTertiaryNav: boolean;
    /**
     * Track if secondary nav is collapsed
     * @type {boolean}
     */
    collapsedSecondaryNav: boolean;
    /**
     * Track if tertiary nav is collapsed
     * @type {boolean}
     */
    collapsedTertiaryNav: boolean;
    /**
     * Internal boolean to track if nav is collapsed
     * @type {boolean}
     */
    navCollapsed: boolean;
    /**
     * Internal boolean to track if nav should be entirely hidden when screen is below desktop resolution
     * @type {boolean}
     */
    forceHidden: boolean;
    /**
     * Internal boolean to track if the navigation is in a mobile state
     */
    inMobileState: boolean;
    private hoverTimeout;
    private routeChangeListener;
    private breakpoints;
    private explicitCollapse;
    private hoverDelay;
    private hideDelay;
    private windowListener;
    /**
     * The default constructor
     */
    constructor(elementRef: ElementRef, renderer: Renderer2, router: Router, windowRef: WindowReference);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private addClass(className);
    private removeClass(className);
    private initBodyElement();
    private updateMobileMenu(selected?, secondaryItem?);
    private checkNavState();
    private collapseMenu();
    private expandMenu();
    private forceHideSecondaryMenu();
    private setParentActive(item);
    private getFirstNavigateChild(item);
    private setSecondaryItemVisible();
    private navigateToItem(item);
    private primaryHover();
    private secondaryHover();
    private updateSecondaryCollapsedState(setCollapsed, collapsedItem?);
    private updateTertiaryCollapsedState(setCollapsed, collapsedItem?);
    /**
     * Clear all active items
     */
    clearActiveItems(): void;
    /**
     * Initialize the active items in the vertical navigation
     */
    initActiveItems(): void;
    /**
     * Public resize event called when the window size changes
     * @param event
     */
    onResize(event: any): void;
    /**
     * Handles the navbar hamburger toggle click
     */
    handleNavBarToggleClick(): void;
    /**
     * Primary item selection handler
     * @param item
     */
    handlePrimaryClick(item: any): void;
    /**
     * Secondary item selection handler
     * @param primary
     * @param secondary
     */
    handleSecondaryClick(primary: NavigationItemConfig, secondary: NavigationItemConfig): void;
    /**
     * Tertiary item selection handler
     * @param primary
     * @param secondary
     * @param tertiary
     */
    handleTertiaryClick(primary: NavigationItemConfig, secondary: NavigationItemConfig, tertiary: NavigationItemConfig): void;
    /**
     *  Show secondary nav bar on hover of primary nav items
     * @param item
     */
    handlePrimaryHover(item: NavigationItemConfig): void;
    /**
     * Hides menus on blur
     * @param item
     */
    handlePrimaryBlur(item: NavigationItemConfig): void;
    /**
     * Show tertiary nav bar on hover of secondary nav items
     * @param item
     */
    handleSecondaryHover(item: any): void;
    /**
     * Hides menus on blur
     * @param item
     */
    handleSecondaryBlur(item: NavigationItemConfig): void;
    /**
     * Collapse secondary navigation
     * @param item
     */
    collapseSecondaryNav(item: NavigationItemConfig): void;
    /**
     * Collapse tertiary navigation
     * @param item
     */
    collapseTertiaryNav(item: NavigationItemConfig): void;
}
