import {
  Component
} from '@angular/core';

@Component({
  templateUrl: './toggle.component.fixture.html'
})
export class ToggleTestComponent {
  public isChecked: boolean = false;
  public isDisabled: boolean = false;
  public customTabIndex: number = 0;
  public labelledById: string;
  public multiple: boolean = false;

  public checkChanged($event: any) {
    this.isChecked = $event.checked;
  }
}
