import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';
import { WizardComponent } from './wizard.component';
import { WizardReviewComponent } from './wizard-review.component';
import { WizardStepComponent } from './wizard-step.component';
import { WizardSubstepComponent } from './wizard-substep.component';
/**
 * A module containing objects associated with the wizard component
 */
var WizardModule = /** @class */ (function () {
    function WizardModule() {
    }
    WizardModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        TooltipModule.forRoot()
                    ],
                    declarations: [WizardComponent, WizardReviewComponent, WizardStepComponent, WizardSubstepComponent],
                    exports: [WizardComponent, WizardReviewComponent, WizardStepComponent, WizardSubstepComponent],
                    providers: [TooltipConfig]
                },] },
    ];
    /** @nocollapse */
    WizardModule.ctorParameters = function () { return []; };
    return WizardModule;
}());
export { WizardModule };
//# sourceMappingURL=wizard.module.js.map