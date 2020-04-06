import {
  SkyFileItem
} from '../file-item';

import {
  SkyFileLink
} from '../file-link';

export interface SkyFileDropValue {

  files: Array<SkyFileItem>;
  links: Array<SkyFileLink>;

}
