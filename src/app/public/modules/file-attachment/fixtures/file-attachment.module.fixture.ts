import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  FileAttachmentTestComponent
} from './file-attachment.component.fixture';

import {
  SkyFileAttachmentsModule
} from '../file-attachments.module';

import {
  FileAttachmentTemplateTestComponent
} from './file-attachment-template.component.fixture';

@NgModule({
  declarations: [
    FileAttachmentTestComponent,
    FileAttachmentTemplateTestComponent
  ],
  imports: [
    SkyFileAttachmentsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FileAttachmentTestComponent,
    FileAttachmentTemplateTestComponent
  ]
})
export class FileAttachmentTestModule { }
