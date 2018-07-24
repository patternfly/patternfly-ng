import { DoCheck, EventEmitter, OnInit } from '@angular/core';
import { WizardBase } from './wizard-base';
import { WizardConfig } from './wizard-config';
import { WizardStep } from './wizard-step';
/**
 * Wizard component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { WizardModule } from 'patternfly-ng/wizard';
 * // Or
 * import { WizardModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { ModalModule } from 'ngx-bootstrap/modal';
 *
 * &#64;NgModule({
 *   imports: [ModalModule.forRoot(), WizardModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { WizardConfig, WizardEvent, WizardStep, WizardStepConfig } from 'patternfly-ng/wizard';
 * </pre></code>
 */
export declare class WizardComponent extends WizardBase implements DoCheck, OnInit {
    /**
     * The wizard config containing component properties
     */
    config: WizardConfig;
    /**
     * The event emitted when the cancel button has been selected
     */
    onCancel: EventEmitter<{}>;
    /**
     * The event emitted when all wizard steps and substeps have finished
     */
    onFinish: EventEmitter<{}>;
    /**
     * The event emitted when the next button has been selected
     */
    onNext: EventEmitter<{}>;
    /**
     * The event emitted when the back button has been selected
     */
    onPrevious: EventEmitter<{}>;
    /**
     * The event emitted when a step has changed
     */
    onStepChange: EventEmitter<{}>;
    private contentStyle;
    private defaultConfig;
    private init;
    private _firstStep;
    private prevConfig;
    /**
     * The default constructor
     */
    constructor();
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
     * Indicates that the selected step is also the first wizard step or substep
     *
     * @returns {boolean} True if the selected step is the first wizard step or substep
     */
    /**
    * Set a flag indicating that the selected step is also the first wizard step or substep
    *
    * @param {boolean} firstStep True if the selected step is the first wizard step or substep
    */
    firstStep: boolean;
    /**
     * Add a wizard step or substep to this component
     *
     * @param {WizardStep} step The wizard step or substep
     */
    addStep(step: WizardStep): void;
    /**
     * Returns only wizard steps with review templates
     *
     * @returns {WizardStep[]} The wizard stepd or substepd
     */
    getReviewSteps(): WizardStep[];
    /**
     * Navigate to the next wizard step or substep
     */
    goToNextStep(): void;
    /**
     * Navigate to the previous wizard step or substep
     */
    goToPreviousStep(): void;
    /**
     * Navigate to the given wizard step index
     *
     * @param {number} stepIndex The step number to navigate to
     * @param {boolean} resetStepNav True if the first substep (if exists) should be selected
     */
    goToStep(stepIndex: number, resetStepNav: boolean): void;
    /**
     * Called when the next button has been selected.
     *
     * @param {boolean} emitEvent True to emit the onNext event
     */
    next(emitEvent: boolean): void;
    /**
     * Called when the previous button has been selected.
     *
     * @param {boolean} emitEvent True to emit the onNext event
     */
    previous(emitEvent: boolean): void;
    /**
     * Emits an event when the wizard step or substep has changed
     *
     * @param {WizardStep} step The wizard step or substep
     * @param {number} index The order of the wizard step of substep within its parent
     */
    stepChanged(step: WizardStep, index: number): void;
    /**
     * Set a flag indicating that the selected step is also the first wizard step or substep
     *
     * @param {number} stepIndex The step index
     */
    updateStepIndex(stepIndex: number): void;
    private allowStepIndicatorClick;
    private cancel;
    private finish;
    private goTo;
    private initFirstStep;
    private reset;
    private stepClick;
}
