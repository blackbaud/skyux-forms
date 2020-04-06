import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyFileDropControlComponent
} from '../file-drop-control.component';

import {
  SkyFileDropValue
} from '../types/file-drop-value';

@Component({
  selector: 'file-drop-control-template-test',
  templateUrl: './file-drop-control-template.component.fixture.html'
})
export class FileDropControlTemplateTestComponent {

  public attachment: SkyFileDropValue;

  public required: boolean = false;

  public showCustomContent: boolean = false;

  public showLabel: boolean = true;

  @ViewChild(SkyFileDropControlComponent)
  public fileAttachmentComponent: SkyFileDropControlComponent;

}
