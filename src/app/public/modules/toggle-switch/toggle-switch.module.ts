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
  SkyToggleSwitchComponent
} from './toggle-switch.component';

import {
  SkyToggleSwitchLabelComponent
} from './toggle-switch-label.component';

@NgModule({
  declarations: [
    SkyToggleSwitchComponent,
    SkyToggleSwitchLabelComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SkyToggleSwitchComponent,
    SkyToggleSwitchLabelComponent
  ]
})
export class SkyToggleSwitchModule { }
