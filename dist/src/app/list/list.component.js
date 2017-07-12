var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ListConfig } from './list-config';
import { cloneDeep, defaults, isEqual, without } from 'lodash';
/**
 * List component
 *
 * For items, use a template named itemTemplate to contain content for each item. For each item in the items array, the
 * expansion can be disabled by setting disabled to true on the item. If using actions, use a template named
 * actionTemplate to contain expandable content for the actions of each item. If using expand items, use a template
 * named itemExpandedTemplate to contain expandable content for each item.
 */
var ListComponent = (function () {
    /**
     * The default constructor
     */
    function ListComponent() {
        /**
         * The event emitted when an action (e.g., button, kebab, etc.) has been selected
         */
        this.onActionSelect = new EventEmitter();
        /**
         * The event emitted when a checkbox has been selected
         */
        this.onCheckboxChange = new EventEmitter();
        /**
         * The event emitted when an item has been clicked
         */
        this.onClick = new EventEmitter();
        /**
         * The event emitted when an item is double clicked
         */
        this.onDblClick = new EventEmitter();
        /**
         * The event emitted when an item is no longer dragged
         */
        // @Output('onDragEnd') onDragEnd = new EventEmitter();
        /**
         * The event emitted when an item is being dragged
         */
        // @Output('onDragMoved') onDragMoved = new EventEmitter();
        /**
         * The event emitted when an item begins to be dragged
         */
        // @Output('onDragStart') onDragStart = new EventEmitter();
        /**
         * The event emitted when an item has been selected
         */
        this.onSelect = new EventEmitter();
        /**
         * The event emitted when an item selection has been changed
         */
        this.onSelectionChange = new EventEmitter();
        this.defaultConfig = {
            checkDisabled: false,
            dblClick: false,
            dragEnabled: false,
            hideClose: false,
            multiSelect: false,
            selectedItems: [],
            selectionMatchProp: 'uuid',
            selectItems: false,
            showCheckbox: true,
            useExpandItems: false
        };
        this._itemsEmpty = true;
    }
    // Initialization
    /**
     *  Setup component configuration upon initialization
     */
    ListComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     *  Check if the component config has changed
     */
    ListComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
        this._itemsEmpty = !(this.items !== undefined && this.items.length > 0);
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
        if ((this.config.multiSelect === undefined || this.config.multiSelect === false)
            && this.config.selectedItems && this.config.selectedItems.length > 0) {
            this.config.selectedItems = [this.config.selectedItems[0]];
        }
        if (this.config.selectItems && this.config.showCheckbox) {
            throw new Error('ListComponent - Illegal use: ' +
                'Cannot use both item select and click selection at the same time.');
        }
        this.prevConfig = cloneDeep(this.config);
    };
    Object.defineProperty(ListComponent.prototype, "itemsEmpty", {
        // Getters & setters
        /**
         * Get the flag indicating list has no items
         *
         * @returns {boolean} The flag indicating list has no items
         */
        get: function () {
            return this._itemsEmpty;
        },
        enumerable: true,
        configurable: true
    });
    // Actions
    ListComponent.prototype.handleAction = function (action) {
        if (action && action.disabled !== true) {
            this.onActionSelect.emit(action);
        }
    };
    // Checkbox
    ListComponent.prototype.checkboxChange = function (item) {
        this.onCheckboxChange.emit({
            item: item
        });
    };
    ListComponent.prototype.isSelected = function (item) {
        var matchProp = this.config.selectionMatchProp;
        var selected = false;
        if (this.config.showCheckbox) {
            selected = item.selected;
        }
        else if (this.config.selectItems !== undefined) {
            this.config.selectedItems.forEach(function (itemObj) {
                if (itemObj[matchProp] === item[matchProp]) {
                    selected = true;
                }
            });
        }
        return selected;
    };
    // Drag and drop
    ListComponent.prototype.dragEnd = function () {
        /* Todo: dnd not implemeneted
        this.onDragEnd.emit({
          item: this.dragItem
        } as ListEvent);
        */
    };
    ListComponent.prototype.dragMoved = function () {
        /* Todo: dnd not implemeneted
        this.onDragMoved.emit({
          item: this.dragItem
        } as ListEvent);
        */
    };
    ListComponent.prototype.isDragOriginal = function (item) {
        return (item === this.dragItem);
    };
    ListComponent.prototype.dragStart = function (item) {
        this.dragItem = item;
        /* Todo: dnd not implemeneted
        this.onDragStart.emit({
          item: this.dragItem
        } as ListEvent);
        */
    };
    // Item Selection
    ListComponent.prototype.itemClick = function ($event, item) {
        var alreadySelected;
        var selectionChanged = false;
        // Ignore disabled item clicks completely
        if (item.disabled === true) {
            return;
        }
        if (this.config.selectItems) {
            if (this.config.multiSelect && !this.config.dblClick) {
                for (var i = 0; i < this.config.selectedItems.length - 1; i++) {
                    if (this.config.selectedItems[i] === item) {
                        alreadySelected = true;
                        break;
                    }
                }
                if (alreadySelected) {
                    // already selected so deselect
                    this.config.selectedItems = without(this.config.selectedItems, item);
                }
                else {
                    // add the item to the selected items
                    this.config.selectedItems.push(item);
                    selectionChanged = true;
                }
            }
            else {
                if (this.config.selectedItems[0] === item) {
                    if (!this.config.dblClick) {
                        this.config.selectedItems = [];
                        selectionChanged = true;
                    }
                }
                else {
                    this.config.selectedItems = [item];
                    selectionChanged = true;
                }
            }
            if (selectionChanged === true) {
                this.onSelect.emit({
                    item: item
                });
                this.onSelectionChange.emit({
                    item: item,
                    selectedItems: this.config.selectedItems
                });
            }
        }
        this.onClick.emit({
            item: item
        });
    };
    ListComponent.prototype.dblClick = function ($event, item) {
        // Ignore disabled item clicks
        if (this.config.dblClick === true && item.disabled !== true) {
            this.onDblClick.emit({
                item: item
            });
        }
    };
    // Toggle
    ListComponent.prototype.closeExpandArea = function (item) {
        item.expandId = undefined;
        item.expanded = false;
    };
    ListComponent.prototype.toggleExpandArea = function (item) {
        // Item may already be open due to compound expansion
        if (item.expanded && item.expandId !== undefined) {
            item.expandId = undefined;
            return;
        }
        item.expandId = undefined;
        item.expanded = !item.expanded;
    };
    return ListComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], ListComponent.prototype, "actionTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", ListConfig)
], ListComponent.prototype, "config", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], ListComponent.prototype, "items", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], ListComponent.prototype, "itemTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], ListComponent.prototype, "expandTemplate", void 0);
__decorate([
    Output('onActionSelect'),
    __metadata("design:type", Object)
], ListComponent.prototype, "onActionSelect", void 0);
__decorate([
    Output('onCheckboxChange'),
    __metadata("design:type", Object)
], ListComponent.prototype, "onCheckboxChange", void 0);
__decorate([
    Output('onClick'),
    __metadata("design:type", Object)
], ListComponent.prototype, "onClick", void 0);
__decorate([
    Output('onDblClick'),
    __metadata("design:type", Object)
], ListComponent.prototype, "onDblClick", void 0);
__decorate([
    Output('onSelect'),
    __metadata("design:type", Object)
], ListComponent.prototype, "onSelect", void 0);
__decorate([
    Output('onSelectionChange'),
    __metadata("design:type", Object)
], ListComponent.prototype, "onSelectionChange", void 0);
ListComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-list',
        styles: [require('./list.component.css').toString()],
        template: require('./list.component.html')
    }),
    __metadata("design:paramtypes", [])
], ListComponent);
export { ListComponent };
//# sourceMappingURL=list.component.js.map