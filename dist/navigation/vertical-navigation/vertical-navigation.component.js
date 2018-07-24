import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
var VerticalNavigationComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function VerticalNavigationComponent(elementRef, renderer, router, windowRef) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.router = router;
        this.windowRef = windowRef;
        /**
         * Boolean to indicate whether or not to show badges, default: false
         */
        this.showBadges = false;
        /**
         * Indicates whether or not to allow the secondary to persist, default: false
         */
        this.persistentSecondary = false;
        /**
         * Allow pinnable menus when they are open, default: false
         */
        this.pinnableMenus = false;
        /**
         * Show menu icons, default: true
         */
        this.showIcons = true;
        /**
         * Sets an active flag on items when they are selected, default: false
         */
        this.updateActiveItemsOnClick = false;
        /**
         * Indicates whether or not this is a mobile friendly navigation, default: false
         */
        this.ignoreMobile = false;
        /**
         * Show top banner, default: true
         */
        this.showTopBanner = true;
        /**
         * This event is fired any time the user has initiated navigation
         */
        this.navigationEvent = new EventEmitter();
        /**
         * This event is fired any time an item in the navigation is clicked
         */
        this.itemClickEvent = new EventEmitter();
        this._activeSecondary = false;
        this._collapsedSecondaryNav = false;
        this._collapsedTertiaryNav = false;
        this._forceHidden = false;
        this._hoverSecondaryNav = false;
        this._hoverTertiaryNav = false;
        this._navCollapsed = false;
        this._showMobileNav = false;
        this._showMobileSecondary = false;
        this._showMobileTertiary = false;
        this.breakpoints = {
            'tablet': 768,
            'desktop': 1200
        };
        this.explicitCollapse = false;
        this.hoverDelay = 500;
        this.hideDelay = this.hoverDelay + 200;
    }
    /**
     * Setup component configuration upon initialization
     */
    VerticalNavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.windowListener = this.windowRef.nativeWindow.addEventListener('resize', function (event) {
            _this.onResize(event);
        });
        this.routeChangeListener = this.router.events.subscribe(function (val) {
            if (val instanceof NavigationEnd) {
                if (!_this.updateActiveItemsOnClick) {
                    _this.clearActiveItems();
                    _this.initActiveItems();
                }
            }
        });
        if (!this.updateActiveItemsOnClick) {
            this.clearActiveItems();
            this.initActiveItems();
        }
        this.initBodyElement();
        this.checkNavState();
    };
    /**
     * Destroy listeners
     */
    VerticalNavigationComponent.prototype.ngOnDestroy = function () {
        if (this.routeChangeListener !== undefined) {
            this.routeChangeListener.unsubscribe();
        }
        if (this.windowListener !== undefined) {
            this.windowRef.nativeWindow.removeEventListener('resize', this.windowListener);
        }
    };
    Object.defineProperty(VerticalNavigationComponent.prototype, "activeSecondary", {
        // Accessors
        /**
         * Returns flag indicating if secondary menu is active
         *
         * @returns {boolean} True if secondary menu is active
         */
        get: function () {
            return this._activeSecondary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "showMobileNav", {
        /**
         * Returns flag indicating if mobile nav should be shown
         *
         * @returns {boolean} True if mobile nav should be shown
         */
        get: function () {
            return this._showMobileNav;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "showMobileSecondary", {
        /**
         * Returns flag indicating if mobile secondary should be shown
         *
         * @returns {boolean} True if mobile secondary should be shown
         */
        get: function () {
            return this._showMobileSecondary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "showMobileTertiary", {
        /**
         * Returns flag indicating if mobile tertiary should be shown
         *
         * @returns {boolean} True if mobile tertiary should be shown
         */
        get: function () {
            return this._showMobileTertiary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "hoverSecondaryNav", {
        /**
         * Returns flag indicating if secondary nav is being hovered over
         *
         * @returns {boolean} True if secondary nav is being hovered over
         */
        get: function () {
            return this._hoverSecondaryNav;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "hoverTertiaryNav", {
        /**
         * Returns flag indicating if tertiary nav is being hovered over
         *
         * @returns {boolean} True if tertiary nav is being hovered over
         */
        get: function () {
            return this._hoverTertiaryNav;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "collapsedSecondaryNav", {
        /**
         * Returns flag indicating if secondary nav is collapsed
         *
         * @returns {boolean} True if secondary nav is collapsed
         */
        get: function () {
            return this._collapsedSecondaryNav;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "collapsedTertiaryNav", {
        /**
         * Returns flag indicating if tertiary nav is collapsed
         *
         * @returns {boolean} True if tertiary nav is collapsed
         */
        get: function () {
            return this._collapsedTertiaryNav;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "forceHidden", {
        /**
         * Returns flag indicating if nav should be entirely hidden when screen is below desktop resolution
         *
         * @returns {boolean} True if nav should be entirely hidden
         */
        get: function () {
            return this._forceHidden;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "inMobileState", {
        /**
         * Returns flag indicating if the navigation is in a mobile state
         *
         * @returns {boolean} True if the navigation is in a mobile state
         */
        get: function () {
            return this._inMobileState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "navCollapsed", {
        /**
         * Returns flag indicating if nav is collapsed
         *
         * @returns {boolean} True if nav is collapsed
         */
        get: function () {
            return this._navCollapsed;
        },
        enumerable: true,
        configurable: true
    });
    // Actions
    /**
     * Clear all active items
     */
    VerticalNavigationComponent.prototype.clearActiveItems = function () {
        this.items.forEach(function (item) {
            item.trackActiveState = false;
            if (item.children !== undefined) {
                item.children.forEach(function (secondary) {
                    secondary.trackActiveState = false;
                    if (secondary.children !== undefined) {
                        secondary.children.forEach(function (tertiary) {
                            tertiary.trackActiveState = false;
                        });
                    }
                });
            }
        });
    };
    /**
     * Initialize the active items in the vertical navigation
     */
    VerticalNavigationComponent.prototype.initActiveItems = function () {
        var updatedRoute = this.router.url;
        // //Setting active state on load
        this.items.forEach(function (topLevel) {
            if (updatedRoute.indexOf(topLevel.url) > -1) {
                topLevel.trackActiveState = true;
            }
            if (topLevel.children !== undefined) {
                topLevel.children.forEach(function (secondLevel) {
                    if (updatedRoute.indexOf(secondLevel.url) > -1) {
                        secondLevel.trackActiveState = true;
                        topLevel.trackActiveState = true;
                    }
                    if (secondLevel.children !== undefined) {
                        secondLevel.children.forEach(function (thirdLevel) {
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
    };
    /**
     * Public resize event called when the window size changes
     * @param event
     */
    VerticalNavigationComponent.prototype.onResize = function (event) {
        this.checkNavState();
    };
    /**
     * Handles the navbar hamburger toggle click
     */
    VerticalNavigationComponent.prototype.handleNavBarToggleClick = function () {
        if (this.inMobileState === true) {
            // Toggle the mobile nav
            if (this.showMobileNav === true) {
                this._showMobileNav = false;
            }
            else {
                // Always start at the primary menu
                this.updateMobileMenu();
                this._showMobileNav = true;
            }
        }
        else if (this.navCollapsed === true) {
            this.expandMenu();
        }
        else {
            this.collapseMenu();
        }
    };
    /**
     * Primary item selection handler
     * @param item
     */
    VerticalNavigationComponent.prototype.handlePrimaryClick = function (item) {
        if (this.inMobileState === true) {
            if (item.children !== undefined && item.children.length > 0) {
                this.updateMobileMenu(item);
            }
            else {
                this.updateMobileMenu();
                this.navigateToItem(item);
            }
        }
        else {
            this.navigateToItem(item);
        }
    };
    /**
     * Secondary item selection handler
     * @param primary
     * @param secondary
     */
    VerticalNavigationComponent.prototype.handleSecondaryClick = function (primary, secondary) {
        if (this.inMobileState === true) {
            if (secondary.children && secondary.children.length > 0) {
                this.updateMobileMenu(primary, secondary);
            }
            else {
                this.updateMobileMenu();
                this.navigateToItem(secondary);
            }
        }
        else {
            this.navigateToItem(secondary);
        }
    };
    /**
     * Tertiary item selection handler
     * @param primary
     * @param secondary
     * @param tertiary
     */
    VerticalNavigationComponent.prototype.handleTertiaryClick = function (primary, secondary, tertiary) {
        if (this.inMobileState === true) {
            this.updateMobileMenu();
        }
        this.navigateToItem(tertiary);
    };
    /**
     *  Show secondary nav bar on hover of primary nav items
     * @param item
     */
    VerticalNavigationComponent.prototype.handlePrimaryHover = function (item) {
        var _this = this;
        if (item.children !== undefined && item.children.length > 0) {
            if (this.inMobileState !== true) {
                if (item.blurTimeout !== undefined) {
                    clearTimeout(item.blurTimeout);
                    item.blurTimeout = undefined;
                }
                else if (this.hoverTimeout === undefined && !item.trackHoverState) {
                    item.hoverTimeout = setTimeout(function () {
                        _this._hoverSecondaryNav = true;
                        item.trackHoverState = true;
                        item.hoverTimeout = undefined;
                    }, this.hoverDelay);
                }
            }
        }
    };
    /**
     * Hides menus on blur
     * @param item
     */
    VerticalNavigationComponent.prototype.handlePrimaryBlur = function (item) {
        var _this = this;
        if (item.children !== undefined && item.children.length > 0) {
            if (item.hoverTimeout !== undefined) {
                clearTimeout(item.hoverTimeout);
                item.hoverTimeout = undefined;
            }
            else if (item.blurTimeout === undefined && item.trackHoverState) {
                item.blurTimeout = setTimeout(function () {
                    item.trackHoverState = false;
                    if (_this.primaryHover() !== true) {
                        _this._hoverSecondaryNav = false;
                    }
                    item.blurTimeout = undefined;
                }, this.hideDelay);
            }
        }
    };
    /**
     * Show tertiary nav bar on hover of secondary nav items
     * @param item
     */
    VerticalNavigationComponent.prototype.handleSecondaryHover = function (item) {
        var _this = this;
        if (item.children !== undefined && item.children.length > 0) {
            if (this.inMobileState !== true) {
                if (item.blurTimeout !== undefined) {
                    clearTimeout(item.blurTimeout);
                    item.blurTimeout = undefined;
                }
                else if (this.hoverTimeout === undefined) {
                    item.navHoverTimeout = setTimeout(function () {
                        _this._hoverTertiaryNav = true;
                        item.trackHoverState = true;
                        item.navHoverTimeout = undefined;
                    }, this.hoverDelay);
                }
            }
        }
    };
    /**
     * Hides menus on blur
     * @param item
     */
    VerticalNavigationComponent.prototype.handleSecondaryBlur = function (item) {
        var _this = this;
        if (item.children !== undefined && item.children.length > 0) {
            if (item.hoverTimeout !== undefined) {
                clearTimeout(item.hoverTimeout);
                item.hoverTimeout = undefined;
            }
            else if (item.blurTimeout === undefined) {
                item.blurTimeout = setTimeout(function () {
                    item.trackHoverState = false;
                    if (_this.secondaryHover() !== true) {
                        _this._hoverTertiaryNav = false;
                    }
                    item.blurTimeout = undefined;
                }, this.hideDelay);
            }
        }
    };
    /**
     * Collapse secondary navigation
     * @param item
     */
    VerticalNavigationComponent.prototype.collapseSecondaryNav = function (item) {
        if (this.inMobileState === true) {
            this.updateMobileMenu();
        }
        else {
            if (item.secondaryCollapsed === true) {
                this.updateSecondaryCollapsedState(false, item);
                this.forceHideSecondaryMenu();
            }
            else {
                this.updateSecondaryCollapsedState(true, item);
            }
        }
        this._hoverSecondaryNav = false;
    };
    /**
     * Collapse tertiary navigation
     * @param item
     */
    VerticalNavigationComponent.prototype.collapseTertiaryNav = function (item) {
        var _this = this;
        if (this.inMobileState === true) {
            this.items.forEach(function (primaryItem) {
                if (primaryItem.children !== undefined) {
                    primaryItem.children.forEach(function (secondaryItem) {
                        if (secondaryItem === item) {
                            _this.updateMobileMenu(primaryItem);
                        }
                    });
                }
            });
        }
        else {
            if (item.tertiaryCollapsed === true) {
                this.updateTertiaryCollapsedState(false, item);
                this.forceHideSecondaryMenu();
            }
            else {
                this.updateTertiaryCollapsedState(true, item);
            }
        }
        this._hoverSecondaryNav = false;
        this._hoverTertiaryNav = false;
    };
    // Private
    VerticalNavigationComponent.prototype.addClass = function (className) {
        var element = this.elementRef.nativeElement;
        this.renderer.addClass(element, className);
    };
    VerticalNavigationComponent.prototype.removeClass = function (className) {
        var element = this.elementRef.nativeElement;
        this.renderer.removeClass(element, className);
    };
    VerticalNavigationComponent.prototype.initBodyElement = function () {
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
    };
    VerticalNavigationComponent.prototype.updateMobileMenu = function (selected, secondaryItem) {
        this.items.forEach(function (item) {
            item.mobileItem = false;
            if (item.children !== undefined) {
                item.children.forEach(function (nextSecondary) {
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
            }
            else {
                this._showMobileSecondary = true;
                this._showMobileTertiary = false;
            }
        }
        else {
            this._showMobileSecondary = false;
            this._showMobileTertiary = false;
        }
    };
    VerticalNavigationComponent.prototype.checkNavState = function () {
        var width = this.windowRef.nativeWindow.innerWidth;
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
        }
        else {
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
        }
        else {
            this._navCollapsed = false;
            this.removeClass('collapsed-nav');
        }
    };
    VerticalNavigationComponent.prototype.collapseMenu = function () {
        this._navCollapsed = true;
        // Set the body class to the correct state
        if (this.contentContainer !== undefined) {
            this.renderer.addClass(this.contentContainer, 'collapsed-nav');
        }
        this.explicitCollapse = true;
    };
    VerticalNavigationComponent.prototype.expandMenu = function () {
        this._navCollapsed = false;
        // Set the body class to the correct state
        if (this.contentContainer !== undefined) {
            this.renderer.removeClass(this.contentContainer, 'collapsed-nav');
        }
        this.explicitCollapse = false;
        // Dispatch a resize event when showing the expanding then menu to
        // allow content to adjust to the menu sizing
        this.windowRef.nativeWindow.dispatchEvent(new Event('resize'));
    };
    VerticalNavigationComponent.prototype.forceHideSecondaryMenu = function () {
        var _this = this;
        this._forceHidden = true;
        setTimeout(function () {
            _this._forceHidden = false;
        }, 500);
    };
    VerticalNavigationComponent.prototype.setParentActive = function (item) {
        this.items.forEach(function (topLevel) {
            if (topLevel.children !== undefined) {
                topLevel.children.forEach(function (secondLevel) {
                    if (secondLevel === item) {
                        topLevel.trackActiveState = true;
                    }
                    if (secondLevel.children !== undefined) {
                        secondLevel.children.forEach(function (thirdLevel) {
                            if (thirdLevel === item) {
                                topLevel.trackActiveState = true;
                                secondLevel.trackActiveState = true;
                            }
                        });
                    }
                });
            }
        });
    };
    VerticalNavigationComponent.prototype.getFirstNavigateChild = function (item) {
        var firstChild;
        if (item.children === undefined || item.children.length < 1) {
            firstChild = item;
        }
        else {
            firstChild = this.getFirstNavigateChild(item.children[0]);
        }
        return firstChild;
    };
    VerticalNavigationComponent.prototype.setSecondaryItemVisible = function () {
        var _this = this;
        this._activeSecondary = false;
        if (this.persistentSecondary === true && !this.inMobileState) {
            this.items.forEach(function (topLevel) {
                if (topLevel.children) {
                    topLevel.children.forEach(function (secondLevel) {
                        if (secondLevel.trackActiveState) {
                            _this._activeSecondary = true;
                        }
                    });
                }
            });
            if (this.contentContainer !== undefined) {
                if (this.activeSecondary === true) {
                    this.renderer.addClass(this.contentContainer, 'secondary-visible-pf');
                }
                else {
                    this.renderer.removeClass(this.contentContainer, 'secondary-visible-pf');
                }
            }
        }
    };
    VerticalNavigationComponent.prototype.navigateToItem = function (item) {
        var _this = this;
        var navItem = this.getFirstNavigateChild(item);
        if (navItem) {
            this._showMobileNav = false;
            var navTo = navItem.url;
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
            this.items.forEach(function (primary) {
                if (!_this.persistentSecondary) {
                    primary.trackHoverState = false;
                }
                if (primary.children !== undefined) {
                    primary.children.forEach(function (secondary) {
                        if (!_this.persistentSecondary) {
                            secondary.trackHoverState = false;
                        }
                    });
                }
            });
        }
        else {
            this.setSecondaryItemVisible();
        }
        this.itemClickEvent.emit(item);
    };
    VerticalNavigationComponent.prototype.primaryHover = function () {
        var hover = false;
        this.items.forEach(function (item) {
            if (item.trackHoverState) {
                hover = true;
            }
        });
        return hover;
    };
    VerticalNavigationComponent.prototype.secondaryHover = function () {
        var hover = false;
        this.items.forEach(function (item) {
            if (item.children && item.children.length > 0) {
                item.children.forEach(function (secondaryItem) {
                    if (secondaryItem.trackHoverState) {
                        hover = true;
                    }
                });
            }
        });
        return hover;
    };
    VerticalNavigationComponent.prototype.updateSecondaryCollapsedState = function (setCollapsed, collapsedItem) {
        if (collapsedItem !== undefined) {
            collapsedItem.secondaryCollapsed = setCollapsed;
        }
        if (setCollapsed === true) {
            this._collapsedSecondaryNav = true;
            if (this.contentContainer !== undefined) {
                this.renderer.addClass(this.contentContainer, 'collapsed-secondary-nav-pf');
            }
        }
        else {
            // Remove any collapsed secondary menus
            if (this.items !== undefined) {
                this.items.forEach(function (item) {
                    item.secondaryCollapsed = false;
                });
            }
            this._collapsedSecondaryNav = false;
            if (this.contentContainer !== undefined) {
                this.renderer.removeClass(this.contentContainer, 'collapsed-secondary-nav-pf');
            }
        }
    };
    VerticalNavigationComponent.prototype.updateTertiaryCollapsedState = function (setCollapsed, collapsedItem) {
        if (collapsedItem !== undefined) {
            collapsedItem.tertiaryCollapsed = setCollapsed;
        }
        if (setCollapsed === true) {
            this._collapsedTertiaryNav = true;
            this.updateSecondaryCollapsedState(false);
            if (this.contentContainer !== undefined) {
                this.renderer.addClass(this.contentContainer, 'collapsed-tertiary-nav-pf');
            }
        }
        else {
            // Remove any collapsed secondary menus
            if (this.items !== undefined) {
                this.items.forEach(function (item) {
                    if (item.children && item.children.length > 0) {
                        item.children.forEach(function (secondaryItem) {
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
    };
    VerticalNavigationComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-vertical-navigation',
                    template: "<div><nav class=\"navbar navbar-pf-vertical pfng-vertical-container\" [ngClass]=\"{'pfng-vertical-hide-nav': !showTopBanner}\"><ng-container *ngIf=\"showTopBanner\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle\" (click)=\"handleNavBarToggleClick()\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <span class=\"navbar-brand\"><img class=\"navbar-brand-icon\" *ngIf=\"brandSrc\" [src]=\"brandSrc\" alt=\"{{brandAlt}}\"> <span class=\"navbar-brand-txt\" *ngIf=\"!brandSrc\">{{brandAlt}}</span></span></div><nav class=\"collapse navbar-collapse\"><ng-content></ng-content></nav></ng-container><div class=\"nav-pf-vertical\" [ngClass]=\"{'nav-pf-persistent-secondary': persistentSecondary,\n                    'nav-pf-vertical-collapsible-menus': pinnableMenus,\n                    'hidden-icons-pf': !showIcons,\n                    'nav-pf-vertical-with-badges': showBadges,\n                    'secondary-visible-pf': activeSecondary,\n                    'show-mobile-secondary': showMobileSecondary,\n                    'show-mobile-tertiary': showMobileTertiary,\n                    'hover-secondary-nav-pf': hoverSecondaryNav,\n                    'hover-tertiary-nav-pf': hoverTertiaryNav,\n                    'collapsed-secondary-nav-pf': collapsedSecondaryNav,\n                    'collapsed-tertiary-nav-pf': collapsedTertiaryNav,\n                    'hidden': inMobileState,\n                    'collapsed': navCollapsed,\n                    'force-hide-secondary-nav-pf': forceHidden,\n                    'show-mobile-nav': showMobileNav}\"><ul class=\"list-group\"><li *ngFor=\"let item of items\" class=\"list-group-item\" [ngClass]=\"{'secondary-nav-item-pf': item.children && item.children.length > 0,\n                       'active': item.trackActiveState,\n                       'is-hover': item.trackHoverState,\n                       'mobile-nav-item-pf': item.mobileItem && showMobileSecondary,\n                       'mobile-secondary-item-pf': item.mobileItem && showMobileTertiary}\" (mouseenter)=\"handlePrimaryHover(item)\" (mouseleave)=\"handlePrimaryBlur(item)\"><a (click)=\"handlePrimaryClick(item)\"><span class=\"{{item.iconStyleClass}}\" *ngIf=\"item.iconStyleClass\" [ngClass]=\"{hidden: !showIcons}\" tooltip=\"{{item.title}}\" container=\"body\" placement=\"bottom\" isDisabled=\"!{{navCollapsed}}\" containerClass=\"nav-pf-vertical-tooltip\"></span> <span class=\"list-group-item-value\">{{item.title}}</span><div *ngIf=\"showBadges && item.badges\" class=\"badge-container-pf\"><div class=\"badge {{badge.badgeClass}}\" *ngFor=\"let badge of item.badges\" tooltip=\"{{badge.tooltip}}\" container=\"body\" placement=\"right\"><span *ngIf=\"badge.count && badge.iconStyleClass\" class=\"{{badge.iconStyleClass}}\"></span> <span *ngIf=\"badge.count\">{{badge.count}}</span></div></div></a><div *ngIf=\"item.children && item.children.length > 0\" class=\"nav-pf-secondary-nav\"><div class=\"nav-item-pf-header\"><a class=\"secondary-collapse-toggle-pf\" (click)=\"collapseSecondaryNav(item)\" [ngClass]=\"{'collapsed': item.secondaryCollapsed}\"></a> <span>{{item.title}}</span></div><ul class=\"list-group\"><li *ngFor=\"let secondaryItem of item.children\" class=\"list-group-item\" [ngClass]=\"{'tertiary-nav-item-pf': secondaryItem.children && secondaryItem.children.length > 0,\n                             'active': secondaryItem.trackActiveState,\n                             'is-hover': secondaryItem.trackHoverState,\n                             'mobile-nav-item-pf': secondaryItem.mobileItem}\" (mouseenter)=\"handleSecondaryHover(secondaryItem)\" (mouseleave)=\"handleSecondaryBlur(secondaryItem)\"><a (click)=\"handleSecondaryClick(item, secondaryItem)\"><span class=\"list-group-item-value\">{{secondaryItem.title}}</span><div *ngIf=\"showBadges && secondaryItem.badges\" class=\"badge-container-pf\"><div class=\"badge {{badge.badgeClass}}\" *ngFor=\"let badge of secondaryItem.badges\" tooltip=\"{{badge.tooltip}}\" container=\"body\" placement=\"right\"><span *ngIf=\"badge.count && badge.iconStyleClass\" class=\"{{badge.iconStyleClass}}\"></span> <span *ngIf=\"badge.count\">{{badge.count}}</span></div></div></a><div *ngIf=\"secondaryItem.children && secondaryItem.children.length > 0\" class=\"nav-pf-tertiary-nav\"><div class=\"nav-item-pf-header\"><a class=\"tertiary-collapse-toggle-pf\" (click)=\"collapseTertiaryNav(secondaryItem)\" [ngClass]=\"{'collapsed': secondaryItem.tertiaryCollapsed}\"></a> <span>{{secondaryItem.title}}</span></div><ul class=\"list-group\"><li *ngFor=\"let tertiaryItem of secondaryItem.children\" class=\"list-group-item\" [ngClass]=\"{'active': tertiaryItem.trackActiveState}\"><a (click)=\"handleTertiaryClick(item, secondaryItem, tertiaryItem)\"><span class=\"list-group-item-value\">{{tertiaryItem.title}}</span><div *ngIf=\"showBadges && tertiaryItem.badges\" class=\"badge-container-pf\"><div class=\"badge {{badge.badgeClass}}\" *ngFor=\"let badge of tertiaryItem.badges\" tooltip=\"{{badge.tooltip}}\" container=\"body\" placement=\"right\"><span *ngIf=\"badge.count && badge.iconStyleClass\" class=\"{{badge.iconStyleClass}}\"></span> <span *ngIf=\"badge.count\">{{badge.count}}</span></div></div></a></li></ul></div></li></ul></div></li></ul></div></nav></div>"
                },] },
    ];
    /** @nocollapse */
    VerticalNavigationComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: Router, },
        { type: WindowReference, },
    ]; };
    VerticalNavigationComponent.propDecorators = {
        'brandSrc': [{ type: Input },],
        'brandAlt': [{ type: Input },],
        'contentContainer': [{ type: Input },],
        'showBadges': [{ type: Input },],
        'persistentSecondary': [{ type: Input },],
        'pinnableMenus': [{ type: Input },],
        'showIcons': [{ type: Input },],
        'items': [{ type: Input },],
        'updateActiveItemsOnClick': [{ type: Input },],
        'ignoreMobile': [{ type: Input },],
        'showTopBanner': [{ type: Input },],
        'navigationEvent': [{ type: Output, args: ['onNavigationEvent',] },],
        'itemClickEvent': [{ type: Output, args: ['onItemClickEvent',] },],
    };
    return VerticalNavigationComponent;
}());
export { VerticalNavigationComponent };
//# sourceMappingURL=vertical-navigation.component.js.map