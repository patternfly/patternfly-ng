import { WizardStep } from './wizard-step';

import { find } from 'lodash';

/**
 * A base class with common functionality for wizard and wizard-step
 */
export class WizardBase {
  private _selectedStep: WizardStep;
  private _steps: WizardStep[] = [];

  /**
   * The default constructor
   */
  constructor() {}

  // Accessors

  /**
   * Returns the selected wizard step or substep
   *
   * @returns {WizardStep} The wizard step or substep
   */
  get selectedStep(): WizardStep {
    return this._selectedStep;
  }

  /**
   * Returns the selected wizard step or substep number
   *
   * @returns {number} The step number
   */
  get selectedStepNumber(): number {
    // Retrieve selected step number
    return this.stepIdx(this.selectedStep) + 1;
  }

  /**
   * Set the selected wizard step or substep for this component
   *
   * @param {WizardStep} step The wizard step or substep
   */
  set selectedStep(step: WizardStep) {
    this._selectedStep = step;
  }

  /**
   * Returns the wizard steps or substeps for this component
   *
   * @returns {WizardStep[]} The wizard steps or substeps
   */
  get steps(): WizardStep[] {
    return this._steps;
  }

  /**
   * Set the wizard steps or substeps for this component
   *
   * @param {WizardStep[]} steps The wizard steps or substeps
   */
  set steps(steps: WizardStep[]) {
    this._steps = steps;
  }

  // Methods

  /**
   * Add a wizard step or substep to this component
   *
   * @param {WizardStep} step The wizard step or substep to add
   */
  addStep(step: WizardStep): void {
    // Insert the step into step array
    let insertBefore = find(this.steps, (nextStep) => {
      return nextStep.config.priority > step.config.priority;
    });
    if (insertBefore) {
      this.steps.splice(this.steps.indexOf(insertBefore), 0, step);
    } else {
      this.steps.push(step);
    }
  }

  /**
   * Returns only enabled wizard steps
   *
   * @returns {WizardStep[]} The wizard stepd or substepd
   */
  protected getEnabledSteps(): WizardStep[] {
    return this.steps.filter((step: WizardStep) => {
      return (step.config.disabled !== true);
    });
  }

  /**
   * Returns the step number for the given wizard step or substep
   *
   * @param {WizardStep} step The wizard step or substep
   * @returns {number} The step number
   */
  getStepNumber(step: WizardStep): number {
    return this.stepIdx(step) + 1;
  }

  /**
   * Returns the wizard step or substep for the given title
   *
   * @param {string} title The title to find
   * @returns {WizardStep} The wizard step or substep
   */
  protected stepByTitle(title: string): WizardStep {
    let foundStep;
    this.getEnabledSteps().forEach((step: WizardStep) => {
      if (step.config.title === title) {
        foundStep = step;
      }
    });
    return foundStep;
  }

  /**
   * Returns the order number for the given wizard step or substep
   *
   * @param {WizardStep} step The wizard step or substep
   * @returns {number} The wizard step or substep order number
   */
  protected stepIdx(step: WizardStep): number {
    let idx = 0;
    let res = -1;
    this.getEnabledSteps().forEach((currStep) => {
      if (currStep === step) {
        res = idx;
      }
      idx++;
    });
    return res;
  }

  /**
   * Unselect all wizard steps and substeps
   */
  protected unselectAll(): void {
    // Traverse steps array and set each "selected" property to false
    this.getEnabledSteps().forEach((step: WizardStep) => {
      step.selected = false;
    });
    // Set selectedStep variable to null
    this.selectedStep = null;
  }
}
