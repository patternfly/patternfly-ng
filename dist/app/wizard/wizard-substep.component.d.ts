import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { WizardStep } from './wizard-step';
import { WizardStepConfig } from './wizard-step-config';
import { WizardStepComponent } from './wizard-step.component';
/**
 * Wizard substep component.
 *
 * Note: This component is expected to be a child of wizard-step.
 */
export declare class WizardSubstepComponent implements OnInit, WizardStep {
    /**
     * The wizard step config containing component properties
     */
    config: WizardStepConfig;
    /**
     * The wizard substep template used for the review details screen
     */
    reviewTemplate: TemplateRef<any>;
    /**
     * The event emitted when this wizard substep is shown
     */
    onShow: EventEmitter<{}>;
    private defaultConfig;
    private prevConfig;
    private _selected;
    private step;
    /**
     * The default constructor
     */
    constructor(step: WizardStepComponent);
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
     * Indicates that this wizard substep is selected
     *
     * @returns {boolean} True if this wizard substep is selected
     */
    /**
    * Sets a flag indicating that this wizard substep is selected
    *
    * @param {boolean} selected True if this wizard substep is selected
    */
    selected: boolean;
    /**
     * Emits an event when this wizard substep is shown
     */
    show(index: number): void;
}
