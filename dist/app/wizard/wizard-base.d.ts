import { WizardStep } from './wizard-step';
/**
 * A base class with common functionality for wizard and wizard-step
 */
export declare abstract class WizardBase {
    private _selectedStep;
    private _steps;
    /**
     * The default constructor
     */
    constructor();
    /**
     * Returns the selected wizard step or substep
     *
     * @returns {WizardStep} The wizard step or substep
     */
    /**
    * Set the selected wizard step or substep for this component
    *
    * @param {WizardStep} step The wizard step or substep
    */
    selectedStep: WizardStep;
    /**
     * Returns the selected wizard step or substep number
     *
     * @returns {number} The step index
     */
    readonly selectedStepIndex: number;
    /**
     * Returns the wizard steps or substeps for this component
     *
     * @returns {WizardStep[]} The wizard steps or substeps
     */
    /**
    * Set the wizard steps or substeps for this component
    *
    * @param {WizardStep[]} steps The wizard steps or substeps
    */
    steps: WizardStep[];
    /**
     * Add a wizard step or substep to this component
     *
     * @param {WizardStep} step The wizard step or substep to add
     */
    addStep(step: WizardStep): void;
    /**
     * Returns only enabled wizard steps
     *
     * @returns {WizardStep[]} The wizard stepd or substepd
     */
    protected getEnabledSteps(): WizardStep[];
    /**
     * Returns the step index for the given wizard step or substep
     *
     * @param {WizardStep} step The wizard step or substep
     * @returns {number} The step number
     */
    getStepIndex(step: WizardStep): number;
    /**
     * Returns the wizard step or substep for the given title
     *
     * @param {string} title The title to find
     * @returns {WizardStep} The wizard step or substep
     */
    protected stepByTitle(title: string): WizardStep;
    /**
     * Returns the index for the given wizard step or substep
     *
     * @param {WizardStep} step The wizard step or substep
     * @returns {number} The wizard step or substep index
     */
    protected stepIndex(step: WizardStep): number;
    /**
     * Unselect all wizard steps and substeps
     */
    protected unselectAll(): void;
}
