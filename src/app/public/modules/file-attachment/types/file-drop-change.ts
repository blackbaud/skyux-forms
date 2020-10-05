import {
  SkyFileItem
} from '../file-item';

export interface SkyFileDropChange {
  /**
   * Specifies an array of files which have been added or removed.
   */
  files: Array<SkyFileItem>;
  /**
   * Specifies an array of files which have been rejected.
   */
  rejectedFiles: Array<SkyFileItem>;
}
