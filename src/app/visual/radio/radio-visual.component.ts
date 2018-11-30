import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'radio-visual',
  templateUrl: './radio-visual.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioVisualComponent implements OnInit {
  public selectedValue = '3';
  public iconSelectedValue = '1';
  public valueGuy = '2';
  public radioForm: FormGroup;

  public seasons = [
    { name: 'Spring', disabled: false },
    { name: 'Summer', disabled: false },
    { name: 'Fall', disabled: true },
    { name: 'Winter', disabled: false }
  ];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.radioForm = this.formBuilder.group({
      favoriteSeason: this.seasons[0]
    });
  }

  public changeValue() {
    this.iconSelectedValue = this.iconSelectedValue === '3' ? '1' : '3';
  }
}
