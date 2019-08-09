import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

import {
  SkyCharacterCounterInputDirective
} from '../character-counter.directive';

@Component({
  selector: 'character-count-test',
  templateUrl: './character-count.component.fixture.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterCountTestComponent implements OnInit {
  @ViewChild(SkyCharacterCounterInputDirective)
  public inputDirective: SkyCharacterCounterInputDirective;

  public testForm: FormGroup;
  public firstName: FormControl;

  public firstNameLabel: string = 'Field label';
  public maxCharacterCount: number = 5;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.firstName = this.formBuilder.control('test');

    this.testForm = this.formBuilder.group({
      firstName: this.firstName
    });

  }

  public setCharacterCountLimit(limit: number) {
    this.maxCharacterCount = limit;
    this.changeDetector.markForCheck();
  }
}
