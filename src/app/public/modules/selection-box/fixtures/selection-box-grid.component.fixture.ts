import {
  Component
} from '@angular/core';

import {
  SkySelectionBoxGridAlignItems
} from '../types/selection-box-grid-align-items';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './selection-box-grid.component.fixture.html'
})
export class SelectionBoxGridTestComponent {

  public alignItems: SkySelectionBoxGridAlignItems;

  public firstBoxHeight: string;
}
