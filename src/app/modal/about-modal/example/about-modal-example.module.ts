import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { AboutModalExampleComponent } from './about-modal-example.component';
import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { AboutModalModule } from '../about-modal.module';

@NgModule({
  declarations: [
    AboutModalExampleComponent
  ],
  imports: [
    AboutModalModule,
    CommonModule,
    DemoComponentsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [TabsetConfig]
})
export class AboutModalExampleModule {
  constructor() { }
}
