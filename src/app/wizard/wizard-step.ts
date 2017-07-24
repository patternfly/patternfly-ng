import {
  TemplateRef
} from '@angular/core';

import { WizardComponent } from './wizard.component';
import { WizardStepConfig } from './wizard-step-config';

/**
 * Wizard step
 */
export interface WizardStep {
  /**
   * The wizard step config containing component properties
   */
  config: WizardStepConfig;

  /**
   * Returns the step number to be displayed for the given wizard step.
   * Not applicable for substeps.
   */
  getDisplayNumber?: Function;

  /**
   * Returns only wizard steps with review templates.
   * Not applicable for substeps.
   */
  getReviewSteps?: Function;

  /**
   * Navigate to the first wizard substep.
   * Not applicable for substeps.
   */
  goToFirst?: Function;

  /**
   * Navigate to the last wizard substep.
   * Not applicable for substeps.
   */
  goToLast?: Function;

  /**
   * Indicates that this wizard step has substeps.
   * Not applicable for substeps.
   */
  hasSubsteps?: boolean;

  /**
   * Navigate to the next wizard step.
   * Not applicable for substeps.
   */
  next?: Function;

  /**
   * Indicates that the next button is enabled when the wizard step is displayed.
   * Not applicable for substeps.
   */
  nextEnabled?: boolean;

  /**
   * Navigate to the previous wizard step or substep.
   * Not applicable for substeps.
   */
  previous?: Function;

  /**
   * Indicates that the previous button is enabled when the wizard step is displayed.
   * Not applicable for substeps.
   */
  previousEnabled?: boolean;

  /**
   * The wizard step template used for the review details screen
   */
  reviewTemplate: TemplateRef<any>;

  /**
   * Indicates that this wizard step or substep is selected
   */
  selected: boolean;

  /**
   * Returns the selected wizard step or substep number.
   * Not applicable for substeps.
   */
  selectedStepNumber?: number;

  /**
   * Emits an event when a wizard step or substep is shown
   */
  show: Function;
}
