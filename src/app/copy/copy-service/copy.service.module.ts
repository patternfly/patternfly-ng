import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CopyService } from './copy.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [CopyService]
})
export class CopyServiceModule {}
