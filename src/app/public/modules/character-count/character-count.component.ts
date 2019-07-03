import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from "@angular/core";

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
  public maxCharacterCount: string;

  @Output()
  public textChanged: EventEmitter<SkyInputChange> = new EventEmitter<SkyInputChange>();

  public text: string;

  public get currentText() {
    return this.text;
  }

  public set currentText(newText: string) {
    this.text = newText;
  }
}
