import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';

import {
  SkyFileItem
} from './file-item';

import {
  SkyFileAttachmentChange
} from './types/file-attachment-change';

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
export class SkyFileAttachmentComponent implements OnDestroy {
  @Input()
  public acceptedTypes: string;

  @Input()
  public maxFileSize: number = 500000;

  @Input()
  public minFileSize: number = 0;

  @Input()
  public required: boolean = false;

  @Input()
  public validateFn: Function;

  @Output()
  public fileChange = new EventEmitter<SkyFileAttachmentChange>();

  @ViewChild('fileInput')
  private inputEl: ElementRef;

  @ViewChild('labelWrapper')
  private labelWrap: ElementRef;

  public acceptedOver: boolean = false;

  private enterEventTarget: any;

  public rejectedOver: boolean = false;

  public fileAttachment: SkyFileItem;

  constructor(
    private fileAttachmentService: SkyFileAttachmentService,
    private fileItemService: SkyFileItemService
  ) { }

  public hasLabel(): boolean {
    return this.labelWrap.nativeElement.children.length > 0;
  }

  public isImage(): boolean {
    return this.fileItemService.isImage(this.fileAttachment);
  }

  public onDropClicked(): void {
    this.inputEl.nativeElement.click();
  }

  public fileChangeEvent(fileChangeEvent: any): void {
    this.handleFiles(fileChangeEvent.target.files);
  }

  public fileDragEnter(dragEnterEvent: any): void {
    // Save this target to know when the drag event leaves
    this.enterEventTarget = dragEnterEvent.target;
    dragEnterEvent.stopPropagation();
    dragEnterEvent.preventDefault();
  }

  public fileDragOver(dragOverEvent: any): void {
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

  public fileDrop(dropEvent: any): void {
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

  public fileDragLeave(dragLeaveEvent: any): void {
    if (this.enterEventTarget === dragLeaveEvent.target) {
      this.rejectedOver = false;
      this.acceptedOver = false;
    }
  }

  public deleteFileAttachment(): void {
    this.fileAttachment = undefined;
    this.emitFileChangeEvent(this.fileAttachment);
  }

  public getFileName(): string {
    if (this.fileAttachment) {
      // tslint:disable-next-line: max-line-length
      let dropName = this.fileItemService.isFile(this.fileAttachment) && this.fileAttachment.file.name ? this.fileAttachment.file.name : this.fileAttachment.url;

      if (dropName.length > 26) {
        return dropName.slice(0, 26) + '....';
      } else {
        return dropName;
      }
    } else {
      return 'No file chosen';
    }
  }

  public ngOnDestroy() {
    this.fileChange.complete();
  }

  private emitFileChangeEvent(currentFile: SkyFileItem): void {
      if (currentFile && !currentFile.errorType) {
        this.fileAttachment = currentFile;
      }
      this.fileChange.emit({
        file: currentFile
      } as SkyFileAttachmentChange);

      this.inputEl.nativeElement.value = '';
    }

  private loadFile(file: SkyFileItem): void {
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

  private handleFiles(files: FileList): void {
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
