import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';

@Component({
  templateUrl: './toggle-on-push.component.fixture.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleOnPushTestComponent {
  public isToggled: boolean = false;
  constructor(public ref: ChangeDetectorRef) { }
}
