import { Component } from '@angular/core';

@Component({
  selector: 'character-count-visual',
  templateUrl: './character-count-visual.component.html'
})
export class CharacterCountVisualComponent {

  public myInputText: string = 'test';

  public inputLabel: string = 'Character Count Input';

  public changeLabel() {
    this.inputLabel = this.inputLabel + '1';
  }
}
