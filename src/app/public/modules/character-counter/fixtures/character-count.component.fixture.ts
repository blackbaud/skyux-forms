import {
  Component,
  ViewChild
} from '@angular/core';
import {
  SkyCharacterCountInputDirective
} from '../character-counter.directive';

@Component({
  selector: 'character-count-test',
  templateUrl: './character-count.component.fixture.html'
})
export class CharacterCountTestComponent {
  @ViewChild(SkyCharacterCountInputDirective)
  public inputDirective: SkyCharacterCountInputDirective;

  public inputText: string = 'test';

  public inputLabel: string = 'Character Count Input';
}
