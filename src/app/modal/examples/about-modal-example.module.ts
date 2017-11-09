import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule as BSModalModule } from 'ngx-bootstrap/modal';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { ModalModule } from '../modal.module';
import { AboutModalExampleComponent } from './about-modal-example.component';

@NgModule({
  declarations: [
    AboutModalExampleComponent
  ],
  imports: [
    CommonModule,
    DemoComponentsModule,
    BSModalModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule
  ],
  providers: [TabsetConfig]
})
export class AboutModalExampleModule {
  constructor() { }
}
