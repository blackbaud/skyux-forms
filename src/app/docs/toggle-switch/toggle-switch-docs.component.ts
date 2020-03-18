import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  SkyDocsDemoControlPanelChange,
  SkyDocsDemoControlPanelRadioChoice
} from '@skyux/docs-tools';

@Component({
  selector: 'app-toggle-switch-docs',
  templateUrl: './toggle-switch-docs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleSwitchDocsComponent { }
