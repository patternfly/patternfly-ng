"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var toolbar_config_1 = require("./toolbar-config");
/**
 * Standard toolbar component. Includes filtering and view selection capabilities
 */
var ToolbarComponent = (function () {
    function ToolbarComponent() {
        this.onActionSelect = new core_1.EventEmitter();
        this.onFilterFiledSelect = new core_1.EventEmitter();
        this.onFilterChange = new core_1.EventEmitter();
        this.onFilterTypeAhead = new core_1.EventEmitter();
        this.onSortChange = new core_1.EventEmitter();
        this.onViewSelect = new core_1.EventEmitter();
        this.defaultConfig = {};
    }
    // Initialization
    ToolbarComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    ToolbarComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!_.isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    ToolbarComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            _.defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = _.cloneDeep(this.defaultConfig);
        }
        if (this.config && this.config.filterConfig
            && this.config.filterConfig.appliedFilters === undefined) {
            this.config.filterConfig.appliedFilters = [];
        }
        if (this.config && this.config.sortConfig && this.config.sortConfig.fields === undefined) {
            this.config.sortConfig.fields = [];
        }
        if (this.config.sortConfig !== undefined && this.config.sortConfig.show === undefined) {
            this.config.sortConfig.show = true;
        }
        if (this.config && this.config.viewsConfig && this.config.viewsConfig.views === undefined) {
            this.config.viewsConfig.views = [];
        }
        if (this.config && this.config.viewsConfig
            && this.config.viewsConfig.currentView === undefined) {
            this.config.viewsConfig.currentView = this.config.viewsConfig.views[0];
        }
    };
    // Action functions
    ToolbarComponent.prototype.handleAction = function (action) {
        if (action && action.disabled !== true) {
            this.onActionSelect.emit(action);
        }
    };
    // Filter functions
    ToolbarComponent.prototype.clearFilter = function ($event) {
        this.config.filterConfig.appliedFilters = $event;
        this.onFilterChange.emit({
            appliedFilters: $event
        });
    };
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
        var foundFilter = _.find(this.config.filterConfig.appliedFilters, {
            field: filter.field,
            query: filter.query,
            value: filter.value
        });
        return foundFilter !== undefined;
    };
    ToolbarComponent.prototype.handleFilterFieldSelect = function ($event) {
        this.onFilterFiledSelect.emit($event);
    };
    ToolbarComponent.prototype.handleFilterTypeAhead = function ($event) {
        this.onFilterTypeAhead.emit($event);
    };
    // Sort functions
    ToolbarComponent.prototype.sortChange = function ($event) {
        this.onSortChange.emit($event);
    };
    // View functions
    ToolbarComponent.prototype.isViewSelected = function (view) {
        return this.config.viewsConfig && (this.config.viewsConfig.currentView.id === view.id);
    };
    ToolbarComponent.prototype.submit = function ($event) {
        $event.preventDefault();
    };
    ToolbarComponent.prototype.viewSelected = function (view) {
        this.config.viewsConfig.currentView = view;
        if (!view.disabled) {
            this.onViewSelect.emit(view);
        }
    };
    // Private
    ToolbarComponent.prototype.enforceSingleSelect = function (filter) {
        _.remove(this.config.filterConfig.appliedFilters, { title: filter.field.title });
    };
    return ToolbarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", toolbar_config_1.ToolbarConfig)
], ToolbarComponent.prototype, "config", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], ToolbarComponent.prototype, "actionsTemplate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], ToolbarComponent.prototype, "viewsTemplate", void 0);
__decorate([
    core_1.Output('onActionSelect'),
    __metadata("design:type", Object)
], ToolbarComponent.prototype, "onActionSelect", void 0);
__decorate([
    core_1.Output('onFilterFieldSelect'),
    __metadata("design:type", Object)
], ToolbarComponent.prototype, "onFilterFiledSelect", void 0);
__decorate([
    core_1.Output('onFilterChange'),
    __metadata("design:type", Object)
], ToolbarComponent.prototype, "onFilterChange", void 0);
__decorate([
    core_1.Output('onFilterTypeAhead'),
    __metadata("design:type", Object)
], ToolbarComponent.prototype, "onFilterTypeAhead", void 0);
__decorate([
    core_1.Output('onSortChange'),
    __metadata("design:type", Object)
], ToolbarComponent.prototype, "onSortChange", void 0);
__decorate([
    core_1.Output('onViewSelect'),
    __metadata("design:type", Object)
], ToolbarComponent.prototype, "onViewSelect", void 0);
ToolbarComponent = __decorate([
    core_1.Component({
        encapsulation: core_1.ViewEncapsulation.None,
        selector: 'pfng-toolbar',
        styles: [require('./toolbar.component.css').toString()],
        template: require('./toolbar.component.html')
    }),
    __metadata("design:paramtypes", [])
], ToolbarComponent);
exports.ToolbarComponent = ToolbarComponent;
//# sourceMappingURL=toolbar.component.js.map