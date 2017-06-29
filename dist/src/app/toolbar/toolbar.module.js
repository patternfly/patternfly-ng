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
var filter_module_1 = require("../filter/filter.module");
var sort_module_1 = require("../sort/sort.module");
var toolbar_component_1 = require("./toolbar.component");
var toolbar_config_1 = require("./toolbar-config");
exports.ToolbarConfig = toolbar_config_1.ToolbarConfig;
/**
 * A module containing objects associated with the toolbar component
 */
var ToolbarModule = (function () {
    function ToolbarModule() {
    }
    return ToolbarModule;
}());
ToolbarModule = __decorate([
    core_1.NgModule({
        imports: [dropdown_1.BsDropdownModule, common_1.CommonModule, filter_module_1.FilterModule, sort_module_1.SortModule],
        declarations: [toolbar_component_1.ToolbarComponent],
        exports: [toolbar_component_1.ToolbarComponent],
        providers: [dropdown_1.BsDropdownConfig]
    })
], ToolbarModule);
exports.ToolbarModule = ToolbarModule;
//# sourceMappingURL=toolbar.module.js.map