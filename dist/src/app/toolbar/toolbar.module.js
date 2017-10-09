var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ActionModule } from '../action/action.module';
import { FilterModule } from '../filter/filter.module';
import { SortModule } from '../sort/sort.module';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarConfig } from './toolbar-config';
export { ToolbarConfig };
/**
 * A module containing objects associated with the toolbar component
 */
var ToolbarModule = (function () {
    function ToolbarModule() {
    }
    return ToolbarModule;
}());
ToolbarModule = __decorate([
    NgModule({
        imports: [
            ActionModule,
            BsDropdownModule.forRoot(),
            CommonModule,
            FilterModule,
            SortModule
        ],
        declarations: [ToolbarComponent],
        exports: [ToolbarComponent],
        providers: [BsDropdownConfig]
    })
], ToolbarModule);
export { ToolbarModule };
//# sourceMappingURL=toolbar.module.js.map