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
var remaining_chars_count_directive_1 = require("./remaining-chars-count.directive");
/**
 * A module containing objects associated with the remaining characters directive
 */
var RemainingCharsCountModule = (function () {
    function RemainingCharsCountModule() {
    }
    return RemainingCharsCountModule;
}());
RemainingCharsCountModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule],
        declarations: [remaining_chars_count_directive_1.RemainingCharsCountDirective],
        exports: [remaining_chars_count_directive_1.RemainingCharsCountDirective]
    })
], RemainingCharsCountModule);
exports.RemainingCharsCountModule = RemainingCharsCountModule;
//# sourceMappingURL=remaining-chars-count.module.js.map