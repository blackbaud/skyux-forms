import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Optional,
  Output,
  Self,
  ViewChild
} from '@angular/core';

import {
  ControlValueAccessor,
  NgControl
} from '@angular/forms';

import {
  SkyCoreAdapterService
} from '@skyux/core';

import {
  SkyCheckboxChange
} from '@skyux/forms';

import {
  SkyCheckboxComponent
} from '../checkbox/checkbox.component';

import {
  SkyRadioComponent
} from '../radio/radio.component';

import {
  SkyFormsUtility
} from '../shared/forms-utility';

import {
  SkySelectionBoxService
} from './selection-box.service';

import {
  SkySelectionBoxType
} from './type/selection-box-type';

/**
 * Creates a button to present users with an option to move forward with tasks.
 */
@Component({
  selector: 'sky-selection-box',
  styleUrls: ['./selection-box.component.scss'],
  templateUrl: './selection-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkySelectionBoxComponent implements AfterContentInit, ControlValueAccessor {

  /**
   * Indicates whether the selection box is selected.
   * @default false
   */
  @Input()
  public set checked(checked: boolean) {
    if (checked !== this.checked) {
      this._checked = checked;
      this._controlValueAccessorChangeFn(checked);

      // Do not mark the field as "dirty"
      // if the field has been initialized with a value.
      if (this.isFirstChange && this.ngControl && this.ngControl.control) {
        this.ngControl.control.markAsPristine();
        this.isFirstChange = false;
      }
    }
  }

  public get checked() {
    return this._checked;
  }

  /**
   * Indicates whether the selection box is required.
   * @default false
   */
  @Input()
  set required(value: boolean) {
    this._required = SkyFormsUtility.coerceBooleanProperty(value);
  }

  get required(): boolean {
    return this._required;
  }

  /**
   * @internal
   * This should be dynamically set by the selection box group.
   */
  public set type(value: SkySelectionBoxType) {
    this._type = value;
    this.changeDetector.markForCheck();
  }

  public get type(): SkySelectionBoxType {
    return this._type;
  }

  /**
   * Specifies and binds a value to the selection box's `value` property.
   * @required
   */
  @Input()
  public set value(value: any) {
    if (this._value !== value) {

      // TODO: is this necessary?
      if (this.selectedValue && this.selectedValue === this._value) {
        this.selectedValue = value;
        this.onChangeCallback(this.selectedValue);
        this.onTouchedCallback();
      }

      this._value = value;
    }

    this.changeDetector.markForCheck();
  }

  public get value(): any {
    return this._value;
  }

  /**
   * Fires when the value of the selection box changes.
   */
  @Output()
  public change = new EventEmitter<any>();

  public set selectedValue(value: any) {
    if (value !== this._selectedValue) {
      this._selectedValue = value;
    }
  }
  public get selectedValue(): any {
    return this._selectedValue;
  }

  public set name(value: string) {
    this._name = value;
    this.updateRadioButtonName();
  }

  public get name(): string {
    return this._name;
  }

  @ViewChild('checkboxComponent', {
    read: SkyCheckboxComponent,
    static: false
  })
  public checkboxComponent: SkyCheckboxComponent;

  @ViewChild('radioComponent', {
    static: false
  })
  public set radioComponent(value: SkyRadioComponent) {
    this._radioComponent = value;
    this.updateRadioButtonName();
  }

  public get radioComponent(): SkyRadioComponent {
    return this._radioComponent;
  }

  @ViewChild('skySelectionBoxButton', {
    read: ElementRef,
    static: false
  })
  private buttonEl: ElementRef;

  private isFirstChange = true;

  private _checked: boolean = false;

  private _name: string;

  private _radioComponent: SkyRadioComponent;

  private _required: boolean;

  private _selectedValue: any;

  private _type: SkySelectionBoxType;

  private _value: any;

  constructor(
    private adapterService: SkyCoreAdapterService,
    private changeDetector: ChangeDetectorRef,
    private selectionBoxService: SkySelectionBoxService,
    @Self() @Optional() private ngControl: NgControl
  ) {

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.selectionBoxService.selectedValue
      .pipe() // TODO: Add unsubscribe.
      .subscribe(value => {
        console.log(value);
        this.checked = (this._value === value.selectedRadioButtonValue);
      });
  }

  public ngAfterContentInit(): void {
    setTimeout(() => {
      this.setTabIndexOfFocusableElems(this.buttonEl.nativeElement, -1);
    });
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  public writeValue(value: any) {
    this.checked = !!value;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  public registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * Called when the checkbox is blurred.
   */
  /*istanbul ignore next */
  public onTouched: () => any = () => {};

  public onCheckboxChange(value: SkyCheckboxChange): void {
    this.checked = value.checked;
  }

  public onButtonClick(): void {
    this.checked = !this.checked;
    this.change.emit(this.checked);
  }

  public markForCheck(): void {
    this.changeDetector.markForCheck();
  }

  /**
   * Stop click from propigating up to the selection box button,
   * resulting in a unintended value change.
   */
  public onControlClick(event: MouseEvent): void {
    event.stopPropagation();
    this.changeDetector.markForCheck();
  }

  public onEnter(): void {
    this.checked = !this.checked;
    this.change.emit(this.checked);
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

  private _controlValueAccessorChangeFn: (value: any) => void = (value) => {};
  /* istanbul ignore next */
  private onChangeCallback = (value: any) => {};
  /* istanbul ignore next */
  private onTouchedCallback = () => {};

  private updateRadioButtonName(): void {
    if (this.radioComponent) {
      this.radioComponent.name = this._name;
    }
  }
}
