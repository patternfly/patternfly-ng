"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var search_highlight_module_1 = require("./../search-highlight/search-highlight.module");
var filter_1 = require("./filter");
exports.Filter = filter_1.Filter;
var filter_component_1 = require("./filter.component");
var filter_config_1 = require("./filter-config");
exports.FilterConfig = filter_config_1.FilterConfig;
var filter_event_1 = require("./filter-event");
exports.FilterEvent = filter_event_1.FilterEvent;
var filter_field_1 = require("./filter-field");
exports.FilterField = filter_field_1.FilterField;
var filter_fields_component_1 = require("./filter-fields.component");
var filter_results_component_1 = require("./filter-results.component");
var filter_query_1 = require("./filter-query");
exports.FilterQuery = filter_query_1.FilterQuery;
var FilterModule = (function () {
    function FilterModule() {
    }
    return FilterModule;
}());
FilterModule = __decorate([
    core_1.NgModule({
        imports: [
            dropdown_1.BsDropdownModule.forRoot(),
            common_1.CommonModule,
            forms_1.FormsModule,
            tooltip_1.TooltipModule.forRoot(),
            search_highlight_module_1.SearchHighlightModule
        ],
        declarations: [filter_component_1.FilterComponent, filter_fields_component_1.FilterFieldsComponent, filter_results_component_1.FilterResultsComponent],
        exports: [filter_component_1.FilterComponent, filter_fields_component_1.FilterFieldsComponent, filter_results_component_1.FilterResultsComponent],
        providers: [dropdown_1.BsDropdownConfig, tooltip_1.TooltipConfig]
    })
], FilterModule);
exports.FilterModule = FilterModule;
//# sourceMappingURL=filter.module.js.map