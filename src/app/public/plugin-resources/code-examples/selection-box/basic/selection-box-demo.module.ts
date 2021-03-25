import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  SkySelectionBoxModule
} from '@skyux/forms';

import {
  SelectionBoxDemoComponent
} from './selection-box-demo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SkySelectionBoxModule
  ],
  declarations: [
    SelectionBoxDemoComponent
  ],
  exports: [
    SelectionBoxDemoComponent
  ]
})

export class SkySelectionBoxDemoModule {
}
