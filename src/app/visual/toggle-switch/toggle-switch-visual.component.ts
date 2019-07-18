import {
  Component
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'toggle-switch-visual',
  templateUrl: './toggle-switch-visual.component.html'
})
export class ToggleSwitchVisualComponent {

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      notifyByEmail: new FormControl(true)
    });
  }

  public onReadonlyClick(): void {
    const control = this.formGroup.get('notifyByEmail');

    if (control.disabled) {
      control.enable();
    } else {
      control.disable();
    }
  }

}
