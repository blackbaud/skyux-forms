import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

import {
  SkyThemeService,
  SkyThemeSettings
} from '@skyux/theme';

@Component({
  selector: 'radio-visual',
  templateUrl: './radio-visual.component.html'
})
export class RadioVisualComponent implements OnInit {

  public disabled: boolean;

  public iconSelectedValue = '1';

  public radioForm: FormGroup;

  public radioValue: any;

  public required: boolean = false;

  public seasons = [
    { id: 1, name: 'Spring', disabled: false, checked: false },
    { id: 2, name: 'Summer', disabled: false, checked: false },
    { id: 3, name: 'Fall', disabled: false, checked: false },
    { id: 4, name: 'Winter', disabled: false, checked: false }
  ];

  public selectedValue = '3';

  constructor(
    private formBuilder: FormBuilder,
    private themeSvc: SkyThemeService,
    private changeRef: ChangeDetectorRef
  ) { }

  public onButtonClick(index: number): void {
    this.seasons[index].checked = true;
    this.changeRef.detectChanges();
  }

  public ngOnInit(): void {
    this.radioForm = this.formBuilder.group({
      favoriteSeason: this.seasons[0]
    });
  }

  public onToggleDisabledClick(): void {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.radioForm.disable();
    } else {
      this.radioForm.enable();
    }
  }

  public themeSettingsChange(themeSettings: SkyThemeSettings): void {
    this.themeSvc.setTheme(themeSettings);
  }
}
