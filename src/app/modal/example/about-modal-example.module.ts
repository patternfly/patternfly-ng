import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalModule as BSModalModule } from 'ngx-bootstrap/modal';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { AboutModalExampleComponent } from './about-modal-example.component';
import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { ModalModule } from '../modal.module';

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
