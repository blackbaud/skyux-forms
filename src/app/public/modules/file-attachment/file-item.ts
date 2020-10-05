import {
  SkyFileItemErrorType
} from './file-item-error-type';

export interface SkyFileItem {
  /**
   * The object which has been added or removed.
   */
  file: File;
  /**
   * The data URL for the file which has been added or removed.
   */
  url: string;
  /**
   * The type of error which caused the file to be rejected.
   */
  errorType: SkyFileItemErrorType;
  /**
   * Additional paramaters regarding the error which caused the file to be rejected.
   */
  errorParam: string;
}
