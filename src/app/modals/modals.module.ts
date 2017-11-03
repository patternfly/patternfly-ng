import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutModalComponent } from './about-modal.component';
import { AboutModalConfig } from './about-modal-config';

export {
  AboutModalConfig
};

@NgModule({
    imports: [
      CommonModule,
    ],
    declarations: [AboutModalComponent],
    exports: [AboutModalComponent]
})

export class ModalsModule {}
