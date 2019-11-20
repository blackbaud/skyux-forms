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
  TemplateDrivenFileAttachmentTestComponent
} from './template-driven-file-attachment.component.fixture';

@NgModule({
  declarations: [
    FileAttachmentTestComponent,
    TemplateDrivenFileAttachmentTestComponent
  ],
  imports: [
    SkyFileAttachmentsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FileAttachmentTestComponent,
    TemplateDrivenFileAttachmentTestComponent
  ]
})
export class FileAttachmentTestModule { }
