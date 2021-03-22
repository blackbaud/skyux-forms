import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyThemeModule,
  SkyThemeService
} from '@skyux/theme';

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
    SkyThemeService
  ]
})
export class SkyInputBoxModule { }
