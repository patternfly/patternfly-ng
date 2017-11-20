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
import { TreeModule } from 'angular-tree-component';
import { EmptyStateModule } from '../empty-state/empty-state.module';
import { ListBase } from './list-base';
import { ListBaseConfig } from './list-base-config';
import { ListEvent } from './list-event';
import { ListComponent } from './basic-list/list.component';
import { ListConfig } from './basic-list/list-config';
import { ListExpandToggleComponent } from './basic-list/list-expand-toggle.component';
import { TreeListComponent } from './tree-list/tree-list.component';
import { TreeListConfig } from './tree-list/tree-list-config';
export { ListBase, ListBaseConfig, ListConfig, ListEvent, TreeListConfig };
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
        imports: [
            BsDropdownModule.forRoot(),
            CommonModule,
            EmptyStateModule,
            FormsModule,
            TreeModule
        ],
        declarations: [ListComponent, ListExpandToggleComponent, TreeListComponent],
        exports: [ListComponent, ListExpandToggleComponent, TreeListComponent],
        providers: [BsDropdownConfig]
    })
], ListModule);
export { ListModule };
//# sourceMappingURL=list.module.js.map