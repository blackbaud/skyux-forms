import {
  NgModule
} from '@angular/core';

import {
  SkyCheckboxModule,
  SkyFileAttachmentsModule,
  SkyRadioModule,
  SkyToggleModule
} from './public';

@NgModule({
  exports: [
    SkyCheckboxModule,
    SkyFileAttachmentsModule,
    SkyRadioModule,
    SkyToggleModule
  ]
})
export class AppExtrasModule { }
