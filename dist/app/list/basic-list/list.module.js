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
import { ListComponent } from './list.component';
import { ListConfig } from './list-config';
import { ListExpandToggleComponent } from './list-expand-toggle.component';
import { PipeModule } from '../../pipe/pipe.module';
export { ListConfig, ListExpandToggleComponent };
/**
 * A module containing objects associated with basic list components
 */
var ListModule = /** @class */ (function () {
    function ListModule() {
    }
    ListModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                EmptyStateModule,
                FormsModule,
                PipeModule
            ],
            declarations: [ListComponent, ListExpandToggleComponent],
            exports: [ListComponent, ListExpandToggleComponent]
        })
    ], ListModule);
    return ListModule;
}());
export { ListModule };
//# sourceMappingURL=list.module.js.map