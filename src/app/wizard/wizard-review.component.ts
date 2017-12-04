import {
  Component,
  Host,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { WizardComponent } from './wizard.component';
import { WizardStepComponent } from './wizard-step.component';
import { WizardSubstepComponent } from './wizard-substep.component';
import { WizardStep } from './wizard-step';

/**
 * Wizard review component
 *
 * Note: This component is expected to be direct descendant of wizard-step or wizard-substep.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-wizard-review',
  templateUrl: './wizard-review.component.html'
})
export class WizardReviewComponent implements OnInit {
  private wizard: WizardComponent;

  /**
   * The default constructor
   */
  constructor(@Host() wizard: WizardComponent) {
    this.wizard = wizard;
  }

  // Initialization

  /**
   * Setup component configuration upon initialization
   */
  ngOnInit(): void {
  }

  // Methods

  /**
   * Returns only wizard steps with review templates
   *
   * @returns {WizardStep[]} The wizard stepd or substepd
   */
  getReviewSteps(): WizardStep[] {
    return this.wizard.getReviewSteps();
  }

  // Private

  // Returns the step number for the given wizard step and substep
  private getSubstepNumber(step: WizardStepComponent, substep: WizardSubstepComponent) {
    return step.getDisplayNumber(substep);
  }

  // Returns only wizard steps with review templates
  private getReviewSubsteps(step: WizardStepComponent): WizardStep[] {
    return step.getReviewSteps();
  }

  // Toggles the review step control
  private toggleReview(step: WizardStep): void {
    step.config.expandReview = !step.config.expandReview;
  }

  // Toggles the review details control
  private toggleReviewDetails(step: WizardStep): void {
    step.config.expandReviewDetails = !step.config.expandReviewDetails;
  }
}
