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
  SkyToggleLabelComponent
} from './toggle-label.component';

import {
  SkyToggleComponent
} from './toggle.component';
// #endregion

@NgModule({
  declarations: [
    SkyToggleComponent,
    SkyToggleLabelComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SkyToggleComponent,
    SkyToggleLabelComponent
  ]
})
export class SkyToggleModule { }
