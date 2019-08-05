import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef
} from '@angular/core';

export class SkyInputChange {
  public text: string;
}

@Component({
  selector: 'sky-character-count',
  templateUrl: './character-count.component.html',
  styleUrls: ['./character-count.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyCharacterCountComponent {
  @Input()
  public maxCharacterCount: number;

  @Output()
  public textChanged: EventEmitter<SkyInputChange> = new EventEmitter<SkyInputChange>();

  public text: string;

  public labelText: string = 'response';

  public showErrorMessage: boolean = false;
  public exceededLimit: boolean = false;

  public inputLength: number = 0;

  constructor(private changeDetector: ChangeDetectorRef) {}

  public get currentInputLength() {
    return this.inputLength;
  }

  public set currentInputLength(newLength: number) {
    this.inputLength = newLength;
    this.exceededLimit = this.inputLength > this.maxCharacterCount;
    this.changeDetector.markForCheck();
  }

  public get currentText() {
    return this.text;
  }

  public set currentText(newText: string) {
    this.text = newText;
    this.showErrorMessage = this.text && (this.text.length > this.maxCharacterCount);
    this.changeDetector.markForCheck();
  }

  public get currentLabelText() {
    return this.labelText;
  }

  public set currentLabelText(newLabel: string) {
    this.labelText = newLabel;
  }
}
