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
var dropdown_1 = require("ngx-bootstrap/dropdown");
var sort_component_1 = require("./sort.component");
var sort_config_1 = require("./sort-config");
exports.SortConfig = sort_config_1.SortConfig;
var sort_event_1 = require("./sort-event");
exports.SortEvent = sort_event_1.SortEvent;
var sort_field_1 = require("./sort-field");
exports.SortField = sort_field_1.SortField;
/**
 * A module containing objects associated with the sort component
 */
var SortModule = (function () {
    function SortModule() {
    }
    return SortModule;
}());
SortModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, dropdown_1.BsDropdownModule.forRoot()],
        declarations: [sort_component_1.SortComponent],
        exports: [sort_component_1.SortComponent],
        providers: [dropdown_1.BsDropdownConfig]
    })
], SortModule);
exports.SortModule = SortModule;
//# sourceMappingURL=sort.module.js.map