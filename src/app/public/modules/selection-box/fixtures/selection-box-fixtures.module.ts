import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  SkyIdModule
} from '@skyux/core';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyCheckboxModule
} from '../../checkbox/checkbox.module';

import {
  SkyRadioModule
} from '../../radio/radio.module';

import {
  SkySelectionBoxModule
} from '../selection-box.module';

import {
  SelectionBoxTestComponent
} from './selection-box.component.fixture';

@NgModule({
  declarations: [
    SelectionBoxTestComponent
  ],
  imports: [
    CommonModule,
    SkyCheckboxModule,
    SkyIconModule,
    SkyIdModule,
    SkyRadioModule,
    SkySelectionBoxModule
  ]
})
export class SkySelectionBoxFixturesModule { }
