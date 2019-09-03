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
  SkyFormsResourcesModule
} from '../shared/forms-resources.module';

import {
  SkyI18nModule
} from '@skyux/i18n';

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
    FormsModule,
    SkyFormsResourcesModule,
    SkyI18nModule
  ],
  exports: [
    SkyCharacterCounterInputDirective,
    SkyCharacterCounterIndicatorComponent
  ]
})
export class SkyCharacterCounterModule { }
