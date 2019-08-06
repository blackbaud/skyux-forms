import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyCharacterCountInputDirective
} from './character-counter.directive';

import {
  SkyCharacterCounterIndicatorComponent
} from './character-counter-indicator.component';

@NgModule({
  declarations: [
    SkyCharacterCountInputDirective,
    SkyCharacterCounterIndicatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyCharacterCountInputDirective,
    SkyCharacterCounterIndicatorComponent
  ]
})
export class SkyCharacterCounterModule { }
