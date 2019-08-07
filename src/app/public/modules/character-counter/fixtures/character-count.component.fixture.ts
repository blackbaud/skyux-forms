import {
  Component,
  ViewChild,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {
  SkyCharacterCountInputDirective
} from '../character-counter.directive';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'character-count-test',
  templateUrl: './character-count.component.fixture.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterCountTestComponent implements OnInit {
  @ViewChild(SkyCharacterCountInputDirective)
  public inputDirective: SkyCharacterCountInputDirective;

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
