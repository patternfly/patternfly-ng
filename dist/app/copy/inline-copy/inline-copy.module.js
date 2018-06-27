var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';
import { CopyService } from '../copy-service/copy.service';
import { InlineCopyComponent } from './inline-copy.component';
var InlineCopyModule = /** @class */ (function () {
    function InlineCopyModule() {
    }
    InlineCopyModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                TooltipModule.forRoot()
            ],
            declarations: [
                InlineCopyComponent
            ],
            exports: [InlineCopyComponent],
            providers: [CopyService, TooltipConfig]
        })
    ], InlineCopyModule);
    return InlineCopyModule;
}());
export { InlineCopyModule };
//# sourceMappingURL=inline-copy.module.js.map