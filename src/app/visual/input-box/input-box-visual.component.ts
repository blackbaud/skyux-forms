import {
  Component
} from '@angular/core';

import {
  SkyThemeService,
  SkyThemeSettings
} from '@skyux/theme';

@Component({
  selector: 'input-box-visual',
  templateUrl: './input-box-visual.component.html',
  styleUrls: ['./input-box-visual.component.scss']
})
export class InputBoxVisualComponent {

  constructor(private themeSvc: SkyThemeService) { }

  public themeSettingsChange(themeSettings: SkyThemeSettings) {
    this.themeSvc.setTheme(themeSettings);
  }

}
