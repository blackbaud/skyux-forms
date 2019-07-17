import {
  NgModule
} from '@angular/core';

import {
  SkyCheckboxModule,
  SkyFileAttachmentsModule,
  SkyRadioModule,
  SkyToggleSwitchModule
} from './public';

@NgModule({
  exports: [
    SkyCheckboxModule,
    SkyFileAttachmentsModule,
    SkyRadioModule,
    SkyToggleSwitchModule
  ]
})
export class AppExtrasModule { }
