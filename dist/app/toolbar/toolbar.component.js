import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { cloneDeep, defaults, find, isEqual, remove } from 'lodash';
/**
 * Toolbar component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { ToolbarModule } from 'patternfly-ng/toolbar';
 * // Or
 * import { ToolbarModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [BsDropdownModule.forRoot(), ToolbarModule,...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { ToolbarConfig, ToolbarView } from 'patternfly-ng/toolbar';
 * </pre></code>
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
        var filterField = { title: filter.field.title };
        remove(this.config.filterConfig.appliedFilters, { field: filterField });
    };
    ToolbarComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-toolbar',
                    template: "<div class=\"row toolbar-pf\"><div class=\"col-sm-12\"><form class=\"toolbar-pf-actions\" [ngClass]=\"{'no-filter-results': config.filterConfig?.resultsCount === 0 && config.filterConfig?.appliedFilters?.length !== 0}\" (submit)=\"$event.preventDefault()\"><div class=\"form-group toolbar-apf-filter\"><pfng-filter-fields [config]=\"config.filterConfig\" #filterFields (onAdd)=\"filterAdded($event)\" (onFieldSelect)=\"handleFilterFieldSelect($event)\" (onSave)=\"handleFilterSave($event)\" (onTypeAhead)=\"handleFilterTypeAhead($event)\" *ngIf=\"config.filterConfig?.fields\"></pfng-filter-fields></div><div class=\"form-group\" *ngIf=\"config.sortConfig?.fields && config.sortConfig?.visible !== false\"><pfng-sort [config]=\"config.sortConfig\" (onChange)=\"sortChange($event)\"></pfng-sort></div><div class=\"form-group toolbar-actions\" *ngIf=\"config.actionConfig !== undefined || actionTemplate !== undefined\"><pfng-action [config]=\"config.actionConfig\" [template]=\"actionTemplate\" (onActionSelect)=\"handleAction($event)\"></pfng-action></div><div class=\"toolbar-pf-action-right\"><div class=\"form-group toolbar-pf-view-selector\" *ngIf=\"viewTemplate !== undefined || (config.views)\"><ng-template [ngTemplateOutlet]=\"viewTemplate\" [ngTemplateOutletContext]=\"{}\"></ng-template><span *ngIf=\"config.views\"><button *ngFor=\"let view of config.views\" class=\"btn btn-link\" [ngClass]=\"{'active': isViewSelected(view), 'disabled': view.disabled === true}\" [attr.aria-label]=\"view.ariaLabel || view.tooltip\" title=\"{{view.tooltip}}\" (click)=\"viewSelected(view)\"><i class=\"{{view.iconStyleClass}}\"></i></button></span></div></div></form><pfng-filter-results [config]=\"config.filterConfig\" (onClear)=\"clearFilter($event)\"></pfng-filter-results></div></div>"
                },] },
    ];
    /** @nocollapse */
    ToolbarComponent.ctorParameters = function () { return []; };
    ToolbarComponent.propDecorators = {
        'config': [{ type: Input },],
        'actionTemplate': [{ type: Input },],
        'viewTemplate': [{ type: Input },],
        'onActionSelect': [{ type: Output, args: ['onActionSelect',] },],
        'onFilterFieldSelect': [{ type: Output, args: ['onFilterFieldSelect',] },],
        'onFilterChange': [{ type: Output, args: ['onFilterChange',] },],
        'onFilterSave': [{ type: Output, args: ['onFilterSave',] },],
        'onFilterTypeAhead': [{ type: Output, args: ['onFilterTypeAhead',] },],
        'onSortChange': [{ type: Output, args: ['onSortChange',] },],
        'onViewSelect': [{ type: Output, args: ['onViewSelect',] },],
        'filterFields': [{ type: ViewChild, args: ['filterFields',] },],
    };
    return ToolbarComponent;
}());
export { ToolbarComponent };
//# sourceMappingURL=toolbar.component.js.map