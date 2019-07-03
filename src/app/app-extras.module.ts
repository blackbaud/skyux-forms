import {
  NgModule
} from '@angular/core';

import {
  SkyCheckboxModule,
  SkyFileAttachmentsModule,
  SkyRadioModule,
  SkyCharacterCountModule
} from './public';

@NgModule({
  imports: [
    SkyCheckboxModule,
    SkyFileAttachmentsModule,
    SkyRadioModule,
    SkyCharacterCountModule
  ],
  exports: [
    SkyCheckboxModule,
    SkyFileAttachmentsModule,
    SkyRadioModule,
    SkyCharacterCountModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
