import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyFileAttachmentComponent
} from '../file-attachment.component';

@Component({
  selector: 'file-attachment-test',
  templateUrl: './file-attachment-template.component.fixture.html'
})
export class FileAttachmentTemplateTestComponent {

  public disabled: boolean = false;

  @ViewChild(SkyFileAttachmentComponent)
  public fileAttachmentComponent: SkyFileAttachmentComponent;
}
