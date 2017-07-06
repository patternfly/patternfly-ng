var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ActionConfig } from '../models/action-config';
import { cloneDeep, defaults, isEqual } from 'lodash';
/**
 * List actions component.
 *
 * config - The ActionsConfig object containing action properties
 */
var ListActionsComponent = (function () {
    /**
     * The default constructor
     *
     * @param el The element reference for this component
     */
    function ListActionsComponent(el) {
        this.el = el;
        /**
         * The event emitted when an action has been selected
         */
        this.onActionSelect = new EventEmitter();
        this.defaultConfig = {
            moreActionsDisabled: false,
            moreActionsVisible: true
        };
        this.isMoreActionsDropup = false;
    }
    // Initialization
    /**
     *  Setup component configuration upon initialization
     */
    ListActionsComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     *  Check if the component config has changed
     */
    ListActionsComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    ListActionsComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
    };
    // Actions
    ListActionsComponent.prototype.handleAction = function (action) {
        if (action && action.disabled !== true) {
            this.onActionSelect.emit(action);
        }
    };
    /**
     * Set flag indicating if kebab should be shown as a dropdown or dropup
     *
     * @param $event The MouseEvent triggering this function
     */
    ListActionsComponent.prototype.initMoreActionsDropup = function ($event) {
        var _this = this;
        window.requestAnimationFrame(function () {
            var kebabContainer = _this.closest($event.target, '.dropdown-kebab-pf.open', 'pfng-list-actions');
            var listContainer = _this.closest(_this.el.nativeElement, '.list-pf', 'pfng-list');
            if (kebabContainer === null || listContainer === null) {
                return;
            }
            var dropdownButton = kebabContainer.querySelector('.dropdown-toggle');
            var dropdownMenu = kebabContainer.querySelector('.dropdown-menu');
            var buttonRect = dropdownButton.getBoundingClientRect();
            var menuRect = dropdownMenu.getBoundingClientRect();
            var menuTop = buttonRect.top - menuRect.height;
            var menuBottom = buttonRect.top + buttonRect.height + menuRect.height;
            var parentRect = listContainer.getBoundingClientRect();
            if ((menuBottom <= parentRect.top + parentRect.height) || (menuTop < parentRect.top)) {
                _this.isMoreActionsDropup = false;
            }
            else {
                _this.isMoreActionsDropup = true;
            }
        });
    };
    // Utils
    /**
     * Get the closest ancestor based on given selector
     *
     * @param el The HTML element to start searching for matching ancestor
     * @param selector The selector to match
     * @param stopSelector If this selector is matched, the search is stopped
     * @returns {HTMLElement} The matching HTML element or null if not found
     */
    ListActionsComponent.prototype.closest = function (el, selector, stopSelector) {
        var retval = null;
        while (el) {
            if (el.matches(selector)) {
                retval = el;
                break;
            }
            else if (stopSelector && el.matches(stopSelector)) {
                break;
            }
            el = el.parentElement;
        }
        return retval;
    };
    return ListActionsComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", ActionConfig)
], ListActionsComponent.prototype, "config", void 0);
__decorate([
    Output('onActionSelect'),
    __metadata("design:type", Object)
], ListActionsComponent.prototype, "onActionSelect", void 0);
ListActionsComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-list-actions',
        template: require('./list-actions.component.html')
    }),
    __metadata("design:paramtypes", [ElementRef])
], ListActionsComponent);
export { ListActionsComponent };
//# sourceMappingURL=list-actions.component.js.map