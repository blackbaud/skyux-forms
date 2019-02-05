import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyPhoneFieldInputDirective
} from '../phone-field-input.directive';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './phone-field.component.fixture.html'
})
export class PhoneFieldTestComponent {

  @ViewChild(SkyPhoneFieldInputDirective)
  public inputDirective: SkyPhoneFieldInputDirective;

  public modelValue: string;

  public isDisabled: boolean = false;

  public defaultCountry: string;

  public noValidate: boolean = false;

}
