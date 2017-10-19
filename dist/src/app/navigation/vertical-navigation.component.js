var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { WindowReference } from '../utilities/window.reference';
/**
 * Vertical navigation component
 */
var VerticalNavigationComponent = (function () {
    /**
     * The default constructor
     */
    function VerticalNavigationComponent(elementRef, renderer, router, windowRef) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.router = router;
        this.windowRef = windowRef;
        /**
         * This event is fired any time the user has initiated navigation
         */
        this.navigationEvent = new EventEmitter();
        /**
         * This event is fired any time an item in the navigation is clicked
         */
        this.itemClickEvent = new EventEmitter();
        /**
         * Internal boolean to track if secondary menu is active
         * @type {boolean}
         */
        this.activeSecondary = false;
        /**
         * Internal boolean to track if mobile nav should be shown
         * @type {boolean}
         */
        this.showMobileNav = false;
        /**
         * Internal boolean to track if mobile secondary should be shown
         * @type {boolean}
         */
        this.showMobileSecondary = false;
        /**
         * Internal boolean to track if mobile tertiary should be shown
         * @type {boolean}
         */
        this.showMobileTertiary = false;
        /**
         * Track if secondary nav is being hovered over
         * @type {boolean}
         */
        this.hoverSecondaryNav = false;
        /**
         * Track if tertiary nav is being hovered over
         * @type {boolean}
         */
        this.hoverTertiaryNav = false;
        /**
         * Track if secondary nav is collapsed
         * @type {boolean}
         */
        this.collapsedSecondaryNav = false;
        /**
         * Track if tertiary nav is collapsed
         * @type {boolean}
         */
        this.collapsedTertiaryNav = false;
        /**
         * Internal boolean to track if nav is collapsed
         * @type {boolean}
         */
        this.navCollapsed = false;
        /**
         * Internal boolean to track if nav should be entirely hidden when screen is below desktop resolution
         * @type {boolean}
         */
        this.forceHidden = false;
        this.breakpoints = {
            'tablet': 768,
            'desktop': 1200
        };
        this.explicitCollapse = false;
        this.hoverDelay = 500;
        this.hideDelay = this.hoverDelay + 200;
    }
    VerticalNavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.windowListener = this.windowRef.nativeWindow.addEventListener("resize", function (event) {
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
    VerticalNavigationComponent.prototype.ngOnDestroy = function () {
        this.routeChangeListener.unsubscribe();
        this.windowRef.nativeWindow.removeEventListener("resize");
    };
    VerticalNavigationComponent.prototype.addClass = function (className) {
        var element = this.elementRef.nativeElement;
        this.renderer.addClass(element, className);
    };
    VerticalNavigationComponent.prototype.removeClass = function (className) {
        var element = this.elementRef.nativeElement;
        this.renderer.removeClass(element, className);
    };
    VerticalNavigationComponent.prototype.initBodyElement = function () {
        if (this.showBadges) {
            this.addClass('nav-pf-vertical-with-badges');
        }
        if (this.persistentSecondary) {
            this.addClass('nav-pf-persistent-secondary');
        }
        if (this.hiddenIcons) {
            this.addClass('hidden-icons-pf');
        }
    };
    VerticalNavigationComponent.prototype.updateMobileMenu = function (selected, secondaryItem) {
        this.items.forEach(function (item) {
            item.mobileItem = false;
            if (item.children) {
                item.children.forEach(function (nextSecondary) {
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
            }
            else {
                this.showMobileSecondary = true;
                this.showMobileTertiary = false;
            }
        }
        else {
            this.showMobileSecondary = false;
            this.showMobileTertiary = false;
        }
    };
    VerticalNavigationComponent.prototype.checkNavState = function () {
        var width = this.windowRef.nativeWindow.innerWidth;
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
        }
        else {
            this.inMobileState = false;
            this.showMobileNav = false;
            // Set the body class back to the default
            this.removeClass('hidden-nav');
        }
        if (this.explicitCollapse) {
            this.navCollapsed = true;
            this.addClass('collapsed-nav');
        }
        else {
            this.navCollapsed = false;
            this.removeClass('collapsed-nav');
        }
    };
    VerticalNavigationComponent.prototype.collapseMenu = function () {
        this.navCollapsed = true;
        //Set the body class to the correct state
        this.addClass('collapsed-nav');
        this.explicitCollapse = true;
    };
    VerticalNavigationComponent.prototype.expandMenu = function () {
        this.navCollapsed = false;
        //Set the body class to the correct state
        this.removeClass('collapsed-nav');
        this.explicitCollapse = false;
        // Dispatch a resize event when showing the expanding then menu to
        // allow content to adjust to the menu sizing
        this.windowRef.nativeWindow.dispatchEvent(new Event('resize'));
    };
    VerticalNavigationComponent.prototype.forceHideSecondaryMenu = function () {
        var _this = this;
        this.forceHidden = true;
        setTimeout(function () {
            _this.forceHidden = false;
        }, 500);
    };
    VerticalNavigationComponent.prototype.setParentActive = function (item) {
        this.items.forEach(function (topLevel) {
            if (topLevel.children) {
                topLevel.children.forEach(function (secondLevel) {
                    if (secondLevel === item) {
                        topLevel.trackActiveState = true;
                    }
                    if (secondLevel.children) {
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
        if (!item.children || item.children.length < 1) {
            firstChild = item;
        }
        else {
            firstChild = this.getFirstNavigateChild(item.children[0]);
        }
        return firstChild;
    };
    VerticalNavigationComponent.prototype.setSecondaryItemVisible = function () {
        var _this = this;
        this.activeSecondary = false;
        if (this.persistentSecondary && !this.inMobileState) {
            this.items.forEach(function (topLevel) {
                if (topLevel.children) {
                    topLevel.children.forEach(function (secondLevel) {
                        if (secondLevel.trackActiveState) {
                            _this.activeSecondary = true;
                        }
                    });
                }
            });
            if (this.activeSecondary) {
                this.addClass('secondary-visible-pf');
            }
            else {
                this.removeClass('secondary-visible-pf');
            }
        }
    };
    VerticalNavigationComponent.prototype.navigateToItem = function (item) {
        var navItem = this.getFirstNavigateChild(item);
        var navTo;
        if (navItem) {
            this.showMobileNav = false;
            navTo = navItem.url;
            if (navTo) {
                this.router.navigateByUrl(navTo);
            }
            if (this.navigationEvent) {
                this.navigationEvent.emit(navItem);
            }
        }
        if (this.itemClickEvent) {
            this.itemClickEvent.emit(item);
        }
        if (this.updateActiveItemsOnClick) {
            this.clearActiveItems();
            navItem.trackActiveState = true;
            this.setParentActive(navItem);
            this.setSecondaryItemVisible();
        }
        this.setSecondaryItemVisible();
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
        if (collapsedItem) {
            collapsedItem.secondaryCollapsed = setCollapsed;
        }
        if (setCollapsed) {
            this.collapsedSecondaryNav = true;
            this.addClass('collapsed-secondary-nav-pf');
        }
        else {
            // Remove any collapsed secondary menus
            if (this.items) {
                this.items.forEach(function (item) {
                    item.secondaryCollapsed = false;
                });
            }
            this.collapsedSecondaryNav = false;
            this.removeClass('collapsed-secondary-nav-pf');
        }
    };
    VerticalNavigationComponent.prototype.updateTertiaryCollapsedState = function (setCollapsed, collapsedItem) {
        if (collapsedItem) {
            collapsedItem.tertiaryCollapsed = setCollapsed;
        }
        if (setCollapsed) {
            this.collapsedTertiaryNav = true;
            this.addClass('collapsed-tertiary-nav-pf');
            this.updateSecondaryCollapsedState(false);
        }
        else {
            // Remove any collapsed secondary menus
            if (this.items) {
                this.items.forEach(function (item) {
                    if (item.children && item.children.length > 0) {
                        item.children.forEach(function (secondaryItem) {
                            secondaryItem.tertiaryCollapsed = false;
                        });
                    }
                });
            }
            this.collapsedTertiaryNav = false;
            this.removeClass('collapsed-tertiary-nav-pf');
        }
    };
    /**
     * Clear all active items
     */
    VerticalNavigationComponent.prototype.clearActiveItems = function () {
        this.items.forEach(function (item) {
            item.trackActiveState = false;
            if (item.children) {
                item.children.forEach(function (secondary) {
                    secondary.trackActiveState = false;
                    if (secondary.children) {
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
            if (topLevel.children) {
                topLevel.children.forEach(function (secondLevel) {
                    if (updatedRoute.indexOf(secondLevel.url) > -1) {
                        secondLevel.trackActiveState = true;
                        topLevel.trackActiveState = true;
                    }
                    if (secondLevel.children) {
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
        if (this.inMobileState) {
            // Toggle the mobile nav
            if (this.showMobileNav) {
                this.showMobileNav = false;
            }
            else {
                // Always start at the primary menu
                this.updateMobileMenu();
                this.showMobileNav = true;
            }
        }
        else if (this.navCollapsed) {
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
        if (this.inMobileState) {
            if (item.children && item.children.length > 0) {
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
        if (this.inMobileState) {
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
        if (this.inMobileState) {
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
        if (item.children && item.children.length > 0) {
            if (!this.inMobileState) {
                if (item.blurTimeout !== undefined) {
                    clearTimeout(item.blurTimeout);
                    item.blurTimeout = undefined;
                }
                else if (this.hoverTimeout === undefined && !item.trackHoverState) {
                    item.hoverTimeout = setTimeout(function () {
                        _this.hoverSecondaryNav = true;
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
        if (item.children && item.children.length > 0) {
            if (item.hoverTimeout !== undefined) {
                clearTimeout(item.hoverTimeout);
                item.hoverTimeout = undefined;
            }
            else if (item.blurTimeout === undefined && item.trackHoverState) {
                item.blurTimeout = setTimeout(function () {
                    item.trackHoverState = false;
                    if (!_this.primaryHover()) {
                        _this.hoverSecondaryNav = false;
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
        if (item.children && item.children.length > 0) {
            if (!this.inMobileState) {
                if (item.blurTimeout !== undefined) {
                    clearTimeout(item.blurTimeout);
                    item.blurTimeout = undefined;
                }
                else if (this.hoverTimeout === undefined) {
                    item.navHoverTimeout = setTimeout(function () {
                        _this.hoverTertiaryNav = true;
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
        if (item.children && item.children.length > 0) {
            if (item.hoverTimeout !== undefined) {
                clearTimeout(item.hoverTimeout);
                item.hoverTimeout = undefined;
            }
            else if (item.blurTimeout === undefined) {
                item.blurTimeout = setTimeout(function () {
                    item.trackHoverState = false;
                    if (!_this.secondaryHover()) {
                        _this.hoverTertiaryNav = false;
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
        if (this.inMobileState) {
            this.updateMobileMenu();
        }
        else {
            if (item.secondaryCollapsed) {
                this.updateSecondaryCollapsedState(false, item);
                this.forceHideSecondaryMenu();
            }
            else {
                this.updateSecondaryCollapsedState(true, item);
            }
        }
        this.hoverSecondaryNav = false;
    };
    ;
    /**
     * Collapse tertiary navigation
     * @param item
     */
    VerticalNavigationComponent.prototype.collapseTertiaryNav = function (item) {
        var _this = this;
        if (this.inMobileState) {
            this.items.forEach(function (primaryItem) {
                if (primaryItem.children) {
                    primaryItem.children.forEach(function (secondaryItem) {
                        if (secondaryItem === item) {
                            _this.updateMobileMenu(primaryItem);
                        }
                    });
                }
            });
        }
        else {
            if (item.tertiaryCollapsed) {
                this.updateTertiaryCollapsedState(false, item);
                this.forceHideSecondaryMenu();
            }
            else {
                this.updateTertiaryCollapsedState(true, item);
            }
        }
        this.hoverSecondaryNav = false;
        this.hoverTertiaryNav = false;
    };
    return VerticalNavigationComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], VerticalNavigationComponent.prototype, "brandSrc", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], VerticalNavigationComponent.prototype, "brandAlt", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], VerticalNavigationComponent.prototype, "showBadges", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], VerticalNavigationComponent.prototype, "persistentSecondary", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], VerticalNavigationComponent.prototype, "pinnableMenus", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], VerticalNavigationComponent.prototype, "hiddenIcons", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], VerticalNavigationComponent.prototype, "items", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], VerticalNavigationComponent.prototype, "updateActiveItemsOnClick", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], VerticalNavigationComponent.prototype, "ignoreMobile", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], VerticalNavigationComponent.prototype, "hideTopBanner", void 0);
__decorate([
    Output('onNavigationEvent'),
    __metadata("design:type", Object)
], VerticalNavigationComponent.prototype, "navigationEvent", void 0);
__decorate([
    Output('onItemClickEvent'),
    __metadata("design:type", Object)
], VerticalNavigationComponent.prototype, "itemClickEvent", void 0);
VerticalNavigationComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-vertical-navigation',
        styles: [".pfng-vertical-hide-nav .nav-pf-vertical{top:2px}"],
        template: "<div><nav class=\"navbar navbar-pf-vertical pfng-vertical-container\" [ngClass]=\"{'pfng-vertical-hide-nav': hideTopBanner}\"><ng-container *ngIf=\"!hideTopBanner\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle\" (click)=\"handleNavBarToggleClick()\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <span class=\"navbar-brand\"><img class=\"navbar-brand-icon\" *ngIf=\"brandSrc\" [src]=\"brandSrc\" alt=\"{{brandAlt}}\"> <span class=\"navbar-brand-txt\" *ngIf=\"!brandSrc\">{{brandAlt}}</span></span></div><nav class=\"collapse navbar-collapse\"><ng-content></ng-content></nav></ng-container><div class=\"nav-pf-vertical\" [ngClass]=\"{'nav-pf-persistent-secondary': persistentSecondary,\n                    'nav-pf-vertical-collapsible-menus': pinnableMenus,\n                    'hidden-icons-pf': hiddenIcons,\n                    'nav-pf-vertical-with-badges': showBadges,\n                    'secondary-visible-pf': activeSecondary,\n                    'show-mobile-secondary': showMobileSecondary,\n                    'show-mobile-tertiary': showMobileTertiary,\n                    'hover-secondary-nav-pf': hoverSecondaryNav,\n                    'hover-tertiary-nav-pf': hoverTertiaryNav,\n                    'collapsed-secondary-nav-pf': collapsedSecondaryNav,\n                    'collapsed-tertiary-nav-pf': collapsedTertiaryNav,\n                    'hidden': inMobileState,\n                    'collapsed': navCollapsed,\n                    'force-hide-secondary-nav-pf': forceHidden,\n                    'show-mobile-nav': showMobileNav}\"><ul class=\"list-group\"><li *ngFor=\"let item of items\" class=\"list-group-item\" [ngClass]=\"{'secondary-nav-item-pf': item.children && item.children.length > 0,\n                       'active': item.trackActiveState,\n                       'is-hover': item.trackHoverState,\n                       'mobile-nav-item-pf': item.mobileItem && showMobileSecondary,\n                       'mobile-secondary-item-pf': item.mobileItem && showMobileTertiary}\" (mouseenter)=\"handlePrimaryHover(item)\" (mouseleave)=\"handlePrimaryBlur(item)\"><a (click)=\"handlePrimaryClick(item)\"><span class=\"{{item.iconStyleClass}}\" *ngIf=\"item.iconStyleClass\" [ngClass]=\"{hidden: hiddenIcons}\" tooltip=\"{{item.title}}\" container=\"body\" placement=\"bottom\" isDisabled=\"!{{navCollapsed}}\" containerClass=\"nav-pf-vertical-tooltip\"></span> <span class=\"list-group-item-value\">{{item.title}}</span><div *ngIf=\"showBadges && item.badges\" class=\"badge-container-pf\"><div class=\"badge {{badge.badgeClass}}\" *ngFor=\"let badge of item.badges\" tooltip=\"{{badge.tooltip}}\" container=\"body\" placement=\"right\"><span *ngIf=\"badge.count && badge.iconStyleClass\" class=\"{{badge.iconStyleClass}}\"></span> <span *ngIf=\"badge.count\">{{badge.count}}</span></div></div></a><div *ngIf=\"item.children && item.children.length > 0\" class=\"nav-pf-secondary-nav\"><div class=\"nav-item-pf-header\"><a class=\"secondary-collapse-toggle-pf\" (click)=\"collapseSecondaryNav(item)\" [ngClass]=\"{'collapsed': item.secondaryCollapsed}\"></a> <span>{{item.title}}</span></div><ul class=\"list-group\"><li *ngFor=\"let secondaryItem of item.children\" class=\"list-group-item\" [ngClass]=\"{'tertiary-nav-item-pf': secondaryItem.children && secondaryItem.children.length > 0,\n                             'active': secondaryItem.trackActiveState,\n                             'is-hover': secondaryItem.trackHoverState,\n                             'mobile-nav-item-pf': secondaryItem.mobileItem}\" (mouseenter)=\"handleSecondaryHover(secondaryItem)\" (mouseleave)=\"handleSecondaryBlur(secondaryItem)\"><a (click)=\"handleSecondaryClick(item, secondaryItem)\"><span class=\"list-group-item-value\">{{secondaryItem.title}}</span><div *ngIf=\"showBadges && secondaryItem.badges\" class=\"badge-container-pf\"><div class=\"badge {{badge.badgeClass}}\" *ngFor=\"let badge of secondaryItem.badges\" tooltip=\"{{badge.tooltip}}\" container=\"body\" placement=\"right\"><span *ngIf=\"badge.count && badge.iconStyleClass\" class=\"{{badge.iconStyleClass}}\"></span> <span *ngIf=\"badge.count\">{{badge.count}}</span></div></div></a><div *ngIf=\"secondaryItem.children && secondaryItem.children.length > 0\" class=\"nav-pf-tertiary-nav\"><div class=\"nav-item-pf-header\"><a class=\"tertiary-collapse-toggle-pf\" (click)=\"collapseTertiaryNav(secondaryItem)\" [ngClass]=\"{'collapsed': secondaryItem.tertiaryCollapsed}\"></a> <span>{{secondaryItem.title}}</span></div><ul class=\"list-group\"><li *ngFor=\"let tertiaryItem of secondaryItem.children\" class=\"list-group-item\" [ngClass]=\"{'active': tertiaryItem.trackActiveState}\"><a (click)=\"handleTertiaryClick(item, secondaryItem, tertiaryItem)\"><span class=\"list-group-item-value\">{{tertiaryItem.title}}</span><div *ngIf=\"showBadges && tertiaryItem.badges\" class=\"badge-container-pf\"><div class=\"badge {{badge.badgeClass}}\" *ngFor=\"let badge of tertiaryItem.badges\" tooltip=\"{{badge.tooltip}}\" container=\"body\" placement=\"right\"><span *ngIf=\"badge.count && badge.iconStyleClass\" class=\"{{badge.iconStyleClass}}\"></span> <span *ngIf=\"badge.count\">{{badge.count}}</span></div></div></a></li></ul></div></li></ul></div></li></ul></div></nav></div>"
    }),
    __metadata("design:paramtypes", [ElementRef, Renderer2, Router, WindowReference])
], VerticalNavigationComponent);
export { VerticalNavigationComponent };
//# sourceMappingURL=vertical-navigation.component.js.map