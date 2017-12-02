var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';
import { Filter } from './filter';
import { FilterComponent } from './filter.component';
import { FilterConfig } from './filter-config';
import { FilterEvent } from './filter-event';
import { FilterField } from './filter-field';
import { FilterFieldsComponent } from './filter-fields.component';
import { FilterResultsComponent } from './filter-results.component';
import { FilterQuery } from './filter-query';
import { FilterType } from './filter-type';
import { PipeModule } from './../pipe/pipe.module';
export { Filter, FilterConfig, FilterEvent, FilterField, FilterQuery, FilterType };
/**
 * A module containing objects associated with filter components
 */
var FilterModule = /** @class */ (function () {
    function FilterModule() {
    }
    FilterModule = __decorate([
        NgModule({
            imports: [
                BsDropdownModule.forRoot(),
                CommonModule,
                FormsModule,
                PipeModule,
                PopoverModule.forRoot(),
                TooltipModule.forRoot()
            ],
            declarations: [FilterComponent, FilterFieldsComponent, FilterResultsComponent],
            exports: [FilterComponent, FilterFieldsComponent, FilterResultsComponent],
            providers: [BsDropdownConfig, TooltipConfig]
        })
    ], FilterModule);
    return FilterModule;
}());
export { FilterModule };
//# sourceMappingURL=filter.module.js.map