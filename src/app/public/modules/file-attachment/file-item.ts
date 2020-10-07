import {
  SkyFileItemErrorType
} from './file-item-error-type';

export interface SkyFileItem {
  /**
   * The object that was added or removed.
   */
  file: File;
  /**
   * The data URL for the file which has been added or removed.
   */
  url: string;
  /**
   * The type of error that caused the file to be rejected.
   */
  errorType: SkyFileItemErrorType;
  /**
   * Additional parameters about the error that caused the file to be rejected.
   */
  errorParam: string;
}
