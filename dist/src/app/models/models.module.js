"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var action_1 = require("./action");
exports.Action = action_1.Action;
var action_config_1 = require("./action-config");
exports.ActionConfig = action_config_1.ActionConfig;
var view_1 = require("./view");
exports.View = view_1.View;
var view_config_1 = require("./view-config");
exports.ViewConfig = view_config_1.ViewConfig;
var ModelsModule = (function () {
    function ModelsModule() {
    }
    return ModelsModule;
}());
ModelsModule = __decorate([
    core_1.NgModule({
        imports: [],
        declarations: [],
        exports: []
    })
], ModelsModule);
exports.ModelsModule = ModelsModule;
//# sourceMappingURL=models.module.js.map