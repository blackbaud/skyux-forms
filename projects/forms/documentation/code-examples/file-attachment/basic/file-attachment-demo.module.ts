import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { SkyFileAttachmentsModule } from 'projects/forms/src/public-api';

import { SkyStatusIndicatorModule } from '@skyux/indicators';

import { FileAttachmentDemoComponent } from './file-attachment-demo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SkyFileAttachmentsModule,
    SkyStatusIndicatorModule,
  ],
  declarations: [FileAttachmentDemoComponent],
  exports: [FileAttachmentDemoComponent],
})
export class SkyFileAttachmentDemoModule {}
