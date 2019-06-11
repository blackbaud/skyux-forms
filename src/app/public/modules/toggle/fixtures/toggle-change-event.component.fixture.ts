import {
  Component
} from '@angular/core';

import {
  SkyToggleChange
} from '../types';

@Component({
  templateUrl: './toggle-change-event.component.fixture.html'
})
export class ToggleChangeEventTestComponent {
  public lastEvent: SkyToggleChange;
}
