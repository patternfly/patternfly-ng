import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ApplicationLauncherComponent } from './application-launcher.component';

/**
 * A module containing objects associated with the navigation components
 */
@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule
  ],
  declarations: [ApplicationLauncherComponent],
  exports: [ApplicationLauncherComponent],
  providers: [BsDropdownConfig]
})
export class ApplicationLauncherModule {}
