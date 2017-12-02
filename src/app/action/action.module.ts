import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { Action } from './action';
import { ActionComponent } from './action.component';
import { ActionConfig } from './action-config';

export {
  Action,
  ActionConfig
};

/**
 * A module containing objects associated with action components
 */
@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    FormsModule
  ],
  declarations: [ActionComponent],
  exports: [ActionComponent],
  providers: [BsDropdownConfig]
})
export class ActionModule {}
