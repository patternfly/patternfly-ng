import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { WizardModule } from '../wizard.module';
import { WizardBasicExampleComponent } from './wizard-basic-example.component';
import { WizardEmbedExampleComponent } from './wizard-embed-example.component';
import { WizardExampleComponent } from './wizard-example.component';
import { WizardLazyExampleComponent } from './wizard-lazy-example.component';
import { WizardNavExampleComponent } from './wizard-nav-example.component';

@NgModule({
  declarations: [
    WizardBasicExampleComponent,
    WizardEmbedExampleComponent,
    WizardLazyExampleComponent,
    WizardNavExampleComponent,
    WizardExampleComponent
  ],
  imports: [CommonModule, DemoComponentsModule, FormsModule, ModalModule.forRoot(), TabsModule.forRoot(), WizardModule],
  providers: [TabsetConfig]
})
export class WizardExampleModule {
  constructor() {}
}
