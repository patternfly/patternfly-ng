import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSelectModule } from 'ngx-select-ex';

import { ComboboxComponent } from './combobox.component';

/**
 * A module containing objects associated with the sample component
 */
@NgModule({
  imports: [CommonModule, NgxSelectModule],
  declarations: [ComboboxComponent],
  exports: [ComboboxComponent]
})
export class ComboboxModule {}
