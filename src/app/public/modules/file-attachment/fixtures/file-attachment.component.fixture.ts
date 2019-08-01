import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyFileAttachmentComponent
} from '../file-attachment.component';

@Component({
  selector: 'file-attachment-test',
  templateUrl: './file-attachment.component.fixture.html'
})
export class FileAttachmentTestComponent {
  @ViewChild(SkyFileAttachmentComponent)
  public fileDropComponent: SkyFileAttachmentComponent;
}
