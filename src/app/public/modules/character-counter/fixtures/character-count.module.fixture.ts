import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  CharacterCountTestComponent
} from './character-count.component.fixture';

import {
  SkyCharacterCounterModule
} from '../character-counter.module';

@NgModule({
  declarations: [
    CharacterCountTestComponent
  ],
  imports: [
    CommonModule,
    SkyCharacterCounterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CharacterCountTestComponent
  ]
})
export class CharacterCountTestModule { }
