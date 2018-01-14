import {
  Component,
  Host,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { WizardStep } from '../wizard-step';
import { WizardStepComponent } from '../wizard-step.component';
import { WizardConfig } from '../wizard-config';
import { WizardComponent } from '../wizard.component';
import { WizardExampleComponent } from './wizard-example.component';
import { WizardEvent } from '../wizard-event';
import { WizardStepConfig } from '../wizard-step-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'wizard-basic-example',
  templateUrl: './wizard-basic-example.component.html'
})
export class WizardBasicExampleComponent implements OnInit {
  @ViewChild('wizard') wizard: WizardComponent;

  data: any = {};
  deployComplete: boolean = true;

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
  wizardExample: WizardExampleComponent;

  constructor(@Host() wizardExample: WizardExampleComponent) {
    this.wizardExample = wizardExample;
  }

  ngOnInit(): void {
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
      nextEnabled: false,
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
      nextEnabled: false,
      priority: 0,
      title: 'Details'
    } as WizardStepConfig;
    this.step2bConfig = {
      id: 'step2b',
      expandReviewDetails: true,
      nextEnabled: false,
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
      nextEnabled: false,
      priority: 0,
      title: 'Summary'
    } as WizardStepConfig;
    this.step3bConfig = {
      id: 'step3b',
      nextEnabled: false,
      priority: 1,
      title: 'Deploy'
    } as WizardStepConfig;

    // Wizard
    this.wizardConfig = {
      title: 'Wizard Title',
      sidebarStyleClass: 'example-wizard-sidebar',
      stepStyleClass: 'example-wizard-step'
    } as WizardConfig;

    this.setNavAway(false);
  }

  // Methods

  nextClicked($event: WizardEvent): void {
    if ($event.step.config.id === 'step3b') {
      this.wizardExample.closeModal($event);
    }
  }

  startDeploy(): void {
    this.deployComplete = false;
    this.wizardConfig.done = true;

    // Simulate a delay
    setTimeout(() => {
      this.deployComplete = true;
    }, 2500);
  }

  stepChanged($event: WizardEvent) {
    let flatSteps = flattenWizardSteps(this.wizard);
    let currentStep = flatSteps.filter(step => step.config.id === $event.step.config.id);
    if (currentStep && currentStep.length > 0) {
      currentStep[0].config.nextEnabled = true;
    }
    if ($event.step.config.id === 'step1a') {
      this.updateName();
    } else if ($event.step.config.id === 'step3a') {
      this.wizardConfig.nextTitle = 'Deploy';
    } else if ($event.step.config.id === 'step3b') {
      this.wizardConfig.nextTitle = 'Close';
    } else {
      this.wizardConfig.nextTitle = 'Next >';
    }
  }

  updateName(): void {
    this.step1aConfig.nextEnabled = (this.data.name !== undefined && this.data.name.length > 0);
    this.setNavAway(this.step1aConfig.nextEnabled);
  }

  // Private

  private setNavAway(allow: boolean) {
    this.step1aConfig.allowNavAway = allow;

    this.step1Config.allowClickNav = allow;
    this.step1aConfig.allowClickNav = allow;
    this.step1bConfig.allowClickNav = allow;

    this.step2Config.allowClickNav = allow;
    this.step2aConfig.allowClickNav = allow;
    this.step2bConfig.allowClickNav = allow;

    this.step3Config.allowClickNav = allow;
    this.step3aConfig.allowClickNav = allow;
    this.step3bConfig.allowClickNav = allow;
  }
}

function flattenWizardSteps(wizard: WizardComponent): WizardStep[] {
  let flatWizard: WizardStep[] = [];
  wizard.steps.forEach((step: WizardStepComponent) => {
    if (step.hasSubsteps) {
      step.steps.forEach(substep => {
        flatWizard.push(substep);
      });
    } else {
      flatWizard.push(step);
    }
  });
  return flatWizard;
}
