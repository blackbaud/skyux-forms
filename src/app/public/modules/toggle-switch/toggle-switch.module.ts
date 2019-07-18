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

@NgModule({
  declarations: [
    SkyToggleSwitchComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SkyToggleSwitchComponent
  ]
})
export class SkyToggleSwitchModule { }
