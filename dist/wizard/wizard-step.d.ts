import { TemplateRef } from '@angular/core';
import { WizardStepConfig } from './wizard-step-config';
/**
 * Wizard step
 */
export declare class WizardStep {
    /**
     * The wizard step config containing component properties
     */
    config: WizardStepConfig;
    /**
     * Returns the step number to be displayed for the given wizard step or substep.
     */
    getDisplayNumber?: Function;
    /**
     * Returns only wizard steps with review templates.
     */
    getReviewSteps?: Function;
    /**
     * Navigate to the first wizard substep.
     */
    goToFirstStep?: Function;
    /**
     * Navigate to the last wizard substep.
     */
    goToLastStep?: Function;
    /**
     * Navigate to the next wizard step or substep
     */
    goToNextStep?: Function;
    /**
     * Navigate to the previous wizard step or substep
     */
    goToPreviousStep?: Function;
    /**
     * Indicates that this wizard step has substeps.
     */
    hasSubsteps?: boolean;
    /**
     * Called when the next button has been selected.
     */
    next?: Function;
    /**
     * Indicates that the next button is enabled when the wizard step is displayed.
     */
    nextEnabled?: boolean;
    /**
     * Called when the previous button has been selected.
     */
    previous?: Function;
    /**
     * Indicates that the previous button is enabled when the wizard step is displayed.
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
     * Returns the selected wizard step or substep index.
     */
    selectedStepIndex?: number;
    /**
     * Emits an event when a wizard step or substep is shown
     */
    show: Function;
}
