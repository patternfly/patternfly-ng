import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { WizardBase } from './wizard-base';
import { WizardConfig } from './wizard-config';
import { WizardEvent } from './wizard-event';
import { WizardStep } from './wizard-step';

import { cloneDeep, defaults, isEqual } from 'lodash';

/**
 * Wizard component
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-wizard',
  styleUrls: ['./wizard.component.less'],
  templateUrl: './wizard.component.html'
})
export class WizardComponent extends WizardBase implements OnInit {
  /**
   * The wizard config containing component properties
   */
  @Input() config: WizardConfig;

  /**
   * The event emitted when the cancel button has been selected
   */
  @Output('onCancel') onCancel = new EventEmitter();

  /**
   * The event emitted when all wizard steps and substeps have finished
   */
  @Output('onFinish') onFinish = new EventEmitter();

  /**
   * The event emitted when the next button has been selected
   */
  @Output('onNext') onNext = new EventEmitter();

  /**
   * The event emitted when the back button has been selected
   */
  @Output('onPrevious') onPrevious = new EventEmitter();

  /**
   * The event emitted when a step has changed
   */
  @Output('onStepChange') onStepChange = new EventEmitter();

  private contentStyle: any;
  private defaultConfig = {
    cancelTitle: 'Cancel',
    done: false,
    contentHeight: '300px',
    embedInPage: false,
    hideIndicators: false,
    hideSidebar: false,
    hideHeader: false,
    hidePreviousButton: false,
    nextTitle: 'Next >',
    previousTitle: '< Back',
    ready: true
  } as WizardConfig;
  private init: boolean = true;
  private _firstStep: boolean = false;
  private prevConfig: WizardConfig;

  /**
   * The default constructor
   */
  constructor() {
    super();
  }

  // Initialization

  /**
   *  Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.setupConfig();
    if (this.init && this.config.ready) {
      setTimeout(() => {
        this.initFirstStep();
      }, 10);
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

    // If a step class is given use it for all steps
    if (this.config.stepStyleClass !== undefined) {
      // If a sidebarStyleClass is given, us it for sidebar panel, if not, apply the stepsClass to the sidebar panel
      if (this.config.sidebarStyleClass === undefined) {
        this.config.sidebarStyleClass = this.config.stepStyleClass;
      }
    } else {
      this.contentStyle = {
        'height': this.config.contentHeight,
        'max-height': this.config.contentHeight,
        'overflow-y': 'auto'
      };
    }

    // Ready state changed
    if (this.prevConfig !== undefined && !isEqual(this.config.ready, this.prevConfig.ready)) {
      this.initFirstStep();
    }
    this.prevConfig = cloneDeep(this.config);
  }

  // Accessors

  /**
   * Indicates that the selected step is also the first wizard step or substep
   *
   * @returns {boolean}
   */
  get firstStep(): boolean {
    return this._firstStep;
  }

  /**
   * Set a flag indicating that the selected step is also the first wizard step or substep
   *
   * @param {boolean} step True if the selected step is the first wizard step or substep
   */
  set firstStep(firstStep: boolean) {
    this._firstStep = firstStep;
  }

  // Methods

  /**
   * Add a wizard step or substep to this component
   *
   * @param {WizardStep} step The wizard step or substep
   */
  addStep(step: WizardStep): void {
    super.addStep(step)

    let enabledSteps: WizardStep[] = this.getEnabledSteps();
    if (this.config.ready && (enabledSteps.length > 0) && (step === enabledSteps[0])) {
      this.goToStep(enabledSteps[0], true, false);
    }
  };

  /**
   * Returns only wizard steps with review templates
   *
   * @returns {WizardStep[]} The wizard stepd or substepd
   */
  getReviewSteps(): WizardStep[] {
    let reviewSteps = this.getEnabledSteps().filter((step: WizardStep) => {
      return (step.reviewTemplate !== undefined || step.getReviewSteps().length > 0);
    });
    return reviewSteps;
  }

  /**
   * Navigate to the given wizard step number
   *
   * @param {number} stepNumber The step number to navigate to
   * @param {boolean} goToFirstSubstep True if the first substep (if exists) should be selected
   */
  goToStepNumber(stepNumber: number, goToFirstSubstep: boolean): void {
    let enabledSteps: WizardStep[] = this.getEnabledSteps();
    if (stepNumber < enabledSteps.length) {
      this.goToStep(enabledSteps[stepNumber], goToFirstSubstep, false);
    }
  }

  /**
   * Navigate to the given wizard step title
   *
   * @param {string} stepTitle The step title to navigate to
   * @param {boolean} goToFirstSubstep True if the first substep (if exists) should be selected
   */
  goToStepTitle(stepTitle: string, goToFirstSubstep: boolean): void {
    let stepTo = this.stepByTitle(stepTitle);
    if (stepTo !== undefined) {
      this.goToStep(stepTo, goToFirstSubstep, false);
    }
  }

  /**
   * Navigate to the next wizard step or substep
   */
  next(): void {
    let enabledSteps: WizardStep[] = this.getEnabledSteps();

    // Save the step you were on when next() was invoked
    let index = this.stepIdx(this.selectedStep);

    if (this.selectedStep.hasSubsteps && this.selectedStep.next()) {
      return;
    } else {
      this.onNext.emit({
        index: index,
        step: this.selectedStep
      });
    }

    // Completed property set on ctrl which is used to add class/remove class from progress bar
    this.selectedStep.config.completed = true;

    // Check to see if this is the last step.  If it is next behaves the same as finish()
    if (index === enabledSteps.length - 1) {
      this.finish();
    } else {
      // Go to the next step
      this.goToStep(enabledSteps[index + 1], true, false);
    }
  }

  /**
   * Navigate to the previous wizard step or substep
   */
  previous(): void {
    let index = this.stepIdx(this.selectedStep);

    if (this.selectedStep.hasSubsteps && this.selectedStep.previous()) {
      return;
    } else {
      this.onPrevious.emit({
        index: index,
        step: this.selectedStep
      } as WizardEvent);
    }
    if (index === 0) {
      throw new Error("Can't go back. It's already in step 0");
    } else {
      this.goToStep(this.getEnabledSteps()[index - 1], false, true);
    }
  }

  /**
   * Emits an event when the wizard step or substep has changed
   *
   * @param {WizardStep} step The wizard step or substep
   * @param {number} index The order of the wizard step of substep within its parent
   */
  stepChanged(step: WizardStep, index: number): void {
    this.onStepChange.emit({
      index: index,
      step: step
    } as WizardEvent);
  }

  /**
   * Set a flag indicating that the selected step is also the first wizard step or substep
   *
   * @param {number} index The step number
   */
  updateStepNumber(index: number): void {
    this.firstStep = this.stepIdx(this.selectedStep) === 0 && index === 0;
  };

  // Private

  // Indicates that the user can click on numeric step indicators to navigate directly to a step
  private allowStepIndicatorClick(step: WizardStep): boolean {
    if (step === undefined || this.selectedStep === undefined) {
      return false;
    }
    return !this.config.done
      && step.config.allowClickNav
      && this.selectedStep.config.okToNavAway
      && (this.selectedStep.config.nextEnabled || (step.config.priority < this.selectedStep.config.priority))
      && (this.selectedStep.config.previousEnabled || (step.config.priority > this.selectedStep.config.priority));
  }

  // Emits an event inidcating that the cancel button has been selected
  private cancel(): void {
    this.onCancel.emit({
      index: this.stepIdx(this.selectedStep),
      step: this.selectedStep
    } as WizardEvent);
    this.reset();
  }

  // Emits an event inidcating that all wizard steps and substeps have finished
  private finish(): void {
    this.onFinish.emit({
      index: this.stepIdx(this.selectedStep),
      step: this.selectedStep
    } as WizardEvent);
    this.reset();
  }

  // Navigate to the given substep
  private goToStep(step: WizardStep, goToFirstSubstep: boolean, goToLastSubstep: boolean): void {
    if (step === undefined || this.config.done
        || (this.selectedStep !== undefined && !this.selectedStep.config.okToNavAway)) {
      return;
    }
    if (this.init || (this.getStepNumber(step) < this.selectedStepNumber && this.selectedStep.previousEnabled)
        || this.selectedStep.nextEnabled) {
      this.unselectAll();
      if (step.hasSubsteps && goToFirstSubstep) {
        step.goToFirst();
      } else if (step.hasSubsteps && goToLastSubstep) {
        step.goToLast();
      } else {
        step.show(this.stepIdx(step));
        this.stepChanged(step, this.stepIdx(step));
      }
      this.selectedStep = step;
      step.selected = true;
    }

    if (!this.selectedStep.hasSubsteps) {
      this.firstStep = this.stepIdx(this.selectedStep) === 0;
    } else {
      this.firstStep = this.stepIdx(this.selectedStep) === 0 && this.selectedStep.selectedStepNumber === 1;
    }
  }

  // Initializes the first step based on the ready state and whether a current step has been provided
  private initFirstStep(): void {
    // Set currentStep equal to selected step title
    if (this.config !== undefined && this.config.currentStep !== undefined
        && !isEqual(this.config.currentStep, this.prevConfig.currentStep)
        && (this.selectedStep !== undefined && this.selectedStep.config.title !== this.config.currentStep)) {
      this.goToStep(this.stepByTitle(this.config.currentStep), true, false);
    } else {
      let enabledSteps: WizardStep[] = this.getEnabledSteps();
      this.goToStep(enabledSteps[0], true, false);
    }
    this.init = false;
  }

  // Reset wizard state
  private reset(): void {
    // Traverse steps array and set each "completed" property to false
    this.getEnabledSteps().forEach((step: WizardStep) => {
      step.config.completed = false;
    });
    // Go to first step
    this.goToStepNumber(0, false);
  }

  // Handle step navigation
  private stepClick(step: WizardStep): void {
    if (step.config.allowClickNav) {
      this.goToStep(step, true, false);
    }
  }
}
