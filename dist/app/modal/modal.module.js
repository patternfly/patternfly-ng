var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutModalComponent } from './about-modal/about-modal.component';
import { AboutModalConfig } from './about-modal/about-modal-config';
import { AboutModalModule } from './about-modal/about-modal.module';
export { AboutModalConfig };
/**
 * A module containing objects associated with modal components
 *
 * @deprecated Use individual module imports
 *
 * import { AboutModule } from 'patternfly-ng/module';
 */
var ModalModule = /** @class */ (function () {
    function ModalModule() {
    }
    ModalModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                AboutModalModule
            ],
            exports: [AboutModalComponent]
        })
    ], ModalModule);
    return ModalModule;
}());
export { ModalModule };
//# sourceMappingURL=modal.module.js.map