import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

import {
  SkyFileItem
} from './file-item';

import {
  SkyFileLink
} from './file-link';

import {
  SkyFileDropChange
} from './file-drop-change';

@Component({
  selector: 'sky-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss']
})
export class SkyFileDropComponent {
  @Output()
  public filesChanged = new EventEmitter<SkyFileDropChange>();

  @Output()
  public linkChanged = new EventEmitter<SkyFileLink>();

  @Input()
  public minFileSize: number = 0;

  @Input()
  public maxFileSize: number = 500000;

  @Input()
  public multiple: boolean = true;

  @Input()
  public validateFn: Function;

  @Input()
  public acceptedTypes: string;

  @Input()
  public noClick: boolean = false;

  @Input()
  public allowLinks: boolean = false;

  @Input()
  public singleFile: boolean = false;

  @Input()
  public required: boolean = false;

  @ViewChild('fileInput')
  public inputEl: ElementRef;

  @ViewChild('labelWrapper')
  public labelWrap: ElementRef;

  public rejectedOver: boolean = false;
  public acceptedOver: boolean = false;
  public linkUrl: string;
  public singleFileAttachment: SkyFileItem;

  private enterEventTarget: any;

  public hasLabel() {
    return this.labelWrap.nativeElement.children.length > 0;
  }

  public dropClicked() {
    if (!this.noClick) {
      this.inputEl.nativeElement.click();
    }
  }

  public fileChangeEvent(fileChangeEvent: any) {
    this.handleFiles(fileChangeEvent.target.files);
  }

  public fileDragEnter(dragEnterEvent: any) {
    // Save this target to know when the drag event leaves
    this.enterEventTarget = dragEnterEvent.target;
    dragEnterEvent.stopPropagation();
    dragEnterEvent.preventDefault();
  }

  public fileDragOver(dragOverEvent: any) {
    const transfer = dragOverEvent.dataTransfer;

    dragOverEvent.stopPropagation();
    dragOverEvent.preventDefault();

    if (transfer) {
      if (transfer.items) {
        const files = transfer.items;

        for (let index = 0; index < files.length; index++) {
          const file: any = files[index];

          if (file.type && this.fileTypeRejected(file.type)) {
            this.rejectedOver = true;
            this.acceptedOver = false;
            return;
          }
        }

        if (files.length > 0 && !this.acceptedOver) {
          this.rejectedOver = false;
          this.acceptedOver = true;
        }

      } else if (transfer.files) {
        // If the browser does not support DataTransfer.items,
        // defer file-type checking to drop handler.
        // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/items#Browser_compatibility
        this.rejectedOver = false;
        this.acceptedOver = true;
      }
    }
  }

  public fileDrop(dropEvent: any) {
    dropEvent.stopPropagation();
    dropEvent.preventDefault();

    this.enterEventTarget = undefined;
    this.rejectedOver = false;
    this.acceptedOver = false;

    if (dropEvent.dataTransfer && dropEvent.dataTransfer.files) {
      if (this.verifyDropFiles(dropEvent.dataTransfer.files)) {
        this.handleFiles(dropEvent.dataTransfer.files);
      }
    }
  }

  public fileDragLeave(dragLeaveEvent: any) {
    if (this.enterEventTarget === dragLeaveEvent.target) {
      this.rejectedOver = false;
      this.acceptedOver = false;
    }
  }

  public addLinkEnter(event: KeyboardEvent) {
    if (event.which === 13) {
      this.addLink(event);
    }
  }

  public addLink(event: Event) {
    event.preventDefault();
    this.linkChanged.emit({ url: this.linkUrl } as SkyFileLink);
    this.linkUrl = undefined;
  }

  public singleAttachmentDelete() {
    this.singleFileAttachment = undefined;
    this.emitFileChangeEvent(0, [], []);
  }

  public isImg() {
    let fileTypeUpper = this.getFileTypeUpper(),
                        slashIndex: number;

    slashIndex = fileTypeUpper.indexOf('/');

    if (slashIndex >= 0) {
      switch (fileTypeUpper.substr(fileTypeUpper.indexOf('/') + 1)) {
        case 'BMP':
        case 'GIF':
        case 'JPEG':
        case 'PNG':
          return true;
        default:
          break;
      }
    }

    return false;
  }

  public getSingleFileName() {
    if (this.singleFileAttachment) {
      // tslint:disable-next-line: max-line-length
      let dropName = this.isFile() && this.singleFileAttachment.file.name ? this.singleFileAttachment.file.name : this.singleFileAttachment.url;

      if (dropName.length > 26) {
        return dropName.slice(0, 26) + '....';
      } else {
        return dropName;
      }
    } else {
      return 'No file chosen';
    }
  }

  private isFile() {
    let file = (<SkyFileItem>this.singleFileAttachment).file;

    /* tslint:disable */
    return file && file !== undefined && file !== null && file.size !== undefined
      && file.size !== null;
    /* tslint:enable */
  }

  private getFileTypeUpper() {
    let fileType = '';
    /* istanbul ignore else */
    /* sanity check */
    if (this.singleFileAttachment) {
      let file = (<SkyFileItem>this.singleFileAttachment).file;
      if (file) {
        fileType = file.type || '';
      } else {
        fileType = '';
      }
    }

    return fileType.toUpperCase();
  }

  private emitFileChangeEvent(
    totalFiles: number,
    rejectedFileArray: Array<SkyFileItem>,
    validFileArray: Array<SkyFileItem>
  ) {
    if (totalFiles === rejectedFileArray.length + validFileArray.length) {
      if (this.singleFile) {
        if (validFileArray.length > 0) {
          this.singleFileAttachment = validFileArray[0];
        }
      }
      this.filesChanged.emit({
        files: validFileArray,
        rejectedFiles: rejectedFileArray
      } as SkyFileDropChange);

      this.inputEl.nativeElement.value = '';
    }
  }

  private filesRejected(
    file: SkyFileItem,
    validFileArray: Array<SkyFileItem>,
    rejectedFileArray: Array<SkyFileItem>,
    totalFiles: number
  ) {
    rejectedFileArray.push(file);
    this.emitFileChangeEvent(totalFiles, rejectedFileArray, validFileArray);
  }

  private loadFile(
    fileDrop: SkyFileDropComponent,
    file: SkyFileItem,
    validFileArray: Array<SkyFileItem>,
    rejectedFileArray: Array<SkyFileItem>,
    totalFiles: number
  ) {
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      file.url = event.target.result;
      validFileArray.push(file);
      fileDrop.emitFileChangeEvent(totalFiles, rejectedFileArray, validFileArray);
    });

    reader.addEventListener('error', (event: any) => {
      fileDrop.filesRejected(file, validFileArray, rejectedFileArray, totalFiles);
    });

    reader.addEventListener('abort', (event: any) => {
      fileDrop.filesRejected(file, validFileArray, rejectedFileArray, totalFiles);
    });

    reader.readAsDataURL(file.file);
  }

  private getMimeSubtype(type: string) {
    return type.substr(type.indexOf('/') + 1, type.length);
  }

  private getMimeMainType(type: string) {
    return type.substr(0, type.indexOf('/'));
  }

  private fileTypeInArray(typeArray: string[], fileType: string) {
    if (typeArray.indexOf(fileType) !== -1) {
      return true;
    }

    for (let index = 0; index < typeArray.length; index++) {
      const type = typeArray[index];
      const validSubtype = this.getMimeSubtype(type);

      if (validSubtype === '*') {
        if (this.getMimeMainType(type) === this.getMimeMainType(fileType)) {
          return true;
        }
      }
    }

    return false;
  }

  private fileTypeRejected(fileType: string) {
    if (!this.acceptedTypes) {
      return false;
    }

    if (!fileType) {
      return true;
    }

    let acceptedTypesUpper = this.acceptedTypes.toUpperCase();
    let typeArray = acceptedTypesUpper.split(',');

    return !this.fileTypeInArray(typeArray, fileType.toUpperCase());
  }

  private handleFiles(files: FileList) {
    let validFileArray: Array<SkyFileItem> = [];
    let rejectedFileArray: Array<SkyFileItem> = [];
    let totalFiles = files.length;
    let fileDrop = this;

    for (let index = 0; index < files.length; index++) {
      let fileItem = {
        file: files.item(index)
      } as SkyFileItem;

      if (fileItem.file.size < this.minFileSize) {
        fileItem.errorType = 'minFileSize';
        fileItem.errorParam = this.minFileSize.toString();
        this.filesRejected(fileItem, validFileArray, rejectedFileArray, totalFiles);

      } else if (fileItem.file.size > this.maxFileSize) {
        fileItem.errorType = 'maxFileSize';
        fileItem.errorParam = this.maxFileSize.toString();
        this.filesRejected(fileItem, validFileArray, rejectedFileArray, totalFiles);

      } else if (this.fileTypeRejected(fileItem.file.type)) {
        fileItem.errorType = 'fileType';
        fileItem.errorParam = this.acceptedTypes;
        this.filesRejected(fileItem, validFileArray, rejectedFileArray, totalFiles);

      } else if (this.validateFn) {
        let errorParam = this.validateFn(fileItem);

        if (!!errorParam) {
          fileItem.errorType = 'validate';
          fileItem.errorParam = errorParam;
          this.filesRejected(fileItem, validFileArray, rejectedFileArray, totalFiles);

        } else {
          this.loadFile(fileDrop, fileItem, validFileArray, rejectedFileArray, totalFiles);
        }

      } else {
        this.loadFile(fileDrop, fileItem, validFileArray, rejectedFileArray, totalFiles);
      }
    }
  }

  private verifyDropFiles(files: any) {
    if ((!this.multiple || this.singleFile) && files.length > 1) {
      return false;
    }

    for (let index = 0; index < files.length; index++) {
      const file = files.item(index);

      if (file.webkitGetAsEntry && file.webkitGetAsEntry() && file.webkitGetAsEntry().isDirectory) {
        return false;
      }
    }

    return true;
  }
}
