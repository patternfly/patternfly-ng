var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EventEmitter, Input, Output, TemplateRef, } from '@angular/core';
/**
 * List base component
 */
var ListBase = (function () {
    /**
     * The default constructor
     */
    function ListBase() {
        /**
         * The event emitted when an action (e.g., button, kebab, etc.) has been selected
         */
        this.onActionSelect = new EventEmitter();
        /**
         * The event emitted when an item has been clicked
         */
        this.onClick = new EventEmitter();
        /**
         * The event emitted when an item is double clicked
         */
        this.onDblClick = new EventEmitter();
        /**
         * The event emitted when an item selection has been changed
         */
        this.onSelectionChange = new EventEmitter();
    }
    // Initialization
    /**
     * Set up default config
     */
    ListBase.prototype.setupConfig = function () {
        var config = this.getConfig();
        if (config.multiSelect === undefined || config.multiSelect === false) {
            var selectedItems = this.getSelectedItems(this.items);
            if (selectedItems.length > 0) {
                this.selectSingleItem(selectedItems[0]);
            }
        }
        if (config.multiSelect && config.dblClick) {
            throw new Error('ListComponent - Illegal use: ' +
                'Cannot use both multi-select and double click selection at the same time.');
        }
        if (config.selectItems && config.showCheckbox) {
            throw new Error('ListComponent - Illegal use: ' +
                'Cannot use both checkbox and click selection at the same time.');
        }
    };
    Object.defineProperty(ListBase.prototype, "itemsEmpty", {
        // Getters & setters
        /**
         * Get the flag indicating list has no items
         *
         * @returns {boolean} The flag indicating list has no items
         */
        get: function () {
            return !(this.items !== undefined && this.items.length > 0);
        },
        enumerable: true,
        configurable: true
    });
    // Actions
    /**
     * Helper to generate action select event
     *
     * @param {Action} action The selected action
     */
    ListBase.prototype.handleAction = function (action) {
        if (action && action.disabled !== true) {
            this.onActionSelect.emit(action);
        }
    };
    // Selection
    /**
     * Helper to generate selection change event
     *
     * @param item The selected item
     */
    ListBase.prototype.checkboxChange = function (item) {
        this.onSelectionChange.emit({
            item: item,
            selectedItems: this.getSelectedItems(this.items)
        });
    };
    /**
     * Helper to generate double click event
     *
     * @param {MouseEvent} $event The triggered event
     * @param item The double clicked item
     */
    ListBase.prototype.dblClick = function ($event, item) {
        var config = this.getConfig();
        if (config.dblClick === true) {
            this.onDblClick.emit({
                item: item
            });
        }
    };
    /**
     * Helper to deselect given items items and children
     *
     * @param {any[]} items The items to be deselected
     */
    ListBase.prototype.deselectItems = function (items) {
        if (items !== undefined) {
            for (var i = 0; i < items.length; i++) {
                items[i].selected = false;
                if (Array.isArray(items[i].children)) {
                    this.deselectItems(items[i].children);
                }
            }
        }
    };
    /**
     * Helper to retrieve selected items
     *
     * @param {any[]} items The items containing possible selections
     * @returns {any[]} A list of selected items
     */
    ListBase.prototype.getSelectedItems = function (items) {
        var selectedItems = [];
        if (items !== undefined) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].selected) {
                    selectedItems.push(items[i]);
                }
                if (Array.isArray(items[i].children)) {
                    var selectedChildren = this.getSelectedItems(items[i].children);
                    selectedItems = selectedItems.concat(selectedChildren);
                }
            }
        }
        return selectedItems;
    };
    /**
     * Helper to select a single item and deselect all others
     *
     * @param item The item to select
     */
    ListBase.prototype.selectSingleItem = function (item) {
        this.deselectItems(this.items);
        item.selected = true;
    };
    /**
     * Select or deselect an item
     *
     * @param item The item to select or deselect
     * @param {boolean} selected True if item should be selected
     */
    ListBase.prototype.selectItem = function (item, selected) {
        var config = this.getConfig();
        // Are we using checkboxes?
        if (config.showCheckbox) {
            item.selected = selected;
            return;
        }
        // Multiple item selection
        if (config.multiSelect && !config.dblClick) {
            item.selected = selected;
        }
        else {
            // Single item selection
            this.deselectItems(this.items);
            this.selectSingleItem(item);
        }
    };
    /**
     * Helper to toggle item selection
     *
     * @param {MouseEvent} $event The triggered event
     * @param item The item to select
     */
    ListBase.prototype.toggleSelection = function ($event, item) {
        var config = this.getConfig();
        var selectionChanged = false;
        // Always emit click event
        this.onClick.emit({
            item: item
        });
        // Go no further if click selection isn't enabled
        if (!config.selectItems) {
            return;
        }
        // Multiple item selection
        if (config.multiSelect && !config.dblClick) {
            // Item's 'selected' prop may be undefined initially
            if (item.selected === true) {
                item.selected = false;
            }
            else {
                item.selected = true;
            }
            selectionChanged = true;
        }
        else {
            // Single item selection
            if (item.selected === true) {
                // Avoid accidentally deselecting by dblClick
                if (!config.dblClick) {
                    this.deselectItems(this.items);
                    selectionChanged = true;
                }
            }
            else {
                this.selectSingleItem(item);
                selectionChanged = true;
            }
        }
        // Emit event only if selection changed
        if (selectionChanged === true) {
            this.onSelectionChange.emit({
                item: item,
                selectedItems: this.getSelectedItems(this.items)
            });
        }
    };
    return ListBase;
}());
export { ListBase };
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], ListBase.prototype, "actionTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], ListBase.prototype, "items", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], ListBase.prototype, "itemTemplate", void 0);
__decorate([
    Output('onActionSelect'),
    __metadata("design:type", Object)
], ListBase.prototype, "onActionSelect", void 0);
__decorate([
    Output('onClick'),
    __metadata("design:type", Object)
], ListBase.prototype, "onClick", void 0);
__decorate([
    Output('onDblClick'),
    __metadata("design:type", Object)
], ListBase.prototype, "onDblClick", void 0);
__decorate([
    Output('onSelectionChange'),
    __metadata("design:type", Object)
], ListBase.prototype, "onSelectionChange", void 0);
//# sourceMappingURL=list-base.js.map