import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  Optional,
  QueryList,
  Self
} from '@angular/core';

import {
  NgControl
} from '@angular/forms';

import {
  Subject
} from 'rxjs';

import {
  SkyFormsUtility
} from '../shared/forms-utility';

import {
  SkySelectionBoxComponent
} from './selection-box.component';

import {
  SkySelectionBoxService
} from './selection-box.service';

import {
  SkySelectionBoxGroupValueType
} from './type/selection-box-group-value-type';

import {
  SkySelectionBoxType
} from './type/selection-box-type';

let nextUniqueId = 0;

/**
 * Organizes radio buttons into a group. It is required for radio
 * buttons on Angular reactive forms, and we recommend using it with all radio buttons.
 * On Angular forms, the component manages the selected values and keeps the forms up-to-date.
 * When users select a radio button, its value is driven through an `ngModel` attribute that you specify on the `sky-radio-group` element.
 */
@Component({
  selector: 'sky-selection-box-group',
  templateUrl: './selection-box-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SkySelectionBoxService
  ]
})
export class SkySelectionBoxGroupComponent implements AfterViewInit, OnDestroy {

  /**
   * Specifies the HTML element ID (without the leading `#`) of the element that labels
   * the radio button group. This sets the radio button group's `aria-labelledby` attribute
   * [to support accessibility](https://developer.blackbaud.com/skyux/learn/accessibility).
   * If the radio button group does not include a visible label, use `ariaLabel` instead.
   */
  @Input()
  public ariaLabelledBy: string;

  /**
   * Specifies an ARIA label for the radio button group. This sets the
   * radio button group's `aria-label` attribute
   * [to support accessibility](https://developer.blackbaud.com/skyux/learn/accessibility).
   * If the radio button group includes a visible label, use `ariaLabelledBy` instead.
   */
  @Input()
  public ariaLabel: string;

  /**
   * Specifies a name for the collection of radio buttons that the component groups together.
   * This property overwrites the deprecated `name` property on individual `sky-radio` elements,
   * and it is required unless the `name` property is set on individual `sky-radio` elements.
   * @required
   */
  @Input()
  public set name(value: string) {
    this._name = value;
  }
  public get name(): string {
    return this._name;
  }

  /**
   * Indicates whether the input is required for form validation.
   * When you set this property to `true`, the component adds `aria-required` and `required`
   * attributes to the input element so that forms display an invalid state until the input element
   * is complete.
   * @default "false"
   */
  @Input()
  public required: boolean = false;


  /**
   * Specifies the selected value for the seleciton-box-group.
   */
  @Input()
  public set value(value: SkySelectionBoxGroupValueType) {
    const isNewValue = value !== this._value;
    console.warn('value change: ' + value);

    if (isNewValue) {
      this._value = value;
      this.onChange(this._value);
      this.selectionBoxService.selectedValue.next(value);
    }
  }
  public get value(): SkySelectionBoxGroupValueType {
    return this._value;
  }

  /**
   * Specifies an index for all the radio buttons in the group. If the index is not defined,
   * the indices for individual radio buttons are set to their positions on load.
   * This property supports accessibility by placing focus on the currently selected radio
   * button. If no radio button is selected, it places focus on the first or last button
   * depending on how users navigate to the radio button group.
   */
  @Input()
  public set tabIndex(value: number) {
    if (this._tabIndex !== value) {
      this._tabIndex = value;
    }
  }
  public get tabIndex(): number {
    return this._tabIndex;
  }

  @Input()
  public type: SkySelectionBoxType;

  @ContentChildren(SkySelectionBoxComponent, { descendants: true })
  private set selectionBoxes(list: QueryList<SkySelectionBoxComponent>) {
    this._selectionBoxes = list;
    list.forEach(box => {
      // setTimeout avoids ExpressionChangedAfterItHasBeenCheckedError.
      setTimeout(() => {
        box.type = this.type;
        box.name = this.name;
      });
    });
  };

  private get selectionBoxes(): QueryList<SkySelectionBoxComponent> {
    return this._selectionBoxes;
  }

  private ngUnsubscribe = new Subject();

  private _name = `sky-radio-group-${nextUniqueId++}`;

  private _selectionBoxes: QueryList<SkySelectionBoxComponent>;

  private _tabIndex: number;

  private _value: SkySelectionBoxGroupValueType;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private selectionBoxService: SkySelectionBoxService,
    @Self() @Optional() private ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public ngAfterViewInit(): void {
    if (this.ngControl) {
      // Backwards compatibility support for anyone still using Validators.Required.
      this.required = this.required || SkyFormsUtility.hasRequiredValidation(this.ngControl);

      // Avoid an ExpressionChangedAfterItHasBeenCheckedError.
      this.changeDetector.detectChanges();
    }
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public writeValue(value: any): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /* istanbul ignore next */
  private onChange: (value: any) => void = () => {};
  /* istanbul ignore next */
  private onTouched: () => any = () => {};

}
