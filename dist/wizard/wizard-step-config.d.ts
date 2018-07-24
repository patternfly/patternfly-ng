/**
 * A config containing properties for wizard steps and substeps
 */
export declare class WizardStepConfig {
    /**
     * Indicates that the user can click on numeric step indicators to navigate directly to a step
     */
    allowClickNav?: boolean;
    /**
     * Indicates that the user may navigate away from this wizard step or substep
     */
    allowNavAway?: boolean;
    /**
     * Indicates that this step has been completed
     */
    completed?: boolean;
    /**
     * The wizard step or substep description
     */
    description?: string;
    /**
     * Indicates that the wizard is disabled
     */
    disabled?: boolean;
    /**
     * Indicates whether review information should be expanded by default when the review step is reached
     */
    expandReview?: boolean;
    /**
     * Indicators whether review details information should be expanded by default when the review step is reached
     */
    expandReviewDetails?: boolean;
    /**
     *  The wizard step or substep identifier
     */
    id?: string;
    /**
     * Indicates that the next button is enabled when the wizard step or substep is displayed
     */
    nextEnabled?: boolean;
    /**
     * The text to display as a tooltip for the next button when the wizard step is displayed.
     *
     * Not applicable for the wizard-substep component.
     */
    nextTooltip?: string;
    /**
     * Indicates that the previous button is enabled when the wizard step or substep is displayed
     */
    previousEnabled?: boolean;
    /**
     * The text to display as a tooltip for the previous button when the wizard step is displayed
     *
     * Not applicable for the wizard-substep component.
     */
    previousTooltip?: string;
    /**
     * Indicates the priority of this wizard step or substep relative to other wizard steps. Steps are expected to be
     * numbered sequentially in the order they should be viewed.
     */
    priority?: number;
    /**
     * The title for the wizard step or substep to be displayed in the header and review page
     */
    title: string;
}
