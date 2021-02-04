import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  SkyCoreAdapterService
} from '@skyux/core';

import {
  SkyThemeService
} from '@skyux/theme';

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
    CommonModule
  ],
  exports: [
    SkySelectionBoxComponent,
    SkySelectionBoxDescriptionComponent,
    SkySelectionBoxHeaderComponent
  ],
  providers: [
    SkyCoreAdapterService,
    SkySelectionBoxAdapterService,
    SkyThemeService
  ]
})
export class SkySelectionBoxModule { }
