import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { CopyService } from '../copy-service/copy.service';
import { InlineCopyComponent } from './inline-copy.component';

export {
  InlineCopyComponent
};

@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot()
  ],
  declarations: [
    InlineCopyComponent
  ],
  exports: [InlineCopyComponent],
  providers: [CopyService]
})
export class InlineCopyModule {}
