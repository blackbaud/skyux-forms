import {
  Directive,
  forwardRef,
  Provider
} from '@angular/core';

import {
  CheckboxRequiredValidator,
  NG_VALIDATORS
} from '@angular/forms';

// tslint:disable:no-forward-ref
export const SKY_CHECKBOX_REQUIRED_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SkyCheckboxRequiredValidatorDirective),
  multi: true
};
// tslint:enable

/**
 * Validator support for the `required` input on `sky-checkbox`.
 * Angular's `CheckboxRequiredValidator` only works with `input type=checkbox`. This directive
 * extends the angular validator to work with `sky-checkbox` tags.
 */
@Directive({
  selector: `sky-checkbox[required][formControlName],
             sky-checkbox[required][formControl], sky-checkbox[required][ngModel]`,
  providers: [SKY_CHECKBOX_REQUIRED_VALIDATOR]
})
export class SkyCheckboxRequiredValidatorDirective extends CheckboxRequiredValidator {}
