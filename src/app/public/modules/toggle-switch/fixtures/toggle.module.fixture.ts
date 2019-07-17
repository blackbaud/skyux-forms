import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  SkyToggleSwitchModule
} from '../toggle.module';

import {
  ToggleChangeEventTestComponent
} from './toggle-change-event.component.fixture';

import {
  ToggleFormDirectivesTestComponent
} from './toggle-form-directives.component.fixture';

import {
  ToggleOnPushTestComponent
} from './toggle-on-push.component.fixture';

import {
  ToggleReactiveFormTestComponent
} from './toggle-reactive-form.component.fixture';

import {
  ToggleTestComponent
} from './toggle.component.fixture';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SkyToggleSwitchModule
  ],
  declarations: [
    ToggleChangeEventTestComponent,
    ToggleFormDirectivesTestComponent,
    ToggleOnPushTestComponent,
    ToggleReactiveFormTestComponent,
    ToggleTestComponent
  ],
  exports: [
    ToggleChangeEventTestComponent,
    ToggleFormDirectivesTestComponent,
    ToggleOnPushTestComponent,
    ToggleReactiveFormTestComponent,
    ToggleTestComponent
  ]
})
export class ToggleTestModule { }
