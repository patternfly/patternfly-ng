var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationConfig } from './pagination-config';
import { PaginationComponent } from './pagination.component';
import { PaginationEvent } from './pagination-event';
export { PaginationConfig, PaginationEvent };
/**
 * A module containing objects associated with notification components
 */
var PaginationModule = (function () {
    function PaginationModule() {
    }
    return PaginationModule;
}());
PaginationModule = __decorate([
    NgModule({
        imports: [BsDropdownModule.forRoot(),
            CommonModule,
            FormsModule],
        declarations: [PaginationComponent],
        exports: [PaginationComponent],
        providers: [BsDropdownConfig]
    })
], PaginationModule);
export { PaginationModule };
//# sourceMappingURL=pagination.module.js.map