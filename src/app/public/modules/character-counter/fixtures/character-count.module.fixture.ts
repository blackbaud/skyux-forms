import {
  NgModule
} from '@angular/core';

import {
  CharacterCountTestComponent
} from './character-count.component.fixture';

import {
  SkyCharacterCountModule
} from '../character-counter.module';

import {
  FormsModule
} from '@angular/forms';

@NgModule({
  declarations: [
    CharacterCountTestComponent
  ],
  imports: [
    SkyCharacterCountModule,
    FormsModule
  ],
  exports: [
    CharacterCountTestComponent
  ]
})
export class CharacterCountTestModule { }
