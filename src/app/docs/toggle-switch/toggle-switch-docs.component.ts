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
  public switchLable = 'Inactive';
  public showLable = true;
  public checked = false;

  public get switchStatus(): 'Active' | 'Inactive' {
    return (this.checked === true) ? 'Active' : 'Inactive';
  }

  public onDemoSelectionChange(change: SkyDocsDemoControlPanelChange): void {
    if (change.toggleLabel !== undefined) {
      this.showLable = change.toggleLabel;
    }

    if (this.showLable === true) {
      this.switchLable = this.switchStatus;
    }
    if (this.showLable === false) {
      this.switchLable = ' ';
    }
  }
}
