import {
  Component,
  Input,
  OnDestroy
} from '@angular/core';

import {
  SkyMediaBreakpoints,
  SkyMediaQueryService
} from '@skyux/core';

import {
  Subscription
} from 'rxjs';

const FONTSIZECLASS_SMALL = 'lg';
const FONTSIZECLASS_LARGE = '2x';

/**
 * Specifies an icon to display on the action button.
 */
@Component({
  selector: 'sky-selection-box-icon',
  styleUrls: ['./selection-box-icon.component.scss'],
  templateUrl: './selection-box-icon.component.html'
})
export class SkySelectionBoxIconComponent implements OnDestroy {

/**
 * Specifies the name of the
 * [Font Awesome](https://developer.blackbaud.com/design/styles/icons) icon to display.
 * Do not specify the `fa fa-` classes.
 * @required
 */
  @Input()
  public icon: string;

  /**
   * Specifies the type of icon to display. Specifying fa will display a Font Awesome icon,
   * while specifying skyux will display an icon from the custom SKY UX icon font.
   * Note that the custom SKY UX icon font is currently in beta.
   * @default "fa"
   */
  @Input()
  public iconType: string;

  public fontSizeClass: string = FONTSIZECLASS_LARGE;

  private subscription: Subscription;

  constructor(private mediaQueryService: SkyMediaQueryService) {
    this.subscription = this.mediaQueryService.subscribe((args: SkyMediaBreakpoints) => {
      if (args === SkyMediaBreakpoints.xs) {
        this.fontSizeClass = FONTSIZECLASS_SMALL;
      } else {
        this.fontSizeClass = FONTSIZECLASS_LARGE;
      }
    });
  }

  public ngOnDestroy() {
    /* istanbul ignore else */
    /* sanity check */
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
