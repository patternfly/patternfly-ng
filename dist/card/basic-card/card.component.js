var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { cloneDeep, defaults, isEqual } from 'lodash';
import { CardBase } from '../card-base';
import { CardFilterPosition } from '../card-filter/card-filter-position';
/**
 * Card component
 *
 * For customization, use the templates named headerTemplate and footerTemplate.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { CardModule } from 'patternfly-ng/card';
 * // Or
 * import { CardModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [CardModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { CardAction, CardConfig, CardFilter, CardFilterPosition } from 'patternfly-ng/card';
 * </pre></code>
 */
var CardComponent = /** @class */ (function (_super) {
    __extends(CardComponent, _super);
    /**
     * The default constructor
     */
    function CardComponent() {
        var _this = _super.call(this) || this;
        /**
         * The event emitted when an action is selected
         */
        _this.onActionSelect = new EventEmitter();
        /**
         * The event emitted when a filter is selected
         */
        _this.onFilterSelect = new EventEmitter();
        _this.defaultConfig = {
            filterPosition: CardFilterPosition.FOOTER,
            noPadding: false,
            titleBorder: true,
            topBorder: true
        };
        return _this;
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    CardComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    CardComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    CardComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.prevConfig = cloneDeep(this.config);
    };
    // Actions
    /**
     * Handle the event emitted when an action is selected
     *
     * @param {CardAction} $event The emitted CardAction object
     */
    CardComponent.prototype.handleActionSelect = function ($event) {
        this.onActionSelect.emit($event);
    };
    /**
     * Handle the event emitted when a filter is selected
     *
     * @param {CardFilter} $event The emitted CardFilter object
     */
    CardComponent.prototype.handleFilterSelect = function ($event) {
        this.onFilterSelect.emit($event);
    };
    Object.defineProperty(CardComponent.prototype, "showFilterInFooter", {
        // Accessors
        /**
         * Indicates that the footer should be shown in the footer
         *
         * @returns {boolean} True if the footer should be shown in the footer
         */
        get: function () {
            return (this.config.filters && this.config.filterPosition
                && this.config.filterPosition === CardFilterPosition.FOOTER);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardComponent.prototype, "showFilterInHeader", {
        /**
         * Indicates that the footer should be shown in the header
         *
         * @returns {boolean} True if the footer should be shown in the header
         */
        get: function () {
            return (this.config.filters && this.config.filterPosition
                && this.config.filterPosition === CardFilterPosition.HEADER);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardComponent.prototype, "showFooter", {
        /**
         * Indicates that the footer should be shown
         *
         * @returns {boolean} True if the footer should be shown
         */
        get: function () {
            return (this.footerTemplate !== undefined || this.showFilterInFooter || this.config.action !== undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardComponent.prototype, "showHeader", {
        /**
         * Indicates that the header should be shown
         *
         * @returns {boolean} True if the header should be shown
         */
        get: function () {
            return (this.headerTemplate !== undefined || this.showFilterInHeader || this.config.title !== undefined);
        },
        enumerable: true,
        configurable: true
    });
    CardComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-card',
                    template: "<div class=\"pfng-card card-pf\" [ngClass]=\"{'card-pf-accented': config?.topBorder, 'pfng-card-no-padding': config.noPadding}\"><div [ngClass]=\"config?.titleBorder ? 'card-pf-heading' : 'pfng-card-heading-no-bottom'\" *ngIf=\"showHeader\"><div *ngIf=\"headerTemplate; then showHeaderTemplate else showHeader\"></div><ng-template #showHeaderTemplate><ng-template [ngTemplateOutlet]=\"headerTemplate\"></ng-template></ng-template><ng-template #showHeader><div *ngIf=\"showFilterInHeader\"><pfng-card-filter [filters]=\"config?.filters\" (onFilterSelect)=\"handleFilterSelect($event)\"></pfng-card-filter></div><h2 class=\"card-pf-title\">{{config?.title}}</h2></ng-template></div><span *ngIf=\"config?.subTitle\" class=\"card-pf-subtitle\">{{config?.subTitle}}</span><div class=\"card-pf-body\"><ng-content></ng-content></div><div class=\"card-pf-footer\" *ngIf=\"showFooter\"><div *ngIf=\"footerTemplate; then showFooterTemplate else showFooter\"></div><ng-template #showFooterTemplate><ng-template [ngTemplateOutlet]=\"footerTemplate\"></ng-template></ng-template><ng-template #showFooter><div *ngIf=\"showFilterInFooter\"><pfng-card-filter [filters]=\"config?.filters\" (onFilterSelect)=\"handleFilterSelect($event)\"></pfng-card-filter></div><p><pfng-card-action [action]=\"config?.action\" (onActionSelect)=\"handleActionSelect($event)\"></pfng-card-action></p></ng-template></div></div>"
                },] },
    ];
    /** @nocollapse */
    CardComponent.ctorParameters = function () { return []; };
    CardComponent.propDecorators = {
        'config': [{ type: Input },],
        'onActionSelect': [{ type: Output, args: ['onActionSelect',] },],
        'onFilterSelect': [{ type: Output, args: ['onFilterSelect',] },],
    };
    return CardComponent;
}(CardBase));
export { CardComponent };
//# sourceMappingURL=card.component.js.map