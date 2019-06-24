import { Component, OnInit } from '@angular/core';

import {
  SkyFileItem,
  SkyFileLink,
  SkyFileDropChange
} from '../../public';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'file-attachments-visual',
  templateUrl: './file-attachments-visual.component.html'
})
export class FileAttachmentsVisualComponent implements OnInit {
  public filesToUpload: Array<SkyFileItem>;

  public allItems: Array<SkyFileItem | SkyFileLink>;

  public linksToUpload: Array<SkyFileLink>;

  public rejectedFiles: Array<SkyFileItem>;

  public maxFileSize: number = 4000000;

  public acceptedTypes: Array<String>;

  public allowLinks: boolean = true;

  public required: boolean = false;

  public showLabel: boolean = false;

  public reactiveForm: FormGroup;

  public get reactiveFile(): FormControl {
    // console.log(this.reactiveForm.get('file').errors, this.reactiveForm.get('file').dirty, this.reactiveForm.get('file').touched);
    return this.reactiveForm.get('file') as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.filesToUpload = [];
    this.rejectedFiles = [];
    this.allItems = [<SkyFileItem>{
      file: {
        name: 'myfile.pdf',
        size: 50,
        type: 'pdf'
      }
    }];
    this.linksToUpload = [];
  }

  public ngOnInit(): void {
    this.reactiveForm = this.formBuilder.group({
      file: new FormControl(undefined, Validators.required)
    });
  }

  public filesUpdated(result: SkyFileDropChange) {
    this.filesToUpload = this.filesToUpload.concat(result.files);
    this.rejectedFiles = this.rejectedFiles.concat(result.rejectedFiles);
    this.allItems = this.allItems.concat(result.files);
    console.log(this.filesToUpload, this.rejectedFiles, this.allItems);
  }

  public singleFileUpdated(result: SkyFileDropChange) {
    console.log(result);
  }

  public linkAdded(result: SkyFileLink) {
    this.linksToUpload = this.linksToUpload.concat(result);
    this.allItems = this.allItems.concat(result);
  }

  public validateFile(file: SkyFileItem) {
    if (file.file.name.indexOf('a') === 0) {
        return 'You may not upload a file that begins with the letter "a."';
    } else {
      return '';
    }
  }

  public deleteFile(file: SkyFileItem | SkyFileLink) {
    this.removeFromArray(this.allItems, file);
    this.removeFromArray(this.filesToUpload, file);
    this.removeFromArray(this.linksToUpload, file);
  }

  private removeFromArray(items: Array<any>, obj: SkyFileItem | SkyFileLink) {
    if (items) {
      const index = items.indexOf(obj);

      if (index !== -1) {
        items.splice(index, 1);
      }
    }
  }
}
