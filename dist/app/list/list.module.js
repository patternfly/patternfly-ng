var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ListBase } from './list-base';
import { ListBaseConfig } from './list-base-config';
import { ListEvent } from './list-event';
import { ListComponent } from './basic-list/list.component';
import { ListModule as BasicListModule } from './basic-list/list.module';
import { ListConfig } from './basic-list/list-config';
import { ListExpandToggleComponent } from './basic-list/list-expand-toggle.component';
import { TreeListComponent } from './tree-list/tree-list.component';
import { TreeListConfig } from './tree-list/tree-list-config';
import { TreeListModule } from './tree-list/tree-list.module';
export { ListBase, ListBaseConfig, ListConfig, ListEvent, TreeListConfig };
/**
 * A module containing objects associated with list components
 *
 * @deprecated Use BasicListModule or TreeListModule
 */
var ListModule = /** @class */ (function () {
    function ListModule() {
    }
    ListModule = __decorate([
        NgModule({
            imports: [
                BasicListModule,
                CommonModule,
                FormsModule,
                TreeListModule
            ],
            exports: [ListComponent, ListExpandToggleComponent, TreeListComponent]
        })
    ], ListModule);
    return ListModule;
}());
export { ListModule };
//# sourceMappingURL=list.module.js.map