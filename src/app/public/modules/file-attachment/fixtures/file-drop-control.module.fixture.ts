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
  SkyFileAttachmentsModule
} from '../file-attachments.module';

import {
  FileDropControlTestComponent
} from './file-drop-control.compoennt.fixture';

import {
  FileDropControlNoFormTestComponent
} from './file-drop-control-no-form.component.fixture';

import {
  FileDropControlTemplateTestComponent
} from './file-drop-control-template.component.fixture';

@NgModule({
  declarations: [
    FileDropControlTestComponent,
    FileDropControlNoFormTestComponent,
    FileDropControlTemplateTestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SkyFileAttachmentsModule
  ],
  exports: [
    FileDropControlTestComponent,
    FileDropControlNoFormTestComponent,
    FileDropControlTemplateTestComponent
  ]
})
export class FileDropControlTestModule { }
