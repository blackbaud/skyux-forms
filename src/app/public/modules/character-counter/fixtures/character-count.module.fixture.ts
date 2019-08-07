import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  CharacterCountTestComponent
} from './character-count.component.fixture';

import {
  SkyCharacterCounterModule
} from '../character-counter.module';

import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';

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
