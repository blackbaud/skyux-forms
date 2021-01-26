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
  SkyCheckboxModule,
  SkyRadioModule
} from '@skyux/forms';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkySelectionBoxContainerComponent
} from './selection-box-container.component';

import {
  SkySelectionBoxDescriptionComponent
} from './selection-box-description.component';

import {
  SkySelectionBoxGroupComponent
} from './selection-box-group.component';

import {
  SkySelectionBoxHeaderComponent
} from './selection-box-header.component';

import {
  SkySelectionBoxIconComponent
} from './selection-box-icon.component';

import {
  SkySelectionBoxComponent
} from './selection-box.component';

@NgModule({
  declarations: [
    SkySelectionBoxComponent,
    SkySelectionBoxContainerComponent,
    SkySelectionBoxDescriptionComponent,
    SkySelectionBoxGroupComponent,
    SkySelectionBoxHeaderComponent,
    SkySelectionBoxIconComponent
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
    SkySelectionBoxContainerComponent,
    SkySelectionBoxDescriptionComponent,
    SkySelectionBoxGroupComponent,
    SkySelectionBoxHeaderComponent,
    SkySelectionBoxIconComponent
  ]
})
export class SkySelectionBoxModule { }
