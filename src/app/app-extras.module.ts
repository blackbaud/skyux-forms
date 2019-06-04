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
  imports: [
    SkyCheckboxModule,
    SkyFileAttachmentsModule,
    SkyRadioModule,
    SkyToggleModule
  ],
  exports: [
    SkyCheckboxModule,
    SkyFileAttachmentsModule,
    SkyRadioModule,
    SkyToggleModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
