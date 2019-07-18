
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';

import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  NG_VALIDATORS
} from '@angular/forms';

/**
 * Monotonically increasing integer used to auto-generate unique ids for checkbox components.
 */
let nextId = 0;

/**
 * Provider Expression that allows sky-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 */
// tslint:disable:no-forward-ref no-use-before-declare
export const SKY_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyCheckboxComponent),
  multi: true
};

const SKY_CHECKBOX_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SkyCheckboxComponent),
  multi: true
};

// A simple change event emitted by the SkyCheckbox component.
export class SkyCheckboxChange {
  public source: SkyCheckboxComponent;
  public checked: boolean;
}
// tslint:enable

@Component({
  selector: 'sky-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [
    SKY_CHECKBOX_CONTROL_VALUE_ACCESSOR,
    SKY_CHECKBOX_VALIDATOR
  ]
})
export class SkyCheckboxComponent implements ControlValueAccessor, Validator {

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
      if (this.isFirstChange && this.control) {
        this.control.markAsPristine();
        this.isFirstChange = false;
      }
    }
  }

  public get checked() {
    return this._checked;
  }

  private control: AbstractControl;
  private isFirstChange = true;
  private _checkboxType: string;
  private _checked: boolean = false;

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

  public validate(control: AbstractControl): ValidationErrors {
    if (!this.control) {
      this.control = control;
    }

    return;
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
}
