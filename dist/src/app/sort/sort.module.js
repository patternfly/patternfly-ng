var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SortComponent } from './sort.component';
import { SortConfig } from './sort-config';
import { SortEvent } from './sort-event';
import { SortField } from './sort-field';
export { SortConfig, SortEvent, SortField };
/**
 * A module containing objects associated with the sort component
 */
var SortModule = (function () {
    function SortModule() {
    }
    return SortModule;
}());
SortModule = __decorate([
    NgModule({
        imports: [CommonModule, BsDropdownModule.forRoot()],
        declarations: [SortComponent],
        exports: [SortComponent],
        providers: [BsDropdownConfig]
    })
], SortModule);
export { SortModule };
//# sourceMappingURL=sort.module.js.map