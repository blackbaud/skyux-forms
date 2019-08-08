import {
  NgModule
} from '@angular/core';

import {
  SkyFileAttachmentsModule
} from '../file-attachments.module';

import {
  FileAttachmentTestComponent
} from './file-attachment.component.fixture';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FileAttachmentTestComponent
  ],
  imports: [
    SkyFileAttachmentsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FileAttachmentTestComponent
  ]
})
export class FileAttachmentTestModule { }
