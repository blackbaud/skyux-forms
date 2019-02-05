import {
  Component
} from '@angular/core';

@Component({
  selector: 'phone-field-visual',
  templateUrl: './phone-field-visual.component.html'
})
export class PhoneFieldVisualComponent {

  public phoneNumber: string;

  public phoneNumber2: string;

  constructor() { }
}
