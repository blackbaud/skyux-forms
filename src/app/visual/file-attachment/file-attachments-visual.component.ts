import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import {
  Component,
  OnInit
} from '@angular/core';

import {
  SkyFileDropChange,
  SkyFileItem,
  SkyFileLink
} from '../../public';

@Component({
  selector: 'file-attachments-visual',
  templateUrl: './file-attachments-visual.component.html'
})
export class FileAttachmentsVisualComponent implements OnInit {
  public acceptedTypes: Array<String>;

  public allItems: Array<SkyFileItem | SkyFileLink>;

  public allowLinks: boolean = true;

  public attachment: FormControl;

  public fileForm: FormGroup;

  public filesToUpload: Array<SkyFileItem>;

  public fileValue: SkyFileItem;

  public linksToUpload: Array<SkyFileLink>;

  public maxFileSize: number = 4000000;

  public rejectedFiles: Array<SkyFileItem>;

  public showLabel: boolean = true;

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

  public ngOnInit() {
    this.attachment = new FormControl(undefined, Validators.required);
    this.fileForm = this.formBuilder.group({
      attachment: this.attachment
    });
  }

  public filesUpdated(result: SkyFileDropChange) {
    this.filesToUpload = this.filesToUpload.concat(result.files);
    this.rejectedFiles = this.rejectedFiles.concat(result.rejectedFiles);
    this.allItems = this.allItems.concat(result.files);
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
