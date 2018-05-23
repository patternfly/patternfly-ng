import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { CopyService } from '../copy-service/copy.service';
import { BlockCopyComponent } from './block-copy.component';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot()
  ],
  declarations: [
    BlockCopyComponent
  ],
  exports: [BlockCopyComponent],
  providers: [CopyService, TooltipConfig]
})
export class BlockCopyModule {}
