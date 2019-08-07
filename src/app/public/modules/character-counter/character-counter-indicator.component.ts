import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'sky-character-counter-indicator',
  templateUrl: './character-counter-indicator.component.html',
  styleUrls: ['./character-counter-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyCharacterCounterIndicatorComponent {

  public currentCharacterCountLimit: number = 0;

  public currentCharacterCount: number = 0;

  constructor(private changeDetector: ChangeDetectorRef) {}

  public get characterCount() {
    return this.currentCharacterCount;
  }

  public set characterCount(count: number) {
    this.currentCharacterCount = count;
    this.changeDetector.markForCheck();
  }

  public set characterCountLimit(limit: number) {
    this.currentCharacterCountLimit = limit;
    this.changeDetector.markForCheck();
  }
}
