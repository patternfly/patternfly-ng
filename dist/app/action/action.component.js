import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { clone, cloneDeep, defaults, isEqual } from 'lodash';
/**
 * List actions component.
 *
 * By default, buttons and kebab have no padding so they may inherit stying from components such as list and toolbar.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { ActionModule } from 'patternfly-ng/action';
 * // Or
 * import { ActionModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [ActionModule, BsDropdownModule.forRoot(),...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { Action, ActionConfig } from 'patternfly-ng/action';
 * </pre></code>
 */
var ActionComponent = /** @class */ (function () {
    /**
     * The default constructor
     *
     * @param el The element reference for this component
     */
    function ActionComponent(el) {
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
     * Setup component configuration upon initialization
     */
    ActionComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    ActionComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    ActionComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        // lodash has issues deep cloning templates -- best seen with list component
        this.prevConfig = clone(this.config);
    };
    // Private
    ActionComponent.prototype.handleAction = function (action) {
        if (action && action.disabled !== true) {
            this.onActionSelect.emit(action);
        }
    };
    /**
     * Set flag indicating if kebab should be shown as a dropdown or dropup
     *
     * @param $event The MouseEvent triggering this function
     */
    ActionComponent.prototype.initMoreActionsDropup = function ($event) {
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
    ActionComponent.prototype.closest = function (el, selector, stopSelector) {
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
    ActionComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-action',
                    template: "<button class=\"btn btn-default primary-action {{action.styleClass}}\" title=\"{{action.tooltip}}\" type=\"button\" *ngFor=\"let action of config.primaryActions\" [disabled]=\"action.disabled\" [ngClass]=\"{'invisible': action.visible === false}\" (click)=\"handleAction(action)\"><div *ngIf=\"action.template; then showButtonTemplate else showButton\"></div><ng-template #showButtonTemplate let-action=\"action\" [ngTemplateOutlet]=\"action.template\" [ngTemplateOutletContext]=\"{ action: action }\"></ng-template><ng-template #showButton>{{action.title}}</ng-template></button><ng-template *ngIf=\"template !== undefined\" let-action=\"action\" [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{ action: action }\"></ng-template><div class=\"dropdown-kebab-pf pull-right {{config.moreActionsStyleClass}}\" dropdown [ngClass]=\"{'dropdown': !isMoreActionsDropup, 'dropup': isMoreActionsDropup, 'invisible': config.moreActionsVisible === false}\" *ngIf=\"config.moreActions?.length > 0\"><button class=\"btn btn-link dropdown-toggle\" type=\"button\" dropdownToggle [ngClass]=\"{'disabled': config.moreActionsDisabled}\" (click)=\"initMoreActionsDropup($event)\" [attr.aria-label]=\"config.moreActionsAriaLabel\"><span class=\"fa fa-ellipsis-v\"></span></button><ul class=\"dropdown-menu-right dropdown-menu\" aria-labelledby=\"dropdownKebab\" *dropdownMenu><li *ngFor=\"let action of config.moreActions\" class=\"{{action.styleClass}}\" [attr.role]=\"action.separator === true ? 'separator' : 'menuitem'\" [ngClass]=\"{'divider': action.separator === true, 'disabled': action.disabled === true, 'hidden': action.visible === false}\"><a *ngIf=\"action.disabled !== true && action.separator !== true\" class=\"dropdown-item secondary-action\" href=\"javascript:void(0)\" title=\"{{action.tooltip}}\" (click)=\"handleAction(action)\">{{action.title}}</a> <a *ngIf=\"action.disabled === true && action.separator !== true\" class=\"dropdown-item secondary-action\" href=\"javascript:void(0)\" title=\"{{action.tooltip}}\" onclick=\"return false;\">{{action.title}}</a></li></ul></div>"
                },] },
    ];
    /** @nocollapse */
    ActionComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    ActionComponent.propDecorators = {
        'config': [{ type: Input },],
        'template': [{ type: Input },],
        'onActionSelect': [{ type: Output, args: ['onActionSelect',] },],
    };
    return ActionComponent;
}());
export { ActionComponent };
//# sourceMappingURL=action.component.js.map