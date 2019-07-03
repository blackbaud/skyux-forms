import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyCharacterCountDirective
} from './character-count.directive';

import {
  SkyCharacterCountComponent
} from './character-count.component';

@NgModule({
  declarations: [
    SkyCharacterCountDirective,
    SkyCharacterCountComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyCharacterCountDirective,
    SkyCharacterCountComponent
  ]
})
export class SkyCharacterCountModule { }
