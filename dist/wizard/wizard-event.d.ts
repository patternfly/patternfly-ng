import { WizardStep } from './wizard-step';
/**
 * An object containing properties for wizard events
 */
export declare class WizardEvent {
    /**
     * The order of the wizard step of substep
     */
    index?: number;
    /**
     * The current wizard step or substep
     */
    step: WizardStep;
}
