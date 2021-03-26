import {
  Component,
  OnInit
} from '@angular/core';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-selection-box-demo',
  templateUrl: './selection-box-demo.component.html'
})
export class SelectionBoxDemoComponent implements OnInit {

  public get checkboxArray(): AbstractControl {
    return this.myForm.get('checkboxes');
  }

  public selectionBoxes: any[] = [
    {
      name: 'Save time and effort',
      icon: 'clock',
      description:
        'Automate mundane tasks and spend more time on the things that matter'
    },
    {
      name: 'Boost Engagement',
      icon: 'user',
      description: 'Encourage supporters to interact with your organization'
    },
    {
      name: 'Build Relationships',
      icon: 'users',
      description:
        'Connect to supporters on a personal level and maintain accurate data'
    }
  ];

  public myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      checkboxes: this.buildCheckboxes()
    });

    this.myForm.valueChanges.subscribe(value => console.log(value));
  }

  private buildCheckboxes(): FormArray {
    const checkboxArray = this.selectionBoxes.map(checkbox => {
      return this.formBuilder.control(checkbox.selected);
    });
    return this.formBuilder.array(checkboxArray);
  }
}
