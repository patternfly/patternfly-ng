import { OnInit } from '@angular/core';
import { WizardComponent } from './wizard.component';
import { WizardStep } from './wizard-step';
/**
 * Wizard review component
 *
 * Note: This component is expected to be direct descendant of wizard-step or wizard-substep.
 */
export declare class WizardReviewComponent implements OnInit {
    private wizard;
    /**
     * The default constructor
     */
    constructor(wizard: WizardComponent);
    /**
     * Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     * Returns only wizard steps with review templates
     *
     * @returns {WizardStep[]} The wizard stepd or substepd
     */
    getReviewSteps(): WizardStep[];
    private getSubstepNumber;
    private getReviewSubsteps;
    private toggleReview;
    private toggleReviewDetails;
}
