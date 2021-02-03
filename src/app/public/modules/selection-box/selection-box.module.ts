import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  ReactiveFormsModule
} from '@angular/forms';

import {
  RouterModule
} from '@angular/router';

import {
  SkyIdModule,
  SkyMediaQueryModule
} from '@skyux/core';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyCheckboxModule,
  SkyRadioModule
} from '../../public_api';

import {
  SkySelectionBoxAdapterService
} from './selection-box-adapter.service';

import {
  SkySelectionBoxDescriptionComponent
} from './selection-box-description.component';

import {
  SkySelectionBoxHeaderComponent
} from './selection-box-header.component';

import {
  SkySelectionBoxComponent
} from './selection-box.component';

@NgModule({
  declarations: [
    SkySelectionBoxComponent,
    SkySelectionBoxDescriptionComponent,
    SkySelectionBoxHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SkyCheckboxModule,
    SkyIconModule,
    SkyIdModule,
    SkyMediaQueryModule,
    SkyRadioModule
  ],
  exports: [
    SkySelectionBoxComponent,
    SkySelectionBoxDescriptionComponent,
    SkySelectionBoxHeaderComponent
  ],
  providers: [
    SkySelectionBoxAdapterService
  ]
})
export class SkySelectionBoxModule { }
