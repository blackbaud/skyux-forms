import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

import {
  SkyFileDropControlComponent
} from '../file-drop-control.component';

@Component({
  selector: 'file-drop-control-test',
  templateUrl: './file-drop-control.component.fixture.html'
})
export class FileDropControlTestComponent implements OnInit {

  public attachment: FormControl;

  public fileForm: FormGroup;

  public required: boolean = false;

  public showCustomContent: boolean = false;

  public showLabel: boolean = true;

  @ViewChild(SkyFileDropControlComponent)
  public fileAttachmentComponent: SkyFileDropControlComponent;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.attachment = new FormControl(undefined);
    this.fileForm = this.formBuilder.group({
      attachment: this.attachment
    });
  }
}
