import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { cloneDeep, defaults, isEqual } from 'lodash';
/**
 * Sort component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { SortModule } from 'patternfly-ng/sort';
 * // Or
 * import { SortModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [SortModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { SortConfig, SortEvent, SortField } from 'patternfly-ng/sort';
 * </pre></code>
 */
var SortComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function SortComponent() {
        /**
         * The event emitted when the sort has changed
         */
        this.onChange = new EventEmitter();
        this.defaultConfig = {
            isAscending: true,
            visible: true
        };
    }
    /**
     * Setup component configuration upon initialization
     */
    SortComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    SortComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    SortComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        if (this.config && this.config.fields && this.config.fields.length > 0) {
            if (this.currentField === undefined) {
                this.currentField = this.config.fields[0];
            }
            if (this.config.isAscending === undefined) {
                this.config.isAscending = true;
            }
        }
        this.prevConfig = cloneDeep(this.config);
    };
    // Actions
    SortComponent.prototype.getIconStyleClass = function () {
        var iconStyleClass;
        if (this.currentField && this.currentField.sortType
            && this.currentField.sortType === 'numeric') {
            if (this.config.isAscending) {
                iconStyleClass = 'fa fa-sort-numeric-asc';
            }
            else {
                iconStyleClass = 'fa fa-sort-numeric-desc';
            }
        }
        else {
            if (this.config.isAscending) {
                iconStyleClass = 'fa fa-sort-alpha-asc';
            }
            else {
                iconStyleClass = 'fa fa-sort-alpha-desc';
            }
        }
        return iconStyleClass;
    };
    SortComponent.prototype.onChangeDirection = function () {
        this.config.isAscending = !this.config.isAscending;
        this.onChange.emit({
            field: this.currentField,
            isAscending: this.config.isAscending
        });
    };
    SortComponent.prototype.selectField = function (field) {
        this.currentField = field;
        this.onChange.emit({
            field: this.currentField,
            isAscending: this.config.isAscending
        });
    };
    SortComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-sort',
                    template: "<div class=\"sort-pf\" *ngIf=\"config?.visible !== false\"><div class=\"btn-group dropdown\" dropdown><button type=\"button\" class=\"btn btn-default dropdown-toggle\" dropdownToggle [disabled]=\"config.disabled === true\">{{currentField?.title}} <span aria-hidden=\"true\" class=\"caret\"></span></button><ul class=\"dropdown-menu\" role=\"menu\" *dropdownMenu><li role=\"menuitem\" *ngFor=\"let item of config?.fields\" [ngClass]=\"{'selected': item === currentField}\"><a href=\"javascript:void(0);\" class=\"sortfield sort-field dropdown-item\" tabindex=\"-1\" (click)=\"selectField(item)\">{{item?.title}}</a></li></ul></div><button class=\"btn btn-link\" type=\"button\" aria-label=\"Sort Direction\" [disabled]=\"config.disabled === true\" (click)=\"onChangeDirection()\"><span class=\"sort-direction\" [ngClass]=\"getIconStyleClass()\"></span></button></div>"
                },] },
    ];
    /** @nocollapse */
    SortComponent.ctorParameters = function () { return []; };
    SortComponent.propDecorators = {
        'config': [{ type: Input },],
        'onChange': [{ type: Output, args: ['onChange',] },],
    };
    return SortComponent;
}());
export { SortComponent };
//# sourceMappingURL=sort.component.js.map