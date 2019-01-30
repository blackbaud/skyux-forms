import {
  NgModule
} from '@angular/core';

import {
  SkyCheckboxModule,
  SkyFileAttachmentsModule,
  SkyRadioModule,
  SkyPhoneFieldModule
} from './public';

@NgModule({
  imports: [
    SkyCheckboxModule,
    SkyFileAttachmentsModule,
    SkyPhoneFieldModule,
    SkyRadioModule
  ],
  exports: [
    SkyCheckboxModule,
    SkyFileAttachmentsModule,
    SkyPhoneFieldModule,
    SkyRadioModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
