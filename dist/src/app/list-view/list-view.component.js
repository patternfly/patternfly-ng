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
import { ListViewConfig } from './list-view-config';
import { cloneDeep, defaults, isEqual, without } from 'lodash';
/**
 * List view component
 *
 * For items, use a template named itemTemplate to contain content for each row. For each item in the items array, the
 * expansion can be disabled by setting disabled to true on the item. If using actions, use a template named
 * actionTemplate to contain expandable content for the actions of each row. If using expanding rows, use a template
 * named itemExpandedTemplate to contain expandable content for each row.
 */
var ListViewComponent = (function () {
    /**
     * The default constructor
     */
    function ListViewComponent() {
        /**
         * The event emitted when an action (e.g., button, kebab, etc.) has been selected
         */
        this.onActionSelect = new EventEmitter();
        /**
         * The event emitted when a row checkbox has been selected
         */
        this.onCheckBoxChange = new EventEmitter();
        /**
         * The event emitted when a row has been clicked
         */
        this.onClick = new EventEmitter();
        /**
         * The event emitted when a row is double clicked
         */
        this.onDblClick = new EventEmitter();
        /**
         * The event emitted when a row is no longer dragged
         */
        // @Output('onDragEnd') onDragEnd = new EventEmitter();
        /**
         * The event emitted when a row is being dragged
         */
        // @Output('onDragMoved') onDragMoved = new EventEmitter();
        /**
         * The event emitted when a row begins to be dragged
         */
        // @Output('onDragStart') onDragStart = new EventEmitter();
        /**
         * The event emitted when a row has been selected
         */
        this.onSelect = new EventEmitter();
        /**
         * The event emitted when a row selection has been changed
         */
        this.onSelectionChange = new EventEmitter();
        this.defaultConfig = {
            selectItems: false,
            multiSelect: false,
            dblClick: false,
            dragEnabled: false,
            selectedItems: [],
            selectionMatchProp: 'uuid',
            checkDisabled: false,
            useExpandingRows: false,
            showSelectBox: true
        };
        this.itemsEmpty = true;
    }
    // Initialization
    /**
     *  Setup component configuration upon initialization
     */
    ListViewComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     *  Check if the component config has changed
     */
    ListViewComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
        this.itemsEmpty = !(this.items !== undefined && this.items.length > 0);
    };
    ListViewComponent.prototype.setupConfig = function () {
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
        if (this.config.selectItems && this.config.showSelectBox) {
            throw new Error('ListViewComponent - Illegal use: ' +
                'Cannot use both select box and click selection at the same time.');
        }
        this.prevConfig = cloneDeep(this.config);
    };
    // Actions
    ListViewComponent.prototype.handleAction = function (action) {
        if (action && action.disabled !== true) {
            this.onActionSelect.emit(action);
        }
    };
    // Checkbox
    ListViewComponent.prototype.checkBoxChange = function (item) {
        this.onCheckBoxChange.emit({
            item: item
        });
    };
    ListViewComponent.prototype.isSelected = function (item) {
        var matchProp = this.config.selectionMatchProp;
        var selected = false;
        if (this.config.showSelectBox) {
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
    ListViewComponent.prototype.dragEnd = function () {
        /* Todo: dnd not implemeneted
        this.onDragEnd.emit({
          item: this.dragItem
        } as ListViewEvent);
        */
    };
    ListViewComponent.prototype.dragMoved = function () {
        /* Todo: dnd not implemeneted
        this.onDragMoved.emit({
          item: this.dragItem
        } as ListViewEvent);
        */
    };
    ListViewComponent.prototype.isDragOriginal = function (item) {
        return (item === this.dragItem);
    };
    ListViewComponent.prototype.dragStart = function (item) {
        this.dragItem = item;
        /* Todo: dnd not implemeneted
        this.onDragStart.emit({
          item: this.dragItem
        } as ListViewEvent);
        */
    };
    // Row Selection
    ListViewComponent.prototype.itemClick = function ($event, item) {
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
    ListViewComponent.prototype.dblClick = function ($event, item) {
        // Ignore disabled item clicks
        if (this.config.dblClick === true && item.disabled !== true) {
            this.onDblClick.emit({
                item: item
            });
        }
    };
    // Toggle
    ListViewComponent.prototype.closeExpandingRow = function (item) {
        item.expandingRowId = undefined;
        item.isRowExpanded = false;
    };
    ListViewComponent.prototype.toggleExpandingRow = function (item) {
        // Row may already be open due to compound expansion
        if (item.isRowExpanded && item.expandingRowId !== undefined) {
            item.expandingRowId = undefined;
            return;
        }
        item.expandingRowId = undefined;
        item.isRowExpanded = !item.isRowExpanded;
    };
    return ListViewComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], ListViewComponent.prototype, "actionTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", ListViewConfig)
], ListViewComponent.prototype, "config", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], ListViewComponent.prototype, "itemExpandedTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], ListViewComponent.prototype, "items", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], ListViewComponent.prototype, "itemTemplate", void 0);
__decorate([
    Output('onActionSelect'),
    __metadata("design:type", Object)
], ListViewComponent.prototype, "onActionSelect", void 0);
__decorate([
    Output('onCheckBoxChange'),
    __metadata("design:type", Object)
], ListViewComponent.prototype, "onCheckBoxChange", void 0);
__decorate([
    Output('onClick'),
    __metadata("design:type", Object)
], ListViewComponent.prototype, "onClick", void 0);
__decorate([
    Output('onDblClick'),
    __metadata("design:type", Object)
], ListViewComponent.prototype, "onDblClick", void 0);
__decorate([
    Output('onSelect'),
    __metadata("design:type", Object)
], ListViewComponent.prototype, "onSelect", void 0);
__decorate([
    Output('onSelectionChange'),
    __metadata("design:type", Object)
], ListViewComponent.prototype, "onSelectionChange", void 0);
ListViewComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-list-view',
        styles: [require('./list-view.component.css').toString()],
        template: require('./list-view.component.html')
    }),
    __metadata("design:paramtypes", [])
], ListViewComponent);
export { ListViewComponent };
//# sourceMappingURL=list-view.component.js.map