import {
  NgModule
} from '@angular/core';

import {
  SkyCheckboxModule,
  SkyFileAttachmentsModule,
  SkyRadioModule,
  SkyCharacterCounterModule
} from './public';

@NgModule({
  imports: [
    SkyCheckboxModule,
    SkyFileAttachmentsModule,
    SkyRadioModule,
    SkyCharacterCounterModule
  ],
  exports: [
    SkyCheckboxModule,
    SkyFileAttachmentsModule,
    SkyRadioModule,
    SkyCharacterCounterModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
