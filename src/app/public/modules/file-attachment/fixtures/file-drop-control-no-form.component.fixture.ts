import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyFileDropControlComponent
} from '../file-drop-control.component';

@Component({
  selector: 'file-drop-control-no-form-test',
  templateUrl: './file-drop-control-no-form.component.fixture.html'
})
export class FileDropControlNoFormTestComponent {

  public required: boolean = false;

  public showCustomContent: boolean = false;

  public showLabel: boolean = true;

  @ViewChild(SkyFileDropControlComponent)
  public fileAttachmentComponent: SkyFileDropControlComponent;

}
