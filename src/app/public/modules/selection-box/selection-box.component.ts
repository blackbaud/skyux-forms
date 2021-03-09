import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';

import {
  Subject
} from 'rxjs';

import {
  takeUntil
} from 'rxjs/operators';

import {
  SkyCheckboxComponent
} from '../checkbox/checkbox.component';

import {
  SkyRadioComponent
} from '../radio/radio.component';

import {
  SkySelectionBoxAdapterService
} from './selection-box-adapter.service';

/**
 * Creates a button to present users with an option to move forward with tasks.
 */
@Component({
  selector: 'sky-selection-box',
  styleUrls: ['./selection-box.component.scss'],
  templateUrl: './selection-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkySelectionBoxComponent implements AfterContentInit, OnDestroy {

  @Input()
  public control: SkyCheckboxComponent | SkyRadioComponent;

  public set checked(value: boolean) {
    this._checked = value;
    this.changeDetector.markForCheck();
  }

  public get checked(): boolean {
    return this._checked;
  }

  @ViewChild('control', {
    read: ElementRef,
    static: false
  })
  private controlEl: ElementRef;

  @ViewChild('selectionBox', {
    read: ElementRef,
    static: false
  })
  private selectionBoxEl: ElementRef;

  private ngUnsubscribe = new Subject<void>();

  private _checked: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private selectionBoxAdapterService: SkySelectionBoxAdapterService
  ) {}

  public ngAfterContentInit(): void {
    setTimeout(() => {
      this.selectionBoxAdapterService.setChildrenTabIndex(this.selectionBoxEl, -1);
      this.updateCheckedOnControlChange();
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Since we are programatically firing a click on the control,
   * make sure user is not clicking on the control before firing click logic.
   */
  public onClick(event: any): void {
    const isControlClick =
      this.selectionBoxAdapterService.isDescendant(this.controlEl, event.target);
    if (!isControlClick) {
      this.selectControl();
    }
  }

  public onKeydown(event: KeyboardEvent): void {
    if (event.key === ' ') {
      this.selectControl();
      event.preventDefault();
    }
  }

  private selectControl(): void {
    this.selectionBoxAdapterService.getControl(this.controlEl).click();
    this.changeDetector.markForCheck();
    this.selectionBoxAdapterService.focus(this.selectionBoxEl);
  }

  private updateCheckedOnControlChange(): void {
    this.control.checkedChange
      .pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe((value) => {
        this.checked = value;
    });
  }
}
