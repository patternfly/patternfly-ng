import {
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { WizardConfig } from '../wizard-config';
import { WizardEvent } from '../wizard-event';
import { WizardStepConfig } from '../wizard-step-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'wizard-example',
  styleUrls: ['./wizard-example.component.less'],
  templateUrl: './wizard-example.component.html'
})
export class WizardExampleComponent implements OnInit {
  data: any;
  deployComplete: boolean;
  modalRef: BsModalRef;

  // Wizard Step 1
  step1Config: WizardStepConfig;
  step1aConfig: WizardStepConfig;
  step1bConfig: WizardStepConfig;

  // Wizard Step 2
  step2Config: WizardStepConfig;
  step2aConfig: WizardStepConfig;
  step2bConfig: WizardStepConfig;

  // Wizard Step 3
  step3Config: WizardStepConfig;
  step3aConfig: WizardStepConfig;
  step3bConfig: WizardStepConfig;

  // Wizard
  wizardConfig: WizardConfig;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.data = {};

    // Step 1
    this.step1Config = {
      id: 'step1',
      priority: 0,
      title: 'First Step'
    } as WizardStepConfig;
    this.step1aConfig = {
      id: 'step1a',
      expandReviewDetails: true,
      nextEnabled: false,
      priority: 0,
      title: 'Details'
    } as WizardStepConfig;
    this.step1bConfig = {
      id: 'step1b',
      expandReviewDetails: true,
      priority: 1,
      title: 'Settings'
    } as WizardStepConfig;

    // Step 2
    this.step2Config = {
      id: 'step2',
      priority: 0,
      title: 'Second Step'
    } as WizardStepConfig;
    this.step2aConfig = {
      id: 'step2a',
      expandReviewDetails: true,
      priority: 0,
      title: 'Details'
    } as WizardStepConfig;
    this.step2bConfig = {
      id: 'step2b',
      expandReviewDetails: true,
      priority: 1,
      title: 'Settings'
    } as WizardStepConfig;

    // Step 3
    this.step3Config = {
      id: 'step3',
      priority: 2,
      title: 'Review'
    } as WizardStepConfig;
    this.step3aConfig = {
      id: 'step3a',
      priority: 0,
      title: 'Summary'
    } as WizardStepConfig;
    this.step3bConfig = {
      id: 'step3b',
      priority: 1,
      title: 'Deploy'
    } as WizardStepConfig;

    // Wizard
    this.wizardConfig = {
      loadingTitle: 'Wizard loading',
      loadingSecondaryInfo: 'ipsum dolor sit amet, porta at suspendisse ac, ut wisi vivamus, lorem sociosqu.',
      title: 'Wizard Title',
      sidebarStyleClass: 'example-wizard-sidebar',
      stepStyleClass: 'example-wizard-step'
    } as WizardConfig;
  }

  // Methods

  closeWizard($event: WizardEvent): void {
    this.modalRef.hide();
  }

  nextStep($event: WizardEvent): void {
    if ($event.step.config.id === 'step3b') {
      this.closeWizard($event);
    }
  }

  openWizard(template: TemplateRef<any>): void {
    this.initWizard();

    // Simulate a delay
    setTimeout(() => {
      this.wizardConfig.ready = true;
    }, 1000);

    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  startDeploy(): void {
    this.deployComplete = false;
    this.wizardConfig.done = true;
    setTimeout(() => {
      this.deployComplete = true;
    }, 2500);
  }

  stepChanged($event: WizardEvent) {
    if ($event.step.config.id === 'step3a') {
      this.wizardConfig.nextTitle = 'Deploy';
    } else if ($event.step.config.id === 'step3b') {
      this.wizardConfig.nextTitle = 'Close';
    } else {
      this.wizardConfig.nextTitle = 'Next >';
    }
  }

  updateName(): void {
    this.step1aConfig.nextEnabled = (this.data.name !== undefined && this.data.name.length > 0);
  }

  // Private

  private initWizard() {
    this.data = {
      adipiscing: '',
      aliquam: '',
      consectetur: '',
      description: '',
      fermentum: '',
      name: '',
      ipsum: '',
      lorem: ''
    };

    // Reset all config properties that were changed.
    this.step1aConfig.nextEnabled = false;
    this.wizardConfig.done = false;
    this.wizardConfig.nextTitle = 'Next >';
    this.wizardConfig.ready = false;
  }
}
