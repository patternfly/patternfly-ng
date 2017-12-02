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

import { WizardEvent } from './wizard-event';
import { WizardStep } from './wizard-step';
import { WizardStepConfig } from './wizard-step-config';
import { WizardStepComponent } from './wizard-step.component';

/**
 * Wizard substep component.
 *
 * Note: This component is expected to be a child of wizard-step.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-wizard-substep',
  templateUrl: './wizard-substep.component.html'
})
export class WizardSubstepComponent implements OnInit, WizardStep {
  /**
   * The wizard step config containing component properties
   */
  @Input() config: WizardStepConfig;

  /**
   * The wizard substep template used for the review details screen
   */
  @Input() reviewTemplate: TemplateRef<any>;

  /**
   * The event emitted when this wizard substep is shown
   */
  @Output('onShow') onShow = new EventEmitter();

  private defaultConfig = {
    allowClickNav: true,
    allowNavAway: true,
    completed: false,
    data: {},
    disabled: false,
    expandReview: true,
    expandReviewDetails: false,
    priority: 999,
    nextEnabled: true,
    okToNavAway: true,
    previousEnabled: true,
    title: ''
  } as WizardStepConfig;
  private prevConfig: WizardStepConfig;
  private _selected: boolean = false;
  private step: WizardStepComponent;

  /**
   * The default constructor
   */
  constructor(@Host() step: WizardStepComponent) {
    this.step = step;
  }

  // Initialization

  /**
   *  Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.setupConfig();

    if (this.step !== undefined) {
      this.step.config.allowClickNav = this.config.allowClickNav;
      this.step.config.nextEnabled = this.config.nextEnabled;
      this.step.config.allowNavAway = this.config.allowNavAway;
      this.step.config.previousEnabled = this.config.previousEnabled;

      this.step.addStep(this);
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
    this.prevConfig = cloneDeep(this.config);
  }

  // Accessors

  /**
   * Indicates that this wizard substep is selected
   *
   * @returns {boolean} True if this wizard substep is selected
   */
  get selected(): boolean {
    return this._selected;
  }

  /**
   * Sets a flag indicating that this wizard substep is selected
   *
   * @param {boolean} selected True if this wizard substep is selected
   */
  set selected(selected: boolean) {
    this._selected = selected;
  }

  // Methods

  /**
   * Emits an event when this wizard substep is shown
   */
  show(index: number) {
    this.onShow.emit({
      index: index,
      step: this
    } as WizardEvent);
  }
}
