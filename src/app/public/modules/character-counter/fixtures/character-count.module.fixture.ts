import {
  NgModule
} from '@angular/core';

import {
  CharacterCountTestComponent
} from './character-count.component.fixture';

import {
  SkyCharacterCounterModule
} from '../character-counter.module';

import {
  FormsModule
} from '@angular/forms';

@NgModule({
  declarations: [
    CharacterCountTestComponent
  ],
  imports: [
    SkyCharacterCounterModule,
    FormsModule
  ],
  exports: [
    CharacterCountTestComponent
  ]
})
export class CharacterCountTestModule { }
