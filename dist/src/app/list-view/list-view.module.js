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
import { ListViewActionsComponent } from './list-view-actions.component';
import { ListViewComponent } from './list-view.component';
import { ListViewCompoundToggleComponent } from './list-view-compound-toggle.component';
import { ListViewConfig } from './list-view-config';
import { ListViewEvent } from './list-view-event';
export { ListViewConfig, ListViewEvent };
/**
 * A module containing objects associated with list view components
 */
var ListViewModule = (function () {
    function ListViewModule() {
    }
    return ListViewModule;
}());
ListViewModule = __decorate([
    NgModule({
        imports: [BsDropdownModule, CommonModule, EmptyStateModule, FormsModule],
        declarations: [ListViewActionsComponent, ListViewComponent, ListViewCompoundToggleComponent],
        exports: [ListViewActionsComponent, ListViewComponent, ListViewCompoundToggleComponent],
        providers: [BsDropdownConfig]
    })
], ListViewModule);
export { ListViewModule };
//# sourceMappingURL=list-view.module.js.map