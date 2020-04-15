import {
  Component
} from '@angular/core';

import {
  SkyDocsDemoControlPanelChange
} from '@skyux/docs-tools';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-toggle-switch-docs',
  templateUrl: './toggle-switch-docs.component.html',
})

export class ToggleSwitchComponent {
  public demoSettings: any = {};
  public switchLable = "Inactive";
  public showLable = true;

  public get switchStatus(): 'Active' | 'Inactive' {
    return (this.checked === true) ? 'Active' : 'Inactive';
  }

  public onDemoSelectionChange(change: SkyDocsDemoControlPanelChange): void {
    if (change.toggleLabel !== undefined) this.showLable = change.toggleLabel;

    if (this.showLable === true) {
      this.switchLable = this.switchStatus;
    }
    else if (this.showLable === false) {
      this.switchLable = ' ';
    }
  }
}
