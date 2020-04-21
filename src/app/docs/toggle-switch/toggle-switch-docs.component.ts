import {
  Component
} from '@angular/core';

import {
  SkyDocsDemoControlPanelChange
} from '@skyux/docs-tools';

@Component({
  selector: 'app-toggle-switch-docs',
  templateUrl: './toggle-switch-docs.component.html'
})

export class ToggleSwitchComponent {
  public demoSettings: any = {};
  public switchLabel = 'Inactive';
  public showLabel = true;
  public checked = false;

  public get switchStatus(): 'Active' | 'Inactive' {
    return (this.checked === true) ? 'Active' : 'Inactive';
  }

  public onDemoSelectionChange(change: SkyDocsDemoControlPanelChange): void {
    if (change.toggleLabel !== undefined) {
      this.showLabel = change.toggleLabel;
    }

    if (this.showLabel === true) {
      this.switchLabel = this.switchStatus;
    }
    if (this.showLabel === false) {
      this.switchLabel = ' ';
    }
  }
}
