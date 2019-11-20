import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  SkyRadioModule
} from '../radio.module';

import {
  SkyRadioTestComponent
} from './radio.component.fixture';

import {
  SkyRadioGroupBooleanTestComponent
} from './radio-group-boolean.component.fixture';

import {
  SkyRadioGroupTestComponent
} from './radio-group.component.fixture';

import {
  SkyRadioOnPushTestComponent
} from './radio-on-push.component.fixture';

import {
  SkyRadioGroupReactiveFixtureComponent
} from './radio-group-reactive.component.fixture';

import {
  SkySingleRadioComponent
} from './radio-single.component.fixture';

@NgModule({
  declarations: [
    SkyRadioTestComponent,
    SkyRadioGroupBooleanTestComponent,
    SkyRadioGroupTestComponent,
    SkyRadioOnPushTestComponent,
    SkyRadioGroupReactiveFixtureComponent,
    SkySingleRadioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SkyRadioModule
  ],
  exports: [
    SkyRadioTestComponent,
    SkyRadioGroupBooleanTestComponent,
    SkyRadioGroupTestComponent,
    SkyRadioGroupReactiveFixtureComponent,
    SkySingleRadioComponent
  ]
})
export class SkyRadioFixturesModule { }
