import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { ComboboxModule } from '../combobox.module';
import { ComboboxExampleComponent } from './combobox-example.component';

@NgModule({
  imports: [
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    ComboboxModule,
    TabsModule.forRoot()
  ],
  declarations: [ComboboxExampleComponent],
  exports: [ComboboxExampleComponent],
  providers: [TabsetConfig]
})
export class ComboboxExampleModule {
  constructor() {}
}