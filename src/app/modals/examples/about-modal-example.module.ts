import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { ModalsModule } from '../modals.module';
import { AboutModalExampleComponent } from './about-modal-example.component';

@NgModule({
  declarations: [
    AboutModalExampleComponent
  ],
  imports: [
    CommonModule,
    DemoComponentsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    ModalsModule
  ],
})
export class AboutModalExampleModule {
  constructor() { }
}
