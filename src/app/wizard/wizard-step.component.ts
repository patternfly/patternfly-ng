import {
  Component,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { cloneDeep, defaults, isEqual } from 'lodash';

import { WizardBase } from './wizard-base';
import { WizardComponent } from './wizard.component';
import { WizardEvent } from './wizard-event';
import { WizardStep } from './wizard-step';
import { WizardStepConfig } from './wizard-step-config';

/**
 * Wizard step component. Each step can stand alone or have substeps.
 *
 * Note: This component is expected to be a child of wizard.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-wizard-step',
  styleUrls: ['./wizard-step.component.less'],
  templateUrl: './wizard-step.component.html'
})
export class WizardStepComponent extends WizardBase implements OnInit, WizardStep {
  /**
   * The wizard step config containing component properties
   */
  @Input() config: WizardStepConfig;

  /**
   * The wizard step template used for the review details screen
   */
  @Input() reviewTemplate: TemplateRef<any>;

  /**
   * The event emitted when this wizard step is shown
   */
  @Output('onShow') onShow = new EventEmitter();

  private defaultConfig = {
    allowClickNav: true,
    allowNavAway: true,
    completed: false,
    disabled: false,
    expandReview: true,
    expandReviewDetails: false,
    nextEnabled: true,
    previousEnabled: true,
    priority: 999,
    title: ''
  } as WizardStepConfig;
  private init: boolean = true;
  private pageIndex: number = 0;
  private prevConfig: WizardStepConfig;
  private _selected: boolean = false;
  private wizard: WizardComponent;

  /**
   * The default constructor
   */
  constructor(@Host() wizard: WizardComponent) {
    super();
    this.wizard = wizard;
  }

  // Initialization

  /**
   *  Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.setupConfig();
    if (this.wizard !== undefined && this.selectedStep === undefined) {
      this.wizard.addStep(this);
    }
  }

  /**
   *  Check if the component config has changed
   */
  ngDoCheck(): void {
    // Do a deep compare on config
    if (!isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
    }
    if (this.wizard !== undefined) {
      this.pageIndex = this.wizard.getStepIndex(this);
    }
  }

  /**
   * Set up default config
   */
  protected setupConfig(): void {
    if (this.config !== undefined) {
      defaults(this.config, this.defaultConfig);
    } else {
      this.config = cloneDeep(this.defaultConfig);
    }
    this.prevConfig = cloneDeep(this.config);
  }

  // Accessors

  /**
   * Indicates that this wizard step has substeps
   *
   * @returns {boolean} true if this wizard step has substeps
   */
  get hasSubsteps() {
    return this.steps.length > 0;
  }

  /**
   * Indicates that the next button is enabled
   *
   * @returns {boolean} true if the next button is enabled
   */
  get nextEnabled() {
    let enabled = this.config.nextEnabled;
    if (this.hasSubsteps) {
      let selectedSubstep = this.getEnabledSteps().filter(step => step.selected);
      if (selectedSubstep && selectedSubstep.length > 0) {
        enabled = selectedSubstep[0].config.nextEnabled;
      }
    }
    return enabled;
  }

  /**
   * Indicates that the previous button is enabled
   *
   * @returns {boolean} true if the previous button is enabled
   */
  get previousEnabled() {
    let enabled = this.config.previousEnabled;
    if (this.hasSubsteps) {
      let selectedSubstep = this.getEnabledSteps().filter(step => step.selected);
      if (selectedSubstep && selectedSubstep.length > 0) {
        enabled = selectedSubstep[0].config.previousEnabled;
      }
    }
    return enabled;
  }

  /**
   * Indicates that this wizard step is selected
   *
   * @returns {boolean} True if this wizard step is selected
   */
  get selected() {
    return this._selected;
  }

  /**
   * Sets a flag indicating that this wizard step is selected
   *
   * @param {boolean} selected True if this wizard step is selected
   */
  set selected(selected: boolean) {
    this._selected = selected;
  }

  // Methods

  /**
   * Returns the step number to be displayed for the given wizard step or substep
   *
   * @param {WizardStep} step The wizard step or substep
   * @returns {string} The step number to be displayed
   */
  getDisplayNumber(step: WizardStep): string {
    return this.pageIndex + String.fromCharCode(65 + this.stepIndex(step)) + '.';
  }

  /**
   * Returns only wizard substeps with review templates
   *
   * @returns {WizardStep[]} The wizard stepd or substepd
   */
  getReviewSteps(): WizardStep[] {
    let reviewSteps = this.getEnabledSteps().filter((step: WizardStep) => {
      return (step.reviewTemplate !== undefined);
    });
    return reviewSteps;
  }

  /**
   * Navigate to the first wizard substep
   */
  goToFirstStep(): void {
    this.goTo(this.getEnabledSteps()[0]);
  }

  /**
   * Navigate to the last wizard substep
   */
  goToLastStep(): void {
    let enabledSteps = this.getEnabledSteps();
    this.goTo(enabledSteps[enabledSteps.length - 1]);
  }

  /**
   * Navigate to the next wizard step or substep
   */
  goToNextStep(): void {
    this.next(false);
  }

  /**
   * Navigate to the previous wizard step or substep
   */
  goToPreviousStep(): void {
    this.previous(false);
  }

  /**
   * Called when the next button has been selected.
   *
   * @param {boolean} emitEvent True to emit the wizard's onNext event
   */
  next(emitEvent: boolean): boolean {
    let enabledSteps: WizardStep[] = this.getEnabledSteps();

    // Save the step you were on when next() was invoked
    let index = this.stepIndex(this.selectedStep);

    let wizEvent = {
      index: index,
      step: this.selectedStep
    } as WizardEvent;

    if (emitEvent !== false) {
      this.wizard.onNext.emit(wizEvent);
    }

    // Set completed property, which may be used to add/remove a style class from progress bar
    this.selectedStep.config.completed = true;

    // Ensure this is not the last step.
    if (index === enabledSteps.length - 1) {
      return false;
    }
    this.goTo(enabledSteps[index + 1]);
    return true;
  }

  /**
   * Called when the previous button has been selected.
   *
   * @param {boolean} emitEvent True to emit the wizard's onPrevious event
   */
  previous(emitEvent: boolean): boolean {
    let index = this.stepIndex(this.selectedStep);
    let wizEvent = {
      index: index,
      step: this.selectedStep
    } as WizardEvent;

    if (emitEvent !== false) {
      this.wizard.onPrevious.emit(wizEvent);
    }

    // Ensure this is not the first step
    if (index === 0) {
      return false;
    }
    this.goTo(this.getEnabledSteps()[index - 1]);
    return true;
  }

  /**
   * Emits an event when a wizard step or substep is shown
   */
  show(index: number) {
    this.onShow.emit({
      index: index,
      step: this
    } as WizardEvent);
  }

  // Private

  // Navigate to the given wizard substep
  private goTo(step: WizardStep): void {
    if (step === undefined || this.wizard === undefined || this.wizard.config.done
        || (!this.init && this.selectedStep !== undefined && !this.selectedStep.config.allowNavAway)) {
      return;
    }
    if (this.init || this.isPreviousStepsComplete(step)
        || (this.getStepIndex(step) < this.selectedStepIndex && this.selectedStep.config.previousEnabled)) {
      this.unselectAll();
      this.selectedStep = step;
      step.selected = true;
      step.show(this.stepIndex(step));
      this.wizard.stepChanged(step, this.stepIndex(step));
      this.wizard.updateStepIndex(this.stepIndex(this.selectedStep));
      this.init = false;
    }
  }

  // Indicates all previous substeps are complete for this wizard step
  private isPreviousStepsComplete(nextStep: WizardStep): boolean {
    let nextIdx = this.stepIndex(nextStep);
    let complete = true;
    this.getEnabledSteps().forEach((step: WizardStep, stepIndex) => {
      if (stepIndex < nextIdx) {
        complete = complete && step.config.nextEnabled;
      }
    });
    return complete;
  }

  // Handle step navigation
  private stepClick(step: WizardStep): void {
    if (step.config.allowClickNav) {
      this.goTo(step);
    }
  }
}
