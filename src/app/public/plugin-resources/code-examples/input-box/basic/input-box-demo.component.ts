import {
  Component
} from '@angular/core';

import {
  SkyTheme,
  SkyThemeMode,
  SkyThemeSettings
} from '@skyux/theme';

@Component({
  selector: 'app-input-box-demo',
  templateUrl: './input-box-demo.component.html'
})
export class InputBoxDemoComponent {

  /**
   * The Input box component works best in modern theme. This is purely for demonstration purposes.
   */
  public modernLightTheme = new SkyThemeSettings(
    SkyTheme.presets.modern,
    SkyThemeMode.presets.light
  );

}
