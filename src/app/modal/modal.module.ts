import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AboutModalComponent } from './about-modal/about-modal.component';
import { AboutModalConfig } from './about-modal/about-modal-config';
import { AboutModalModule } from './about-modal/about-modal.module';

export {
  AboutModalConfig
};

/**
 * A module containing objects associated with modal components
 *
 * @deprecated Use individual module imports
 *
 * import { AboutModule } from 'patternfly-ng/module';
 */
@NgModule({
  imports: [
    CommonModule,
    AboutModalModule
  ],
  exports: [AboutModalComponent]
})
export class ModalModule {}
