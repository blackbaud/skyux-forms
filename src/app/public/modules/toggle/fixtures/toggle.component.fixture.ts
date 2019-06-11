import {
  Component
} from '@angular/core';

@Component({
  templateUrl: './toggle.component.fixture.html'
})
export class ToggleTestComponent {
  public isToggled: boolean = false;
  public isDisabled: boolean = false;
  public customTabIndex: number = 0;
  public labelledById: string;
  public multiple: boolean = false;

  public toggleChange($event: any) {
    this.isToggled = $event.toggled;
  }
}
