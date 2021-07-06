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
  SkySelectionBoxForRootCompatModule
} from '../../shared/selection-box-for-root-compat.module';

import {
  SkySelectionBoxModule
} from '../selection-box.module';

import {
  SelectionBoxGridTestComponent
} from './selection-box-grid.component.fixture';

import {
  SelectionBoxTestComponent
} from './selection-box.component.fixture';

@NgModule({
  declarations: [
    SelectionBoxTestComponent,
    SelectionBoxGridTestComponent
  ],
  imports: [
    CommonModule,
    SkyCheckboxModule,
    SkyIconModule,
    SkyIdModule,
    SkyRadioModule,
    SkySelectionBoxForRootCompatModule,
    SkySelectionBoxModule
  ]
})
export class SkySelectionBoxFixturesModule { }
