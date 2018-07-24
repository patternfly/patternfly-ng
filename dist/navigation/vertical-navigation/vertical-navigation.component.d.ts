import { ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { VerticalNavigationItem } from './vertical-navigation-item';
import { WindowReference } from '../../utilities/window.reference';
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
     * Container for page content
     */
    contentContainer: HTMLElement;
    /**
     * Boolean to indicate whether or not to show badges, default: false
     */
    showBadges: boolean;
    /**
     * Indicates whether or not to allow the secondary to persist, default: false
     */
    persistentSecondary: boolean;
    /**
     * Allow pinnable menus when they are open, default: false
     */
    pinnableMenus: boolean;
    /**
     * Show menu icons, default: true
     */
    showIcons: boolean;
    /**
     * The navigation items used to build the menu
     */
    items: VerticalNavigationItem[];
    /**
     * Sets an active flag on items when they are selected, default: false
     */
    updateActiveItemsOnClick: boolean;
    /**
     * Indicates whether or not this is a mobile friendly navigation, default: false
     */
    ignoreMobile: boolean;
    /**
     * Show top banner, default: true
     */
    showTopBanner: boolean;
    /**
     * This event is fired any time the user has initiated navigation
     */
    navigationEvent: EventEmitter<{}>;
    /**
     * This event is fired any time an item in the navigation is clicked
     */
    itemClickEvent: EventEmitter<{}>;
    private _activeSecondary;
    private _collapsedSecondaryNav;
    private _collapsedTertiaryNav;
    private _forceHidden;
    private _hoverSecondaryNav;
    private _hoverTertiaryNav;
    private _inMobileState;
    private _navCollapsed;
    private _showMobileNav;
    private _showMobileSecondary;
    private _showMobileTertiary;
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
    /**
     * Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     * Destroy listeners
     */
    ngOnDestroy(): void;
    /**
     * Returns flag indicating if secondary menu is active
     *
     * @returns {boolean} True if secondary menu is active
     */
    readonly activeSecondary: boolean;
    /**
     * Returns flag indicating if mobile nav should be shown
     *
     * @returns {boolean} True if mobile nav should be shown
     */
    readonly showMobileNav: boolean;
    /**
     * Returns flag indicating if mobile secondary should be shown
     *
     * @returns {boolean} True if mobile secondary should be shown
     */
    readonly showMobileSecondary: boolean;
    /**
     * Returns flag indicating if mobile tertiary should be shown
     *
     * @returns {boolean} True if mobile tertiary should be shown
     */
    readonly showMobileTertiary: boolean;
    /**
     * Returns flag indicating if secondary nav is being hovered over
     *
     * @returns {boolean} True if secondary nav is being hovered over
     */
    readonly hoverSecondaryNav: boolean;
    /**
     * Returns flag indicating if tertiary nav is being hovered over
     *
     * @returns {boolean} True if tertiary nav is being hovered over
     */
    readonly hoverTertiaryNav: boolean;
    /**
     * Returns flag indicating if secondary nav is collapsed
     *
     * @returns {boolean} True if secondary nav is collapsed
     */
    readonly collapsedSecondaryNav: boolean;
    /**
     * Returns flag indicating if tertiary nav is collapsed
     *
     * @returns {boolean} True if tertiary nav is collapsed
     */
    readonly collapsedTertiaryNav: boolean;
    /**
     * Returns flag indicating if nav should be entirely hidden when screen is below desktop resolution
     *
     * @returns {boolean} True if nav should be entirely hidden
     */
    readonly forceHidden: boolean;
    /**
     * Returns flag indicating if the navigation is in a mobile state
     *
     * @returns {boolean} True if the navigation is in a mobile state
     */
    readonly inMobileState: boolean;
    /**
     * Returns flag indicating if nav is collapsed
     *
     * @returns {boolean} True if nav is collapsed
     */
    readonly navCollapsed: boolean;
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
    handleSecondaryClick(primary: VerticalNavigationItem, secondary: VerticalNavigationItem): void;
    /**
     * Tertiary item selection handler
     * @param primary
     * @param secondary
     * @param tertiary
     */
    handleTertiaryClick(primary: VerticalNavigationItem, secondary: VerticalNavigationItem, tertiary: VerticalNavigationItem): void;
    /**
     *  Show secondary nav bar on hover of primary nav items
     * @param item
     */
    handlePrimaryHover(item: VerticalNavigationItem): void;
    /**
     * Hides menus on blur
     * @param item
     */
    handlePrimaryBlur(item: VerticalNavigationItem): void;
    /**
     * Show tertiary nav bar on hover of secondary nav items
     * @param item
     */
    handleSecondaryHover(item: any): void;
    /**
     * Hides menus on blur
     * @param item
     */
    handleSecondaryBlur(item: VerticalNavigationItem): void;
    /**
     * Collapse secondary navigation
     * @param item
     */
    collapseSecondaryNav(item: VerticalNavigationItem): void;
    /**
     * Collapse tertiary navigation
     * @param item
     */
    collapseTertiaryNav(item: VerticalNavigationItem): void;
    private addClass;
    private removeClass;
    private initBodyElement;
    private updateMobileMenu;
    private checkNavState;
    private collapseMenu;
    private expandMenu;
    private forceHideSecondaryMenu;
    private setParentActive;
    private getFirstNavigateChild;
    private setSecondaryItemVisible;
    private navigateToItem;
    private primaryHover;
    private secondaryHover;
    private updateSecondaryCollapsedState;
    private updateTertiaryCollapsedState;
}
