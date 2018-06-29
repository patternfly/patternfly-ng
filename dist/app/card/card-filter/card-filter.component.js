import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
/**
 * Card filter component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { CardFilterModule } from 'patternfly-ng/card';
 * // Or
 * import { CardFilterModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [CardFilterModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { CardFilter, CardFilterPosition } from 'patternfly-ng/card';
 * </pre></code>
 */
var CardFilterComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function CardFilterComponent() {
        /**
         * The event emitted when a filter is selected
         */
        this.onSelect = new EventEmitter();
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    CardFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.filters !== undefined && this.filters.length > 0) {
            this.currentFilter = this.filters[0];
            this.filters.forEach(function (filter) {
                if (filter.default === true) {
                    _this.currentFilter = filter;
                    return;
                }
            });
        }
    };
    // Actions
    CardFilterComponent.prototype.select = function ($event) {
        this.currentFilter = $event;
        this.onSelect.emit($event);
    };
    Object.defineProperty(CardFilterComponent.prototype, "currentFilter", {
        // Accessors
        /**
         * Returns the current filter
         *
         * @returns {CardFilter} The current filter
         */
        get: function () {
            return this._currentFilter;
        },
        /**
         * Sets the current filter
         *
         * @param {CardFilter} filter The current filter
         */
        set: function (filter) {
            this._currentFilter = filter;
        },
        enumerable: true,
        configurable: true
    });
    CardFilterComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-card-filter',
                    template: "<div class=\"card-pf-time-frame-filter\"><div class=\"dropdown primary-action\" dropdown><button class=\"btn btn-default dropdown-toggle\" type=\"button\" dropdownToggle>{{currentFilter?.title}}<span class=\"caret\"></span></button><ul class=\"dropdown-menu dropdown-menu-right\" role=\"menu\" *dropdownMenu><li role=\"menuitem\" *ngFor=\"let filter of filters\" [ngClass]=\"{'selected': filter === currentFilter}\"><a class=\"dropdown-item\" role=\"menuitem\" tabindex=\"-1\" (click)=\"select(filter)\">{{filter?.title}}</a></li></ul></div></div>"
                },] },
    ];
    /** @nocollapse */
    CardFilterComponent.ctorParameters = function () { return []; };
    CardFilterComponent.propDecorators = {
        'filters': [{ type: Input },],
        'onSelect': [{ type: Output, args: ['onFilterSelect',] },],
    };
    return CardFilterComponent;
}());
export { CardFilterComponent };
//# sourceMappingURL=card-filter.component.js.map