import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  SkyLibResourcesService
} from '@skyux/i18n';

import {
  Subject
} from 'rxjs/Subject';

@Component({
  selector: 'sky-character-counter-indicator',
  templateUrl: './character-counter-indicator.component.html',
  styleUrls: ['./character-counter-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyCharacterCounterIndicatorComponent implements OnInit {

  public currentCharacterCountLimit: number = 0;
  public currentCharacterCount: number = 0;
  public characterCountMessage: string;
  public overLimitMessage: string;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private libResources: SkyLibResourcesService
  ) { }

  public ngOnInit(): void {
    this.getCharacterCountMessage();
  }

  public get characterCount(): number {
    return this.currentCharacterCount;
  }

  public set characterCount(count: number) {
    this.currentCharacterCount = count;
    this.getCharacterCountMessage();
    this.changeDetector.markForCheck();
  }

  public get characterCountLimit(): number {
    return this.currentCharacterCountLimit;
  }

  public set characterCountLimit(limit: number) {
    this.currentCharacterCountLimit = limit;
    this.getCharacterCountMessage();
    this.changeDetector.markForCheck();
  }

  public getCharacterCountMessage(): void {
    this.libResources.getString(
      'skyux_character_count_message',
      this.characterCount,
      this.characterCountLimit
    )
      .takeUntil(this.ngUnsubscribe)
      .subscribe(label => {
        this.characterCountMessage = label;
    });
  }
}
