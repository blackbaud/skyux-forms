import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  SkyThemeModule
} from '@skyux/theme';

import {
  SkySelectionBoxForRootCompatModule
} from '../shared/selection-box-for-root-compat.module';

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
  SkySelectionBoxGridComponent
} from './selection-box-grid.component';

import {
  SkySelectionBoxComponent
} from './selection-box.component';

@NgModule({
  declarations: [
    SkySelectionBoxGridComponent,
    SkySelectionBoxComponent,
    SkySelectionBoxDescriptionComponent,
    SkySelectionBoxHeaderComponent
  ],
  imports: [
    CommonModule,
    SkyThemeModule,
    SkySelectionBoxForRootCompatModule
  ],
  exports: [
    SkySelectionBoxGridComponent,
    SkySelectionBoxComponent,
    SkySelectionBoxDescriptionComponent,
    SkySelectionBoxHeaderComponent
  ],
  providers: [
    SkySelectionBoxAdapterService
  ]
})
export class SkySelectionBoxModule { }