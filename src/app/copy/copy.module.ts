import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { CopyService } from './copy-service/copy.service';
import { BlockCopyComponent } from './block-copy/block-copy.component';
import { InlineCopyComponent } from './inline-copy/inline-copy.component';

export {
  BlockCopyComponent,
  InlineCopyComponent
};

@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot()
  ],
  declarations: [
    BlockCopyComponent,
    InlineCopyComponent
  ],
  exports: [BlockCopyComponent, InlineCopyComponent],
  providers: [CopyService]
})
export class CopyModule {}
