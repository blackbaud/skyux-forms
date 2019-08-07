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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SkyCharacterCountInputDirective,
    SkyCharacterCounterIndicatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SkyCharacterCountInputDirective,
    SkyCharacterCounterIndicatorComponent
  ]
})
export class SkyCharacterCounterModule { }
