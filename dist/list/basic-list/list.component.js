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
import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { cloneDeep, defaults, isEqual, uniqueId } from 'lodash';
import { ListBase } from '../list-base';
/**
 * List component
 *
 * For items, use a template named itemTemplate to contain content for each item. For each item in the items array, the
 * expansion can be disabled by setting disabled to true on the item. If using actions, use a template named
 * actionTemplate to contain expandable content for the actions of each item. If using expand items, use a template
 * named itemExpandedTemplate to contain expandable content for each item.
 *
 * Cannot use both multi-select and double click selection at the same time
 * Cannot use both checkbox and click selection at the same time
 *
 * Unique IDs are generated for each list item, which can be overridden by providing an id for the pfng-list tag.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { ListModule } from 'patternfly-ng/list';
 * // Or
 * import { ListModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 * import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';
 *
 * &#64;NgModule({
 *   imports: [ListModule, BsDropdownModule.forRoot(), TooltipModule.forRoot(),...],
 *   providers: [BsDropdownConfig, TooltipConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { ListConfig, ListEvent } from 'patternfly-ng/list';
 * </pre></code>
 */
var ListComponent = /** @class */ (function (_super) {
    __extends(ListComponent, _super);
    /**
     * The default constructor
     */
    function ListComponent(el) {
        var _this = _super.call(this) || this;
        _this.el = el;
        /**
         * The event emitted when an item pin has been changed
         */
        _this.onPinChange = new EventEmitter();
        _this.defaultConfig = {
            dblClick: false,
            hideClose: false,
            multiSelect: false,
            selectedItems: [],
            selectionMatchProp: 'uuid',
            selectItems: false,
            showCheckbox: false,
            showRadioButton: false,
            useExpandItems: false
        };
        _this.id = uniqueId('pfng-list');
        return _this;
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    ListComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    ListComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    ListComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        _super.prototype.setupConfig.call(this);
        this.prevConfig = cloneDeep(this.config);
    };
    /**
     * Return component config
     *
     * @returns {} ListConfig The component config
     */
    ListComponent.prototype.getConfig = function () {
        return this.config;
    };
    /**
     * Return an ID for the given element prefix and index (e.g., 'pfng-list1-item0')
     *
     * Note: The ID prefix can be overridden by providing an id for the pfng-list tag.
     *
     * @param {string} suffix The element suffix (e.g., 'item')
     * @param {number} index The current item index
     * @returns {string}
     */
    ListComponent.prototype.getId = function (suffix, index) {
        var result = this.id;
        if (this.el.nativeElement.id !== undefined && this.el.nativeElement.id.length > 0) {
            result = this.el.nativeElement.id;
        }
        return result + '-' + suffix + index;
    };
    // Toggle
    ListComponent.prototype.closeExpandItem = function (item) {
        item.expandId = undefined;
        item.expanded = false;
    };
    /**
     * Toggle expand item open/close
     *
     * @param {MouseEvent} $event The event emitted when an item has been clicked
     * @param {Object} item The object associated with the current row
     */
    ListComponent.prototype.toggleExpandItem = function ($event, item) {
        // Do nothing if item expansion is disabled
        if (!this.config.useExpandItems) {
            return;
        }
        // Do not trigger for child items, only on the DOM element to which the event is attached
        if ($event.target !== $event.currentTarget) {
            return;
        }
        // Item may already be open due to compound expansion
        if (item.expanded && item.expandId !== undefined) {
            item.expandId = undefined;
            return;
        }
        item.expandId = undefined;
        item.expanded = !item.expanded;
    };
    ListComponent.prototype.togglePin = function ($event, item) {
        item.showPin = (item.showPin === undefined) ? true : !item.showPin;
        this.onPinChange.emit({
            item: item
        });
    };
    ListComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-list',
                    template: "<div class=\"list-pf\" *ngIf=\"!itemsEmpty\"><div class=\"list-pf-item pfng-list-heading {{item?.itemStyleClass}}\" *ngIf=\"itemHeadingTemplate || actionHeadingTemplate\"><div class=\"list-pf-container\"><div class=\"pfng-list-pin-placeholder\" *ngIf=\"config.usePinItems\"></div><div class=\"list-pf-chevron\" *ngIf=\"config.useExpandItems\"><div class=\"pfng-list-expand-placeholder\"></div></div><div class=\"list-pf-select\" *ngIf=\"config.showCheckbox || config.showRadioButton\"><div class=\"pfng-list-cb-placeholder\"></div></div><div class=\"list-pf-content list-pf-content-flex\"><div class=\"pfng-list-content\"><ng-template *ngIf=\"itemHeadingTemplate\" [ngTemplateOutlet]=\"itemHeadingTemplate\" [ngTemplateOutletContext]=\"{ item: item, index: i }\"></ng-template></div><div class=\"list-pf-actions\"><ng-template *ngIf=\"actionHeadingTemplate\" [ngTemplateOutlet]=\"actionHeadingTemplate\" [ngTemplateOutletContext]=\"{ item: item, index: i }\"></ng-template></div></div></div></div><div class=\"list-pf-item {{item?.itemStyleClass}}\" [ngClass]=\"{'active': item.selected || item.expanded}\" *ngFor=\"let item of (config.usePinItems ? (items | sortArray: 'showPin': true) : items); let i = index\"><div class=\"list-pf-container\" [id]=\"getId('item', i)\" (click)=\"toggleExpandItem($event, item)\"><div class=\"pfng-list-pin-container\" *ngIf=\"config.usePinItems\"><div class=\"pfng-list-pin-placeholder\" [ngClass]=\"{'multi-ctrls': config.useExpandItems || config.showCheckbox || config.showRadioButton}\" *ngIf=\"item.showPin !== true\"></div><div class=\"pfng-list-pin\" [ngClass]=\"{'multi-ctrls': config.useExpandItems || config.showCheckbox || config.showRadioButton}\" *ngIf=\"item.showPin === true\"><a href=\"javascript:void(0);\" tabindex=\"-1\" title=\"Remove pin\" (click)=\"togglePin($event, item)\"><span class=\"fa fa-thumb-tack\"></span></a></div></div><div class=\"list-pf-chevron pfng-list-expand\" *ngIf=\"config.useExpandItems\"><div class=\"pfng-list-expand-placeholder\" *ngIf=\"item.hideExpandToggle === true\"></div><span class=\"fa fa-angle-right\" *ngIf=\"item.hideExpandToggle !== true\" (click)=\"toggleExpandItem($event, item)\" [ngClass]=\"{'fa-angle-down': item.expanded && item.expandId === undefined}\"></span></div><div class=\"list-pf-select\" *ngIf=\"config.showCheckbox && !config.showRadioButton\"><input type=\"checkbox\" [id]=\"getId('checkbox', i)\" [(ngModel)]=\"item.selected\" (ngModelChange)=\"checkboxChange(item)\"></div><div class=\"list-pf-select\" *ngIf=\"!config.showCheckbox && config.showRadioButton\"><input type=\"radio\" [id]=\"getId('radio', i)\" [checked]=\"item.selected\" (click)=\"radioButtonChange(item)\"></div><div class=\"list-pf-content list-pf-content-flex\"><div class=\"pfng-list-content\" (click)=\"toggleSelection($event, item)\" (dblclick)=\"dblClick($event, item)\"><ng-template *ngIf=\"itemTemplate\" [ngTemplateOutlet]=\"itemTemplate\" [ngTemplateOutletContext]=\"{ item: item, index: i }\"></ng-template></div><div class=\"list-pf-actions\"><ng-template *ngIf=\"actionTemplate\" [ngTemplateOutlet]=\"actionTemplate\" [ngTemplateOutletContext]=\"{ item: item, index: i }\"></ng-template></div></div></div><div class=\"pfng-list-expansion list-pf-expansion collapse in\" *ngIf=\"expandTemplate && item.expanded\"><div class=\"list-pf-container\" tabindex=\"0\"><div class=\"list-pf-content\"><div class=\"close\" *ngIf=\"config.hideClose !== true\"><span class=\"pficon pficon-close\" (click)=\"closeExpandItem(item)\"></span></div><ng-template [ngTemplateOutlet]=\"expandTemplate\" [ngTemplateOutletContext]=\"{ item: item, index: i }\"></ng-template></div></div></div></div></div><pfng-empty-state *ngIf=\"itemsEmpty\" [config]=\"config.emptyStateConfig\" (onActionSelect)=\"handleAction($event)\"></pfng-empty-state>"
                },] },
    ];
    /** @nocollapse */
    ListComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    ListComponent.propDecorators = {
        'actionHeadingTemplate': [{ type: Input },],
        'config': [{ type: Input },],
        'expandTemplate': [{ type: Input },],
        'itemHeadingTemplate': [{ type: Input },],
        'onPinChange': [{ type: Output, args: ['onPinChange',] },],
    };
    return ListComponent;
}(ListBase));
export { ListComponent };
//# sourceMappingURL=list.component.js.map