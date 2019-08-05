import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyCharacterCountInputDirective
} from './character-count.directive';

import {
  SkyCharacterCountComponent
} from './character-count.component';

@NgModule({
  declarations: [
    SkyCharacterCountInputDirective,
    SkyCharacterCountComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyCharacterCountInputDirective,
    SkyCharacterCountComponent
  ]
})
export class SkyCharacterCountModule { }
