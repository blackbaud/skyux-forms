import {
  NgModule
} from '@angular/core';

import {
  SkyCheckboxModule,
  SkyRadioModule
} from './public';

@NgModule({
  imports: [
    SkyCheckboxModule,
    SkyRadioModule
  ],
  exports: [
    SkyCheckboxModule,
    SkyRadioModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
