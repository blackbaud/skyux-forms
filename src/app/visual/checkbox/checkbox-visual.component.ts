import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'checkbox-visual',
  templateUrl: './checkbox-visual.component.html'
})
export class CheckboxVisualComponent implements OnInit {

  public checkValue: boolean = true;

  public foo: boolean;

  public bar: boolean;

  public reactiveFormGroup: FormGroup;

  public required: boolean = true;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.reactiveFormGroup = this.formBuilder.group(
      { reactiveCheckbox: [ undefined, Validators.requiredTrue ] }
    );
  }

  public toggleRequired(): void {
    this.required = !this.required;
    if (this.required) {
      this.reactiveFormGroup.get('reactiveCheckbox').setValidators(Validators.requiredTrue);
    } else {
      this.reactiveFormGroup.get('reactiveCheckbox').setValidators(undefined);
    }

    this.reactiveFormGroup.get('reactiveCheckbox').updateValueAndValidity();
  }

}
