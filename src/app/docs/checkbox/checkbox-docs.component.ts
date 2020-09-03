import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-checkbox-docs',
  templateUrl: './checkbox-docs.component.html'
})
export class CheckboxDocsComponent {

  public checkboxItems: any[] = [
    {
      label: 'Selected checkbox',
      checked: true,
      disabled: false
    },
    {
      label: 'Unselected checkbox',
      checked: false,
      disabled: false
    },
    {
      label: 'This checkbox cannot be selected right now',
      disabled: true
    }
  ];

  public iconCheckboxGroup: any[] = [
    {
      label: 'Bold',
      checked: true,
      icon: 'bold'
    },
    {
      label: 'Italic',
      checked: false,
      icon: 'italic'
    },
    {
      label: 'Underline',
      checked: false,
      icon: 'underline'
    }
  ];

}
