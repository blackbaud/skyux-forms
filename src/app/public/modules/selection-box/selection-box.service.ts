import {
  Injectable
} from "@angular/core";

import {
  BehaviorSubject
} from "rxjs";

import {
  SkySelectionBoxGroupValueType
} from "./type/selection-box-group-value-type";

/**
 * @internal
 */
@Injectable()
export class SkySelectionBoxService {

  public selectedValue: BehaviorSubject<SkySelectionBoxGroupValueType> =
    new BehaviorSubject<SkySelectionBoxGroupValueType>(undefined);

}
