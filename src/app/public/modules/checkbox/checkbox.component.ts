
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Self,
  SimpleChanges
} from '@angular/core';

import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  Validators
} from '@angular/forms';

/**
 * Monotonically increasing integer used to auto-generate unique ids for checkbox components.
 */
let nextId = 0;

// A simple change event emitted by the SkyCheckbox component.
export class SkyCheckboxChange {
  public source: SkyCheckboxComponent;
  public checked: boolean;
}

@Component({
  selector: 'sky-checkbox',
  templateUrl: './checkbox.component.html'
})
export class SkyCheckboxComponent implements ControlValueAccessor, OnChanges, OnInit {

  /**
   * Hidden label for screen readers.
   */
  @Input()
  public label: string;

  /**
   * Id of label for the checkbox.
   */
  @Input()
  public labelledBy: string;

  @Input()
  public id: string = `sky-checkbox-${++nextId}`;

  @Input()
  public disabled: boolean = false;

  @Input()
  public tabindex: number = 0;

  @Input()
  public name: string = `sky-checkbox-${++nextId}`;

  @Output()
  public change: EventEmitter<SkyCheckboxChange> = new EventEmitter<SkyCheckboxChange>();

  @Input()
  public icon: String;

  @Input()
  public set checkboxType(value: string) {
    if (value) {
      this._checkboxType = value.toLowerCase();
    }
  }

  public get checkboxType(): string {
    return this._checkboxType || 'info';
  }

  public get inputId(): string {
    return `input-${this.id}`;
  }

  @Input()
  public set checked(checked: boolean) {
    if (checked !== this.checked) {
      this._checked = checked;
      this._controlValueAccessorChangeFn(checked);

      // Do not mark the field as "dirty"
      // if the field has been initialized with a value.
      if (this.isFirstChange && this.ngControl) {
        this.ngControl.control.markAsPristine();
        this.isFirstChange = false;
      }
    }
  }

  public get checked() {
    return this._checked;
  }

  /**
   * Indicates if the checkbox must be checked to be valid. This property accepts a boolean values.
   */
  @Input()
  public required: boolean;

  private isFirstChange = true;
  private _checkboxType: string;
  private _checked: boolean = false;

  constructor(
    @Self() @Optional() private ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public ngOnInit(): void {
    if (this.ngControl) {
      this.required = this.hasRequiredValidation(this.ngControl);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // If consumer changes `required` input, update the validators and check for validity.
    // Check for both true and empty string to capture using `required` attribute alone
    // vs. assigning a boolean value.
    if (changes['required'] && this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValidators(
        changes['required'].currentValue || changes['required'].currentValue === ''
        ? Validators.requiredTrue
        : undefined
      );
      this.ngControl.control.updateValueAndValidity();
    }
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
   */
  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  /**
   * Event handler for checkbox input element.
   * Toggles checked state if element is not disabled.
   */
  public onInteractionEvent(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();

    if (!this.disabled) {
      this._toggle();
      this._emitChangeEvent();
    }
  }

  public onInputBlur() {
    this.onTouched();
  }

  /** Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor. */
  /*istanbul ignore next */
  public onTouched: () => any = () => {};

  private _controlValueAccessorChangeFn: (value: any) => void = (value) => {};

  private _emitChangeEvent() {
    let event = new SkyCheckboxChange();
    event.source = this;
    event.checked = this._checked;

    this._controlValueAccessorChangeFn(this._checked);
    this.change.emit(event);
  }

  /**
   * Toggles the `checked` value between true and false
   */
  private _toggle() {
    this.checked = !this.checked;
  }

  /**
   * Gets the required state of the checkbox.
   * Currently, Angular doesn't offer a way to get this easily, so we have to create an empty
   * control using the current validator to see if it throws a `required` validation error.
   * https://github.com/angular/angular/issues/13461#issuecomment-340368046
   */
  private hasRequiredValidation(ngControl: NgControl): boolean {
    const validatorFn = ngControl.validator || ngControl.control.validator;
    if (validatorFn) {
      const validator = validatorFn({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }

}
