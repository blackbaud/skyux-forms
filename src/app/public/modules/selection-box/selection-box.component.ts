import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

import {
  SkyCoreAdapterService
} from '@skyux/core';

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

  @ContentChild(SkyCheckboxComponent, {
    read: SkyCheckboxComponent,
    static: false
  })
  public checkboxComponent: SkyCheckboxComponent;

  @ContentChild(SkyRadioComponent, {
    read: SkyRadioComponent,
    static: false
  })
  public set radioComponent(value: SkyRadioComponent) {
    this._radioComponent = value;
  }

  @ViewChild('controlEl', {
    read: ElementRef,
    static: false
  })
  private controlEl: ElementRef;

  public get radioComponent(): SkyRadioComponent {
    return this._radioComponent;
  }

  public set checked(value: boolean) {
    this._checked = value;
    this.changeDetector.markForCheck();
  }

  public get checked(): boolean {
    return this._checked;
  }

  @ViewChild('skySelectionBoxButton', {
    read: ElementRef,
    static: false
  })
  private buttonEl: ElementRef;

  private ngUnsubscribe = new Subject<void>();

  private _checked: boolean;

  private _radioComponent: SkyRadioComponent;

  constructor(
    private adapterService: SkyCoreAdapterService,
    private changeDetector: ChangeDetectorRef,
    private selectionBoxAdapterService: SkySelectionBoxAdapterService
  ) {}

  public ngAfterContentInit(): void {
    setTimeout(() => {
      this.setTabIndexOfFocusableElems(this.buttonEl.nativeElement, -1);
      this.updateCheckedOnControlChange();
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onButtonClick(event: any): void {
    const isControlClick =
      this.selectionBoxAdapterService.isDescendant(this.controlEl, event.target);

    if (!isControlClick) {
      this.selectionBoxAdapterService.getControl(this.controlEl).click();
      this.changeDetector.markForCheck();
    }
  }

  private setTabIndexOfFocusableElems(element: HTMLElement, tabIndex: number): void {
    const focusableElems = this.adapterService.getFocusableChildren(element, {
      ignoreVisibility: true
    });
    let index = focusableElems.length;
    while (index--) {
      focusableElems[index].tabIndex = tabIndex;
    }
  }

  private updateCheckedOnControlChange(): void {
    if (this.radioComponent) {
      this.checked = this.radioComponent.checked;
      this.radioComponent.deselect
        .pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe(() => {
          this.checked = false;
        });
      this.radioComponent.change
        .pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe(() => {
          this.checked = true;
        });
    }

    if (this.checkboxComponent) {
      this.checked = this.checkboxComponent.checked;
      this.checkboxComponent.change
        .pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe((value) => {
          this.checked = value.checked;
        });
    }
  }
}
