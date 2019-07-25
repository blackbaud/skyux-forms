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
  SkyFileAttachmentChange
} from './file-attachment-change';

import {
  SkyFileAttachmentService
} from './file-attachment.service';

import {
  SkyFileItemService
} from './file-item.service';

@Component({
  selector: 'sky-file-attachment',
  templateUrl: './file-attachment.component.html',
  styleUrls: ['./file-attachment.component.scss'],
  providers: [
    SkyFileAttachmentService,
    SkyFileItemService
  ]
})
export class SkyFileAttachmentComponent {
  @Output()
  public fileChanged = new EventEmitter<SkyFileAttachmentChange>();

  @Input()
  public minFileSize: number = 0;

  @Input()
  public maxFileSize: number = 500000;

  @Input()
  public validateFn: Function;

  @Input()
  public acceptedTypes: string;

  @Input()
  public required: boolean = false;

  @ViewChild('fileInput')
  public inputEl: ElementRef;

  @ViewChild('labelWrapper')
  public labelWrap: ElementRef;

  public rejectedOver: boolean = false;
  public acceptedOver: boolean = false;
  public singleFileAttachment: SkyFileItem;

  private enterEventTarget: any;

  constructor(
    private fileAttachmentService: SkyFileAttachmentService,
    private fileItemService: SkyFileItemService
  ) { }

  public hasLabel() {
    return this.labelWrap.nativeElement.children.length > 0;
  }

  public isImg() {
    return this.fileItemService.isImg(this.singleFileAttachment);
  }

  public dropClicked() {
    this.inputEl.nativeElement.click();
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

          if (file.type && this.fileAttachmentService.fileTypeRejected(file.type, this.acceptedTypes)) {
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
      if (this.fileAttachmentService.verifyDropFiles(dropEvent.dataTransfer.files)) {
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

  public singleAttachmentDelete() {
    this.singleFileAttachment = undefined;
    this.emitFileChangeEvent(this.singleFileAttachment);
  }

  public getSingleFileName() {
    if (this.singleFileAttachment) {
      // tslint:disable-next-line: max-line-length
      let dropName = this.fileItemService.isFile(this.singleFileAttachment) && this.singleFileAttachment.file.name ? this.singleFileAttachment.file.name : this.singleFileAttachment.url;

      if (dropName.length > 26) {
        return dropName.slice(0, 26) + '....';
      } else {
        return dropName;
      }
    } else {
      return 'No file chosen';
    }
  }

  private emitFileChangeEvent(
    currentFile: SkyFileItem
  ) {
      if (currentFile && !currentFile.errorType) {
        this.singleFileAttachment = currentFile;
      }
      this.fileChanged.emit({
        file: currentFile
      } as SkyFileAttachmentChange);

      this.inputEl.nativeElement.value = '';
    }

  private loadFile(
    file: SkyFileItem
  ) {
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      file.url = event.target.result;
      this.emitFileChangeEvent(file);
    });

    reader.addEventListener('error', (event: any) => {
      this.emitFileChangeEvent(file);
    });

    reader.addEventListener('abort', (event: any) => {
      this.emitFileChangeEvent(file);
    });

    reader.readAsDataURL(file.file);
  }

  private handleFiles(files: FileList) {
    // tslint:disable-next-line: max-line-length
    let processedFiles = this.fileAttachmentService.checkFiles(files, this.minFileSize, this.maxFileSize, this.acceptedTypes, this.validateFn);

    for (let file of processedFiles) {
      if (file.errorType) {
        this.emitFileChangeEvent(file);
      } else {
        this.loadFile(file);
      }
    }
  }
}
