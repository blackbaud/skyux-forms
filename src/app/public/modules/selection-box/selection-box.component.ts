import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';

import {
  SkyCoreAdapterService
} from '@skyux/core';

import {
  SkyThemeService
} from '@skyux/theme';

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

  @ViewChild('control', {
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

  @ViewChild('selectionBox', {
    read: ElementRef,
    static: false
  })
  private selectionBoxEl: ElementRef;

  private ngUnsubscribe = new Subject<void>();

  private _checked: boolean;

  private _radioComponent: SkyRadioComponent;

  constructor(
    public themeSvc: SkyThemeService,
    private adapterService: SkyCoreAdapterService,
    private changeDetector: ChangeDetectorRef,
    private selectionBoxAdapterService: SkySelectionBoxAdapterService
  ) {}

  public ngAfterContentInit(): void {
    setTimeout(() => {
      this.setTabIndexOfFocusableElems(this.selectionBoxEl.nativeElement, -1);
      this.updateCheckedOnControlChange();
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

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
    }
  }

  private selectControl(): void {
    this.selectionBoxAdapterService.getControl(this.controlEl).click();
    this.changeDetector.markForCheck();
    this.selectionBoxAdapterService.focus(this.selectionBoxEl);
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

    this.control.checkedChange
      .pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe((value) => {
        this.checked = value;
    });

    if (this.radioComponent) {
      this.checked = this.radioComponent.checked;
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
