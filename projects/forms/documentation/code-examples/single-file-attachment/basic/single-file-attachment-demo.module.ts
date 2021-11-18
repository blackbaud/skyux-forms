import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SkyFileAttachmentsModule } from 'projects/forms/src/public-api';

import { SingleFileAttachmentDemoComponent } from './single-file-attachment-demo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SkyFileAttachmentsModule,
  ],
  declarations: [SingleFileAttachmentDemoComponent],
  exports: [SingleFileAttachmentDemoComponent],
})
export class SkySingleFileAttachmentDemoModule {}
