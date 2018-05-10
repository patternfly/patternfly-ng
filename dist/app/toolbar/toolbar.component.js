var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { cloneDeep, defaults, find, isEqual, remove } from 'lodash';
import { FilterFieldsComponent } from '../filter/filter-fields.component';
import { ToolbarConfig } from './toolbar-config';
/**
 * Toolbar component
 */
var ToolbarComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function ToolbarComponent() {
        /**
         * The event emitted when an action (e.g., button, kebab, etc.) has been selected
         */
        this.onActionSelect = new EventEmitter();
        /**
         * The event emitted when a field menu option is selected
         */
        this.onFilterFieldSelect = new EventEmitter();
        /**
         * The event emitted when a filter has been changed
         */
        this.onFilterChange = new EventEmitter();
        /**
         * The event emitted when a filter has been saved
         */
        this.onFilterSave = new EventEmitter();
        /**
         * The event emitted when the user types ahead in the query input field
         */
        this.onFilterTypeAhead = new EventEmitter();
        /**
         * The event emitted when the sort has changed
         */
        this.onSortChange = new EventEmitter();
        /**
         * The event emitted when a view has been selected
         */
        this.onViewSelect = new EventEmitter();
        this.defaultConfig = {
            disabled: false
        };
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    ToolbarComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    ToolbarComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    ToolbarComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        if (this.config && this.config.filterConfig) {
            this.config.filterConfig.disabled = this.config.disabled;
            if (this.config.filterConfig.appliedFilters === undefined) {
                this.config.filterConfig.appliedFilters = [];
            }
        }
        if (this.config && this.config.sortConfig) {
            this.config.sortConfig.disabled = this.config.disabled;
            if (this.config.sortConfig.fields === undefined) {
                this.config.sortConfig.fields = [];
            }
        }
        if (this.config.sortConfig !== undefined && this.config.sortConfig.visible === undefined) {
            this.config.sortConfig.visible = true;
        }
        if (this.config && this.config.views === undefined) {
            this.config.views = [];
        }
        if (this.config && this.config.view === undefined) {
            this.config.view = this.config.views[0];
        }
        this.prevConfig = cloneDeep(this.config);
    };
    // Actions
    /**
     * Handle clear filter event
     *
     * @param $event An array of current Filter objects
     */
    ToolbarComponent.prototype.clearFilter = function ($event) {
        this.config.filterConfig.appliedFilters = $event;
        this.onFilterChange.emit({
            appliedFilters: $event
        });
    };
    /**
     * Reset current field and value
     */
    ToolbarComponent.prototype.resetFilterField = function () {
        if (this.filterFields !== undefined) {
            this.filterFields.reset();
        }
    };
    // Private
    ToolbarComponent.prototype.filterAdded = function ($event) {
        var newFilter = {
            field: $event.field,
            query: $event.query,
            value: $event.value
        };
        if (!this.filterExists(newFilter)) {
            if (newFilter.field.type === 'select') {
                this.enforceSingleSelect(newFilter);
            }
            this.config.filterConfig.appliedFilters.push(newFilter);
            $event.appliedFilters = this.config.filterConfig.appliedFilters;
            this.onFilterChange.emit($event);
        }
    };
    ToolbarComponent.prototype.filterExists = function (filter) {
        var foundFilter = find(this.config.filterConfig.appliedFilters, {
            field: filter.field,
            query: filter.query,
            value: filter.value
        });
        return foundFilter !== undefined;
    };
    ToolbarComponent.prototype.handleAction = function (action) {
        if (action && action.disabled !== true) {
            this.onActionSelect.emit(action);
        }
    };
    ToolbarComponent.prototype.handleFilterFieldSelect = function ($event) {
        this.onFilterFieldSelect.emit($event);
    };
    ToolbarComponent.prototype.handleFilterSave = function ($event) {
        this.onFilterSave.emit($event);
    };
    ToolbarComponent.prototype.handleFilterTypeAhead = function ($event) {
        this.onFilterTypeAhead.emit($event);
    };
    ToolbarComponent.prototype.sortChange = function ($event) {
        this.onSortChange.emit($event);
    };
    ToolbarComponent.prototype.isViewSelected = function (currentView) {
        return this.config.view && this.config.view.id === currentView.id;
    };
    ToolbarComponent.prototype.viewSelected = function (currentView) {
        this.config.view = currentView;
        if (!currentView.disabled) {
            this.onViewSelect.emit(currentView);
        }
    };
    // Utils
    ToolbarComponent.prototype.enforceSingleSelect = function (filter) {
        remove(this.config.filterConfig.appliedFilters, { title: filter.field.title });
    };
    __decorate([
        Input(),
        __metadata("design:type", ToolbarConfig)
    ], ToolbarComponent.prototype, "config", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], ToolbarComponent.prototype, "actionTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], ToolbarComponent.prototype, "viewTemplate", void 0);
    __decorate([
        Output('onActionSelect'),
        __metadata("design:type", Object)
    ], ToolbarComponent.prototype, "onActionSelect", void 0);
    __decorate([
        Output('onFilterFieldSelect'),
        __metadata("design:type", Object)
    ], ToolbarComponent.prototype, "onFilterFieldSelect", void 0);
    __decorate([
        Output('onFilterChange'),
        __metadata("design:type", Object)
    ], ToolbarComponent.prototype, "onFilterChange", void 0);
    __decorate([
        Output('onFilterSave'),
        __metadata("design:type", Object)
    ], ToolbarComponent.prototype, "onFilterSave", void 0);
    __decorate([
        Output('onFilterTypeAhead'),
        __metadata("design:type", Object)
    ], ToolbarComponent.prototype, "onFilterTypeAhead", void 0);
    __decorate([
        Output('onSortChange'),
        __metadata("design:type", Object)
    ], ToolbarComponent.prototype, "onSortChange", void 0);
    __decorate([
        Output('onViewSelect'),
        __metadata("design:type", Object)
    ], ToolbarComponent.prototype, "onViewSelect", void 0);
    __decorate([
        ViewChild('filterFields'),
        __metadata("design:type", FilterFieldsComponent)
    ], ToolbarComponent.prototype, "filterFields", void 0);
    ToolbarComponent = __decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            selector: 'pfng-toolbar',
            template: "<div class=\"row toolbar-pf\"><div class=\"col-sm-12\"><form class=\"toolbar-pf-actions\" [ngClass]=\"{'no-filter-results': config.filterConfig?.resultsCount === 0 && config.filterConfig?.appliedFilters?.length !== 0}\" (submit)=\"$event.preventDefault()\"><div class=\"form-group toolbar-apf-filter\"><pfng-filter-fields [config]=\"config.filterConfig\" #filterFields (onAdd)=\"filterAdded($event)\" (onFieldSelect)=\"handleFilterFieldSelect($event)\" (onSave)=\"handleFilterSave($event)\" (onTypeAhead)=\"handleFilterTypeAhead($event)\" *ngIf=\"config.filterConfig?.fields\"></pfng-filter-fields></div><div class=\"form-group\" *ngIf=\"config.sortConfig?.fields && config.sortConfig?.visible !== false\"><pfng-sort [config]=\"config.sortConfig\" (onChange)=\"sortChange($event)\"></pfng-sort></div><div class=\"form-group toolbar-actions\" *ngIf=\"config.actionConfig !== undefined || actionTemplate !== undefined\"><pfng-action [config]=\"config.actionConfig\" [template]=\"actionTemplate\" (onActionSelect)=\"handleAction($event)\"></pfng-action></div><div class=\"toolbar-pf-action-right\"><div class=\"form-group toolbar-pf-view-selector\" *ngIf=\"viewTemplate !== undefined || (config.views)\"><ng-template [ngTemplateOutlet]=\"viewTemplate\" [ngTemplateOutletContext]=\"{}\"></ng-template><span *ngIf=\"config.views\"><button *ngFor=\"let view of config.views\" class=\"btn btn-link\" [ngClass]=\"{'active': isViewSelected(view), 'disabled': view.disabled === true}\" title=\"{{view.tooltip}}\" (click)=\"viewSelected(view)\"><i class=\"{{view.iconStyleClass}}\"></i></button></span></div></div></form><pfng-filter-results [config]=\"config.filterConfig\" (onClear)=\"clearFilter($event)\"></pfng-filter-results></div></div>"
        }),
        __metadata("design:paramtypes", [])
    ], ToolbarComponent);
    return ToolbarComponent;
}());
export { ToolbarComponent };
//# sourceMappingURL=toolbar.component.js.map