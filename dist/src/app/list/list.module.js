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
import { EmptyStateModule } from '../empty-state/empty-state.module';
import { ListActionsComponent } from './list-actions.component';
import { ListComponent } from './list.component';
import { ListCompoundToggleComponent } from './list-compound-toggle.component';
import { ListConfig } from './list-config';
import { ListEvent } from './list-event';
export { ListConfig, ListEvent };
/**
 * A module containing objects associated with list components
 */
var ListModule = (function () {
    function ListModule() {
    }
    return ListModule;
}());
ListModule = __decorate([
    NgModule({
        imports: [BsDropdownModule, CommonModule, EmptyStateModule, FormsModule],
        declarations: [ListActionsComponent, ListComponent, ListCompoundToggleComponent],
        exports: [ListActionsComponent, ListComponent, ListCompoundToggleComponent],
        providers: [BsDropdownConfig]
    })
], ListModule);
export { ListModule };
//# sourceMappingURL=list.module.js.map