import {
  Component,
  ViewChild,
  OnInit
} from '@angular/core';

import {
  SkyFileAttachmentComponent
} from '../file-attachment.component';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'file-attachment-test',
  templateUrl: './file-attachment.component.fixture.html'
})
export class FileAttachmentTestComponent implements OnInit {
  @ViewChild(SkyFileAttachmentComponent)
  public fileAttachmentComponent: SkyFileAttachmentComponent;

  public showLabel: boolean = true;

  public fileForm: FormGroup;

  public attachment: FormControl;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.attachment = new FormControl(undefined, Validators.required);
    this.fileForm = this.formBuilder.group({
      attachment: this.attachment
    });
  }
}
