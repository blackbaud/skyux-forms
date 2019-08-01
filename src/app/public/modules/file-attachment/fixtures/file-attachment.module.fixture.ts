import {
  NgModule
} from '@angular/core';

import {
  SkyFileAttachmentsModule
} from '../file-attachments.module';

import {
  FileAttachmentTestComponent
} from './file-attachment.component.fixture';

@NgModule({
  declarations: [
    FileAttachmentTestComponent
  ],
  imports: [
    SkyFileAttachmentsModule
  ],
  exports: [
    FileAttachmentTestComponent
  ]
})
export class FileAttachmentTestModule { }
