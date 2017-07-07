import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { Action } from './action';
import { ActionComponent } from './action.component';
import { ActionConfig } from './action-config';

export {
  Action,
  ActionConfig
}

/**
 * A module containing objects associated with action components
 */
@NgModule({
  imports: [ BsDropdownModule, CommonModule, FormsModule ],
  declarations: [ ActionComponent ],
  exports: [ ActionComponent ],
  providers: [ BsDropdownConfig ]
})
export class ActionModule { }
