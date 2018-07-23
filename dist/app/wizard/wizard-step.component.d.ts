import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { WizardBase } from './wizard-base';
import { WizardComponent } from './wizard.component';
import { WizardStep } from './wizard-step';
import { WizardStepConfig } from './wizard-step-config';
/**
 * Wizard step component. Each step can stand alone or have substeps.
 *
 * Note: This component is expected to be a child of wizard.
 */
export declare class WizardStepComponent extends WizardBase implements OnInit, WizardStep {
    /**
     * The wizard step config containing component properties
     */
    config: WizardStepConfig;
    /**
     * The wizard step template used for the review details screen
     */
    reviewTemplate: TemplateRef<any>;
    /**
     * The event emitted when this wizard step is shown
     */
    onShow: EventEmitter<{}>;
    private defaultConfig;
    private init;
    private pageIndex;
    private prevConfig;
    private _selected;
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
     * Check if the component config has changed
     */
    ngDoCheck(): void;
    /**
     * Set up default config
     */
    protected setupConfig(): void;
    /**
     * Indicates that this wizard step has substeps
     *
     * @returns {boolean} true if this wizard step has substeps
     */
    readonly hasSubsteps: boolean;
    /**
     * Indicates that the next button is enabled
     *
     * @returns {boolean} true if the next button is enabled
     */
    readonly nextEnabled: boolean;
    /**
     * Indicates that the previous button is enabled
     *
     * @returns {boolean} true if the previous button is enabled
     */
    readonly previousEnabled: boolean;
    /**
     * Indicates that this wizard step is selected
     *
     * @returns {boolean} True if this wizard step is selected
     */
    /**
    * Sets a flag indicating that this wizard step is selected
    *
    * @param {boolean} selected True if this wizard step is selected
    */
    selected: boolean;
    /**
     * Returns the step number to be displayed for the given wizard step or substep
     *
     * @param {WizardStep} step The wizard step or substep
     * @returns {string} The step number to be displayed
     */
    getDisplayNumber(step: WizardStep): string;
    /**
     * Returns only wizard substeps with review templates
     *
     * @returns {WizardStep[]} The wizard stepd or substepd
     */
    getReviewSteps(): WizardStep[];
    /**
     * Navigate to the first wizard substep
     */
    goToFirstStep(): void;
    /**
     * Navigate to the last wizard substep
     */
    goToLastStep(): void;
    /**
     * Navigate to the next wizard step or substep
     */
    goToNextStep(): void;
    /**
     * Navigate to the previous wizard step or substep
     */
    goToPreviousStep(): void;
    /**
     * Called when the next button has been selected.
     *
     * @param {boolean} emitEvent True to emit the wizard's onNext event
     */
    next(emitEvent: boolean): boolean;
    /**
     * Called when the previous button has been selected.
     *
     * @param {boolean} emitEvent True to emit the wizard's onPrevious event
     */
    previous(emitEvent: boolean): boolean;
    /**
     * Emits an event when a wizard step or substep is shown
     */
    show(index: number): void;
    private goTo;
    private isPreviousStepsComplete;
    private stepClick;
}
