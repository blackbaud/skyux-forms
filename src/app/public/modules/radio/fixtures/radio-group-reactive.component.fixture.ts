import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  template: `
    <form
      novalidate
      [formGroup]="myForm"
    >
      <sky-radio-group
        formControlName="myRadioGroup"
      >
        <sky-radio *ngFor="let item of items"
          [disabled]="item.disabled"
          [value]="item.value"
        >
          <sky-radio-label>
            {{ item.value }}
          </sky-radio-label>
        </sky-radio>
      </sky-radio-group>
    </form>
  `
})
export class SkyRadioGroupReactiveFixtureComponent implements OnInit {

  public items = [
    { value: '1', disabled: false },
    { value: '2', disabled: false },
    { value: '3', disabled: false }
  ];

  public myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      myRadioGroup: '2'
    });
  }
}
