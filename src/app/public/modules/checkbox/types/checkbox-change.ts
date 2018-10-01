import { SkyCheckboxComponent } from '../checkbox.component';

// A simple change event emitted by the SkyCheckbox component.
export class SkyCheckboxChange {
  public source: SkyCheckboxComponent;
  public checked: boolean;
}
