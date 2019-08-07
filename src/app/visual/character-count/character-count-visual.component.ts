import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'character-count-visual',
  templateUrl: './character-count-visual.component.html'
})
export class CharacterCountVisualComponent implements OnInit {

  public testForm: FormGroup;
  public firstName: FormControl;

  public firstNameLabel: string = 'Field label';
  public maxCharacterCount: number = 10;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.firstName = this.formBuilder.control('test');

    this.testForm = this.formBuilder.group({
      firstName: this.firstName
    });

  }

  public inc() {
    this.maxCharacterCount++;
  }

  public dec() {
    this.maxCharacterCount--;
  }
}
