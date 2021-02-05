import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

import {
  SkyThemeService,
  SkyThemeSettings
} from '@skyux/theme';

@Component({
  selector: 'selection-box-visual',
  templateUrl: './selection-box-visual.component.html'
})
export class SelectionBoxVisualComponent implements OnInit {

  public checkboxArray: any = [
    {
      icon: 'edit',
      iconType: 'skyux',
      header: 'Write an introduction',
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
      icon: 'check',
      iconType: 'skyux',
      header: 'Boost Engagement',
      description: 'Encourage supporters to interact with your organization',
      name: 'engagement'
    },
    {
      icon: 'filter',
      iconType: 'skyux',
      header: 'Build relationships',
      description: 'Connect to supporters on a personal level and maintain accurate date',
      name: 'relationships'
    },
    {
      icon: 'search',
      iconType: 'skyux',
      header: 'Drive performance',
      description: 'Enourage supporters to interact with your organization',
      name: 'performance'
    }
  ];

  public myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private themeSvc: SkyThemeService
  ) { }

  public ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      radioGroup: new FormControl(),
      checkboxGroup: this.formBuilder.array([
        new FormControl(),
        new FormControl(),
        new FormControl()
      ]),
      checkboxNoIconsGroup: this.formBuilder.array([
        new FormControl(),
        new FormControl(),
        new FormControl()
      ])
    });
  }

  public onSubmit(value: any): void {
    console.warn(value);
  }

  public themeSettingsChange(themeSettings: SkyThemeSettings): void {
    this.themeSvc.setTheme(themeSettings);
  }
}
