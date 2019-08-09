import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  NgModule
} from '@angular/core';

import {
  SkyCharacterCounterInputDirective
} from './character-counter.directive';

import {
  SkyCharacterCounterIndicatorComponent
} from './character-counter-indicator.component';

@NgModule({
  declarations: [
    SkyCharacterCounterInputDirective,
    SkyCharacterCounterIndicatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SkyCharacterCounterInputDirective,
    SkyCharacterCounterIndicatorComponent
  ]
})
export class SkyCharacterCounterModule { }
