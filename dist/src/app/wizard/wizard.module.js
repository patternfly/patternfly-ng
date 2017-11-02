var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';
import { WizardBase } from './wizard-base';
import { WizardComponent } from './wizard.component';
import { WizardConfig } from './wizard-config';
import { WizardEvent } from './wizard-event';
import { WizardReviewComponent } from './wizard-review.component';
import { WizardStepComponent } from './wizard-step.component';
import { WizardStepConfig } from './wizard-step-config';
import { WizardSubstepComponent } from './wizard-substep.component';
export { WizardBase, WizardConfig, WizardEvent, WizardStepConfig };
/**
 * A module containing objects associated with the wizard component
 */
var WizardModule = (function () {
    function WizardModule() {
    }
    return WizardModule;
}());
WizardModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            TooltipModule.forRoot()
        ],
        declarations: [WizardComponent, WizardReviewComponent, WizardStepComponent, WizardSubstepComponent],
        exports: [WizardComponent, WizardReviewComponent, WizardStepComponent, WizardSubstepComponent],
        providers: [TooltipConfig]
    })
], WizardModule);
export { WizardModule };
//# sourceMappingURL=wizard.module.js.map