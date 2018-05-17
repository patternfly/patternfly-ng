var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { EmptyStateModule } from '../../empty-state/empty-state.module';
import { TreeListComponent } from './tree-list.component';
import { TreeListConfig } from './tree-list-config';
import { TreeModule } from 'angular-tree-component';
export { TreeListConfig };
/**
 * A module containing objects associated with tree list components
 */
var TreeListModule = /** @class */ (function () {
    function TreeListModule() {
    }
    TreeListModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                EmptyStateModule,
                FormsModule,
                TreeModule
            ],
            declarations: [TreeListComponent],
            exports: [TreeListComponent]
        })
    ], TreeListModule);
    return TreeListModule;
}());
export { TreeListModule };
//# sourceMappingURL=tree-list.module.js.map