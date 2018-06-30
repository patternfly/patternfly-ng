import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { cloneDeep, defaults, isEqual } from 'lodash';
/**
 * Component for rendering an empty state.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { EmptyStateModule } from 'patternfly-ng/empty-state';
 * // Or
 * import { EmptyStateModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [EmptyStateModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { EmptyStateConfig } from 'patternfly-ng/empty-state';
 * </pre></code>
 */
var EmptyStateComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function EmptyStateComponent() {
        /**
         * The event emitted when an action is selected
         */
        this.onActionSelect = new EventEmitter();
        this.defaultConfig = {
            title: 'No Items Available'
        };
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    EmptyStateComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    EmptyStateComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    EmptyStateComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.prevConfig = cloneDeep(this.config);
    };
    // Private
    EmptyStateComponent.prototype.handleAction = function (action) {
        if (action && action.disabled !== true) {
            this.onActionSelect.emit(action);
        }
    };
    EmptyStateComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-empty-state',
                    template: "<div class=\"blank-slate-pf\"><div *ngIf=\"config.iconStyleClass\" class=\"blank-slate-pf-icon\"><span class=\"{{config.iconStyleClass}}\"></span></div><h1 id=\"title\">{{config.title}}</h1><p id=\"info\" *ngIf=\"config.info !== undefined\">{{config.info}}</p><p id=\"helpLink\" *ngIf=\"config.helpLink !== undefined\">{{config.helpLink.text}} <a href=\"{{config.helpLink.url}}\">{{config.helpLink.hypertext}}</a>.</p><div *ngIf=\"config.actions?.primaryActions?.length > 0\" class=\"blank-slate-pf-main-action\"><button *ngFor=\"let action of config.actions.primaryActions\" class=\"btn btn-primary btn-lg {{action.styleClass}}\" title=\"{{action.tooltip}}\" [disabled]=\"action.disabled\" [ngClass]=\"{'disabled': action.disabled, 'hidden': action.visible === false}\" (click)=\"handleAction(action)\"><div *ngIf=\"action.template; then showButtonTemplate else showButton\"></div><ng-template #showButtonTemplate let-action=\"action\" [ngTemplateOutlet]=\"action.template\" [ngTemplateOutletContext]=\"{ action: action }\"></ng-template><ng-template #showButton>{{action.title}}</ng-template></button></div><div class=\"blank-slate-pf-secondary-action {{config.actions?.moreActionsStyleClass}}\" [ngClass]=\"{'hidden': config.actions?.moreActionsVisible === false}\" *ngIf=\"config.actions?.moreActions?.length > 0\"><button *ngFor=\"let action of config.actions.moreActions\" class=\"btn btn-default {{action.styleClass}}\" title=\"{{action.tooltip}}\" [disabled]=\"action.disabled\" [ngClass]=\"{'disabled': config.actions?.moreActionsDisabled, 'hidden': action.visible === false}\" (click)=\"handleAction(action)\">{{action.title}}</button></div></div>"
                },] },
    ];
    /** @nocollapse */
    EmptyStateComponent.ctorParameters = function () { return []; };
    EmptyStateComponent.propDecorators = {
        'config': [{ type: Input },],
        'onActionSelect': [{ type: Output, args: ['onActionSelect',] },],
    };
    return EmptyStateComponent;
}());
export { EmptyStateComponent };
//# sourceMappingURL=empty-state.component.js.map