import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'selection-box-visual',
  templateUrl: './selection-box-visual.component.html'
})
export class SelectionBoxVisualComponent implements OnInit {

  public getStartedArray: any = [
    {
      icon: 'edit',
      iconType: 'skyux',
      header: 'Write an introduction about things that make this sentence long',
      description: 'A brief one paragraph introduction about your organzation will help supporters identify with your cause'
    },
    {
      icon: 'calendar',
      iconType: 'skyux',
      header: 'Schedule a consultation',
      description: 'Get something on the calendar to engage your constituents!'
    },
    {
      icon: 'clock',
      iconType: 'skyux',
      header: 'Save time and effort',
      description: 'Encourage supporters to interact with your organization'
    }
  ];

  public radioArray: any = [
    {
      icon: 'edit',
      iconType: 'skyux',
      header: 'Red',
      name: 'red',
      description: 'A great choice'
    },
    {
      icon: 'edit',
      iconType: 'skyux',
      header: 'Yellow',
      name: 'yellow',
      description: 'Eh, you can do better.'
    },
    {
      icon: 'edit',
      iconType: 'skyux',
      header: 'Blue',
      name: 'blue',
      description: 'Yes, this is a color'
    }
  ];

  public myForm: FormGroup;

  // Padding to be applied to the action button container so that the focus outline
  // is fully visible in the screenshot.
  public containerPadding: number = 0;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      getStarted: this.formBuilder.array([
        new FormControl(),
        new FormControl(true),
        new FormControl()
      ]),
      favoriteColor: new FormControl()
    });
  }

  public onChecked(value: any) {
    console.warn(value);
  }

  public onSubmit(value: any): void {
    console.warn(value);
  }
}
