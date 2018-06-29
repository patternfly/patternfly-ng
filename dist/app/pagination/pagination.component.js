import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { cloneDeep, defaults, isEqual } from 'lodash';
/**
 * Component for rendering pagination
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { PaginationModule } from 'patternfly-ng/pagination';
 * // Or
 * import { PaginationModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [PaginationModule, BsDropdownModule.forRoot(),...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { PaginationConfig, PaginationEvent } from 'patternfly-ng/pagination';
 * </pre></code>
 */
var PaginationComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function PaginationComponent() {
        /**
         * The Event is emitted when Page Size is changed
         */
        this.onPageSizeChange = new EventEmitter();
        /**
         * The Event is emitted when Page Number is Changed
         */
        this.onPageNumberChange = new EventEmitter();
        this.defaultConfig = {
            pageNumber: 1,
            pageSizeIncrements: [5, 10, 20, 40, 80, 100],
            pageSize: 5
        };
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    PaginationComponent.prototype.ngOnInit = function () {
        this.setupConfig();
        this.lastPageNumber = this.getLastPageNumber();
    };
    /**
     * Check if the component config has changed
     */
    PaginationComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Setup default config
     */
    PaginationComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.lastPageNumber = this.getLastPageNumber();
        this.pageNumber = this.config.pageNumber;
        this.prevConfig = cloneDeep(this.config);
    };
    Object.defineProperty(PaginationComponent.prototype, "pageNumber", {
        // Accessors
        get: function () {
            return (this.config.totalItems !== undefined && this.config.totalItems > 0) ? this._pageNumber : 0;
        },
        set: function (pageNumber) {
            this._pageNumber = pageNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "lastPageNumber", {
        /**
         * Return last page number
         */
        get: function () {
            return (this.config.totalItems !== undefined && this.config.totalItems > 0) ? this._lastPageNumber : 0;
        },
        /**
         * Update Last page Number
         */
        set: function (value) {
            this._lastPageNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    // Actions
    /**
     * Jump to First Page
     */
    PaginationComponent.prototype.gotoFirstPage = function () {
        if (this.config.pageNumber !== 1) {
            this.updatePageNumber(1);
        }
    };
    /**
     * Go to Previous Page
     */
    PaginationComponent.prototype.gotoPreviousPage = function () {
        if (this.config.pageNumber !== 1) {
            this.updatePageNumber(this.config.pageNumber - 1);
        }
    };
    /**
     * Go to Next Page
     */
    PaginationComponent.prototype.gotoNextPage = function () {
        if (this.config.pageNumber < this.lastPageNumber) {
            this.updatePageNumber(this.config.pageNumber + 1);
        }
    };
    /**
     * Jump to Last Page
     */
    PaginationComponent.prototype.gotoLastPage = function () {
        if (this.config.pageNumber < this.lastPageNumber) {
            this.updatePageNumber(this.lastPageNumber);
        }
    };
    /**
     * Return start index and end index of current page
     */
    PaginationComponent.prototype.getCurrentPage = function () {
        return this.getStartIndex() + ' - ' + this.getEndIndex();
    };
    /**
     * Start Index of Current Page
     */
    PaginationComponent.prototype.getStartIndex = function () {
        return (this.config.totalItems !== undefined && this.config.totalItems > 0)
            ? this.config.pageSize * (this.config.pageNumber - 1) + 1 : 0;
    };
    /**
     * End Index of Current Page
     */
    PaginationComponent.prototype.getEndIndex = function () {
        var numFullPages = Math.floor(this.config.totalItems / this.config.pageSize);
        var numItemsOnLastPage = this.config.totalItems - (numFullPages * this.config.pageSize) || this.config.pageSize;
        var numItemsOnPage = this.isLastPage() ? numItemsOnLastPage : this.config.pageSize;
        return (this.config.totalItems !== undefined && this.config.totalItems > 0)
            ? (this.getStartIndex() + numItemsOnPage - 1) : 0;
    };
    /**
     * Page number is changed via input field's focus event
     */
    PaginationComponent.prototype.onPageNumberBlur = function ($event) {
        var newPageNumber = parseInt(String(this.pageNumber), 10);
        if (isNaN(newPageNumber)) {
            newPageNumber = this.pageNumber = this.config.pageNumber;
        }
        if (newPageNumber > this.lastPageNumber) {
            this.updatePageNumber(this.lastPageNumber);
        }
        else if (newPageNumber < 1) {
            this.updatePageNumber(1);
        }
        else {
            this.updatePageNumber(newPageNumber);
        }
    };
    /**
     * Page number is changed via input field's keyboard event
     */
    PaginationComponent.prototype.onPageNumberKeyup = function ($event) {
        var keycode = $event.keyCode ? $event.keyCode : $event.which;
        if (keycode === 13) {
            this.onPageNumberBlur(null);
        }
    };
    // Private
    /**
     * Page size is changed
     * @param newPageSize new page size
     */
    PaginationComponent.prototype.onPageSizeUpdate = function ($event, newPageSize) {
        this.config.pageSize = newPageSize;
        this.lastPageNumber = this.getLastPageNumber();
        this.gotoFirstPage();
        this.onPageSizeChange.emit({
            pageSize: newPageSize
        });
    };
    /**
     * Update the Page Number
     * @param newPageNumber new page number
     */
    PaginationComponent.prototype.updatePageNumber = function (newPageNumber) {
        this.config.pageNumber = this.pageNumber = newPageNumber;
        this.onPageNumberChange.emit({
            pageNumber: newPageNumber
        });
    };
    /**
     * Get Last Page Number
     */
    PaginationComponent.prototype.getLastPageNumber = function () {
        return Math.ceil(this.config.totalItems / this.config.pageSize);
    };
    /**
     * Check if current Page is Last Page
     */
    PaginationComponent.prototype.isLastPage = function () {
        return (this.config.pageNumber === this.lastPageNumber);
    };
    PaginationComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-pagination',
                    template: "<form class=\"content-view-pf-pagination list-view-pf-pagination clearfix\"><div class=\"form-group\"><div class=\"padding-right-10\"><div class=\"btn-group dropdown\" dropdown><button #pageSizeMenu type=\"button\" class=\"btn btn-default dropdown-toggle\" dropdownToggle>{{config.pageSize}}<span class=\"caret\"></span></button><ul class=\"dropdown-menu\" *dropdownMenu><li class=\"display-length-increment\" [ngClass]=\"{'selected': increment === config?.pageSize}\" *ngFor=\"let increment of config?.pageSizeIncrements\"><a role=\"menuitem\" (click)=\"onPageSizeUpdate($event, increment)\">{{increment}}</a></li></ul></div></div><span for=\"pageSizeMenu\" class=\"per-page-label\">per page</span></div><div class=\"form-group\"><span><span class=\"pagination-pf-item-current\">{{getCurrentPage()}}</span>&nbsp;of&nbsp; <span class=\"pagination-pf-items-total\">{{config.totalItems}}</span></span><ul class=\"pagination pagination-pf-back\"><li [ngClass]=\"{'disabled': config.pageNumber === 1}\"><a class=\"goto-first-page\" title=\"First Page\" (click)=\"gotoFirstPage()\"><span class=\"i fa fa-angle-double-left\"></span></a></li><li [ngClass]=\"{'disabled': config.pageNumber === 1}\"><a class=\"goto-prev-page\" title=\"Previous Page\" (click)=\"gotoPreviousPage()\"><span class=\"i fa fa-angle-left\"></span></a></li></ul><input class=\"pagination-pf-page\" name=\"pageNumber\" type=\"text\" [(ngModel)]=\"pageNumber\" (blur)=\"onPageNumberBlur($event)\" (keyup.enter)=\"onPageNumberKeyup($event)\"> <span>of&nbsp;<span class=\"pagination-pf-pages\">{{lastPageNumber}}</span></span><ul class=\"pagination pagination-pf-forward\"><li [ngClass]=\"{'disabled': config.pageNumber === lastPageNumber}\"><a class=\"goto-next-page\" title=\"Next Page\" (click)=\"gotoNextPage()\"><span class=\"i fa fa-angle-right\"></span></a></li><li [ngClass]=\"{'disabled': config.pageNumber === lastPageNumber}\"><a class=\"goto-last-page\" title=\"Last Page\" (click)=\"gotoLastPage()\"><span class=\"i fa fa-angle-double-right\"></span></a></li></ul></div></form>"
                },] },
    ];
    /** @nocollapse */
    PaginationComponent.ctorParameters = function () { return []; };
    PaginationComponent.propDecorators = {
        'config': [{ type: Input },],
        'onPageSizeChange': [{ type: Output, args: ['onPageSizeChange',] },],
        'onPageNumberChange': [{ type: Output, args: ['onPageNumberChange',] },],
    };
    return PaginationComponent;
}());
export { PaginationComponent };
//# sourceMappingURL=pagination.component.js.map