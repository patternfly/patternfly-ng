var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
/**
 * Card filter component
 */
var CardFilterComponent = (function () {
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
     *  Setup component configuration upon initialization
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
        // Getters and setters
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
    return CardFilterComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], CardFilterComponent.prototype, "filters", void 0);
__decorate([
    Output('onFilterSelect'),
    __metadata("design:type", Object)
], CardFilterComponent.prototype, "onSelect", void 0);
CardFilterComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-card-filter',
        template: "<div class=\"card-pf-time-frame-filter\"><div class=\"dropdown primary-action\" dropdown><button class=\"btn btn-default dropdown-toggle\" type=\"button\" dropdownToggle>{{currentFilter?.title}}<span class=\"caret\"></span></button><ul class=\"dropdown-menu dropdown-menu-right\" role=\"menu\" *dropdownMenu><li role=\"menuitem\" *ngFor=\"let filter of filters\" [ngClass]=\"{'selected': filter === currentFilter}\"><a class=\"dropdown-item\" role=\"menuitem\" tabindex=\"-1\" (click)=\"select(filter)\">{{filter?.title}}</a></li></ul></div></div>"
    }),
    __metadata("design:paramtypes", [])
], CardFilterComponent);
export { CardFilterComponent };
//# sourceMappingURL=card-filter.component.js.map