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

import {
  SkyPhoneFieldInputDirective
} from './phone-field-input.directive';
// #endregion

@NgModule({
  declarations: [
    SkyPhoneFieldComponent,
    SkyPhoneFieldInputDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyDropdownModule
  ],
  exports: [
    SkyPhoneFieldComponent,
    SkyPhoneFieldInputDirective
  ]
})
export class SkyPhoneFieldModule { }
