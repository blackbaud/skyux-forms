import {
  SkyFileItem
} from '../file-item';

export interface SkyFileAttachmentChange {
  /**
   * Specifies the file which has been added or removed.
   */
  file: SkyFileItem;
}
