import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { WizardBasicExampleComponent } from './wizard-basic-example.component';
import { WizardDynamicExampleComponent } from './wizard-dynamic-example.component';
import { WizardEmbedExampleComponent } from './wizard-embed-example.component';
import { WizardNavExampleComponent } from './wizard-nav-example.component';
import { WizardExampleComponent } from './wizard-example.component';
import { WizardModule } from '../wizard.module';

@NgModule({
  declarations: [
    WizardBasicExampleComponent,
    WizardEmbedExampleComponent,
    WizardDynamicExampleComponent,
    WizardNavExampleComponent,
    WizardExampleComponent
  ],
  imports: [
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    WizardModule
  ],
  providers: [ TabsetConfig ]
})
export class WizardExampleModule {
  constructor() {}
}
