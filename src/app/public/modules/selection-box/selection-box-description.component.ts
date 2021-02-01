import {
  Component
} from '@angular/core';

import {
  SkyThemeService
} from '@skyux/theme';

/**
 * Specifies a description to display on a selection box.
 */
@Component({
  selector: 'sky-selection-box-description',
  templateUrl: './selection-box-description.component.html'
})
export class SkySelectionBoxDescriptionComponent {

  constructor(
    public themeSvc: SkyThemeService
  ) {}

}
