import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { WizardBase } from './wizard-base';
import { WizardConfig } from './wizard-config';
import { WizardEvent } from './wizard-event';
import { WizardReviewComponent } from './wizard-review.component';
import { WizardStep } from './wizard-step';
import { WizardStepConfig } from './wizard-step-config';
import { WizardStepComponent } from './wizard-step.component';
import { WizardSubstepComponent } from './wizard-substep.component';
import { WizardComponent } from './wizard.component';

export { WizardBase, WizardConfig, WizardEvent, WizardStep, WizardStepConfig };

/**
 * A module containing objects associated with the wizard component
 */
@NgModule({
  imports: [CommonModule, TooltipModule.forRoot()],
  declarations: [WizardComponent, WizardReviewComponent, WizardStepComponent, WizardSubstepComponent],
  exports: [WizardComponent, WizardReviewComponent, WizardStepComponent, WizardSubstepComponent],
  providers: [TooltipConfig]
})
export class WizardModule {}
