// #region imports
import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  FormsModule
} from '@angular/forms';

import {
  SkyDropdownModule
} from '@skyux/popovers';

import {
  SkyPhoneFieldComponent
} from './phone-field.component';
// #endregion

@NgModule({
  declarations: [
    SkyPhoneFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyDropdownModule
  ],
  exports: [
    SkyPhoneFieldComponent
  ]
})
export class SkyPhoneFieldModule { }
