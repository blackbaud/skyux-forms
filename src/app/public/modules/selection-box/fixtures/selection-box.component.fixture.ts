import {
  Component
} from '@angular/core';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './selection-box.component.fixture.html'
})
export class SelectionBoxTestComponent {

  public buttonIsClicked: boolean = false;

  public buttonClicked() {
    this.buttonIsClicked = true;
  }
}
