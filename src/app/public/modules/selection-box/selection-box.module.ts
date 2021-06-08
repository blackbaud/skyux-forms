import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  MutationObserverService,
  SkyCoreAdapterService
} from '@skyux/core';

import {
  SkyThemeModule,
  SkyThemeService
} from '@skyux/theme';

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
    SkyThemeModule
  ],
  exports: [
    SkySelectionBoxGridComponent,
    SkySelectionBoxComponent,
    SkySelectionBoxDescriptionComponent,
    SkySelectionBoxHeaderComponent
  ],
  providers: [
    MutationObserverService,
    SkyCoreAdapterService,
    SkyThemeService
  ]
})
export class SkySelectionBoxModule { }
