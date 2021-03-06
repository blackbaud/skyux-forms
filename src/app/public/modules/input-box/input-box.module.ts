import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyThemeModule
} from '@skyux/theme';

import {
  SkyInputBoxAdapterService
} from './input-box-adapter.service';

import {
  SkyInputBoxComponent
} from './input-box.component';

@NgModule({
  declarations: [
    SkyInputBoxComponent
  ],
  imports: [
    CommonModule,
    SkyThemeModule
  ],
  exports: [
    SkyInputBoxComponent
  ],
  providers: [
    SkyInputBoxAdapterService
  ]
})
export class SkyInputBoxModule { }
