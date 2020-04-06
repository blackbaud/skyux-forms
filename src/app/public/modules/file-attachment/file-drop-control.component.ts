import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
  Self
} from '@angular/core';

import {
  ControlValueAccessor,
  NgControl
} from '@angular/forms';

import {
  SkyFileItem
} from './file-item';

import {
  SkyFileLink
} from './file-link';

import {
  SkyFileDropChange
} from './types/file-drop-change';

import {
  SkyFileDropValue
} from './types/file-drop-value';

@Component({
  selector: 'sky-file-drop-control',
  templateUrl: './file-drop-control.component.html'
})
export class SkyFileDropControlComponent implements ControlValueAccessor {

  @Input()
  public acceptedTypes: string;

  @Input()
  public allowLinks: boolean = false;

  @Input()
  public minFileSize: number = 0;

  @Input()
  public maxFileSize: number = 500000;

  @Input()
  public multiple: boolean = true;

  @Input()
  public noClick: boolean = false;

  @Input()
  public validateFn: Function;

  @Output()
  public filesUploaded = new EventEmitter<SkyFileDropChange>();

  @Output()
  public fileDeleted = new EventEmitter<SkyFileItem>();

  @Output()
  public linkAdded = new EventEmitter<SkyFileLink>();

  @Output()
  public linkDeleted = new EventEmitter<SkyFileLink>();

  public set value(value: SkyFileDropValue) {
    // The null check is needed to address a bug in Angular 4.
    // writeValue is being called twice, first time with a phantom null value
    // See: https://github.com/angular/angular/issues/14988
    // tslint:disable-next-line:no-null-keyword
    const isNewValue = value !== this.value && value !== null &&
      (!value || !this.value || value.files !== this.value.files || value.links !== this.value.links);

    if (isNewValue) {
      if (value &&
        !((value.files && value.files.length > 0) ||
          (value.links && value.links.length > 0))) {
        value = undefined;
      }
      this._value = value;
      this._onChange(value);
    }
  }

  public get value(): SkyFileDropValue {
    return this._value;
  }

  public allItems: Array<SkyFileItem | SkyFileLink> = [];

  private _value: SkyFileDropValue = {
    files: undefined,
    links: undefined
  };

  constructor(
    private changeDetector: ChangeDetectorRef,
    @Self() @Optional() private ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public deleteItem(event: SkyFileLink | SkyFileItem) {
    if ((event as SkyFileItem).file) {
      const fileItem = <SkyFileItem>this.allItems.find((item: SkyFileItem) => {
        return item.file.name === (event as SkyFileItem).file.name;
      });
      this.allItems = this.allItems.filter(item => item !== fileItem);

      this.value = {
        files: this.value.files.filter((item: SkyFileItem) =>
          item.file.name !== (event as SkyFileItem).file.name),
        links: this.value.links
      };

      this.fileDeleted.emit(fileItem);
    } else {
      /* Sanity check */
      /* istanbul ignore else */
      if ((event as SkyFileLink).url) {
        const linkItem = <SkyFileLink>this.allItems.find((item: SkyFileLink) => {
          return item.url === event.url;
        });
        this.allItems = this.allItems.filter(item => item !== linkItem);

        this.value = {
          files: this.value.files,
          links: this.value.links.filter(item => item.url !== event.url)
        };

        this.linkDeleted.emit(linkItem);
      }
    }
  }

  public filesUpdated(event: SkyFileDropChange) {
    this.filesUploaded.emit(event);
    this.value = {
      files: (this.value && this.value.files) ? this.value.files.concat(event.files) : event.files,
      links: this.value ? this.value.links : undefined
    };
    this.allItems = this.allItems.concat(event.files);
  }

  public handleControlTouch() {
    this._onTouched();
  }

  public linkUpdated(event: SkyFileLink) {
    this.linkAdded.emit(event);
    this.value = {
      files: this.value ? this.value.files : undefined,
      links: (this.value && this.value.links) ? this.value.links.concat(event) : [event]
    };
    this.allItems.push(event);
  }

  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }

  public registerOnTouched(fn: () => any): void { this._onTouched = fn; }

  public writeValue(value: any) {
    this.value = value;
    this.changeDetector.markForCheck();
  }

  /*istanbul ignore next */
  private _onChange = (_: any) => { };

  /*istanbul ignore next */
  private _onTouched = () => { };

}
