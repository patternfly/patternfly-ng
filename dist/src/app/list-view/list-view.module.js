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
var empty_state_module_1 = require("../empty-state/empty-state.module");
var list_view_actions_component_1 = require("./list-view-actions.component");
var list_view_component_1 = require("./list-view.component");
var list_view_compound_toggle_component_1 = require("./list-view-compound-toggle.component");
var list_view_config_1 = require("./list-view-config");
exports.ListViewConfig = list_view_config_1.ListViewConfig;
var list_view_event_1 = require("./list-view-event");
exports.ListViewEvent = list_view_event_1.ListViewEvent;
/**
 * A module containing objects associated with list view components
 */
var ListViewModule = (function () {
    function ListViewModule() {
    }
    return ListViewModule;
}());
ListViewModule = __decorate([
    core_1.NgModule({
        imports: [dropdown_1.BsDropdownModule, common_1.CommonModule, empty_state_module_1.EmptyStateModule, forms_1.FormsModule],
        declarations: [list_view_actions_component_1.ListViewActionsComponent, list_view_component_1.ListViewComponent, list_view_compound_toggle_component_1.ListViewCompoundToggleComponent],
        exports: [list_view_actions_component_1.ListViewActionsComponent, list_view_component_1.ListViewComponent, list_view_compound_toggle_component_1.ListViewCompoundToggleComponent],
        providers: [dropdown_1.BsDropdownConfig]
    })
], ListViewModule);
exports.ListViewModule = ListViewModule;
//# sourceMappingURL=list-view.module.js.map