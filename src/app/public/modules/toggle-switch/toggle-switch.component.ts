import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';

import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

import {
  SkyToggleSwitchChange
} from './types';

/**
 * Provider Expression that allows sky-toggle to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 */
// tslint:disable:no-forward-ref no-use-before-declare
export const SKY_TOGGLE_SWITCH_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyToggleSwitchComponent),
  multi: true
};

const SKY_TOGGLE_SWITCH_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SkyToggleSwitchComponent),
  multi: true
};

// tslint:enable

@Component({
  selector: 'sky-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss'],
  providers: [
    SKY_TOGGLE_SWITCH_CONTROL_VALUE_ACCESSOR,
    SKY_TOGGLE_SWITCH_VALIDATOR
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyToggleSwitchComponent implements ControlValueAccessor, Validator {

  @Input()
  public ariaLabel: string;

  @Input()
  public ariaLabelledBy: string;

  @Input()
  public disabled = false;

  @Input()
  public tabIndex = 0;

  @Output()
  public toggleChange = new EventEmitter<SkyToggleSwitchChange>();

  @Input()
  public set checked(checked: boolean) {
    if (checked !== this.checked) {
      this._checked = checked;
      this.controlValueAccessorChangeFn(checked);

      // Do not mark the field as "dirty"
      // if the field has been initialized with a value.
      if (this.isFirstChange && this.control) {
        this.control.markAsPristine();
        this.isFirstChange = false;
      }
    }
  }

  public get checked(): boolean {
    return this._checked;
  }

  private control: AbstractControl;
  private isFirstChange: boolean = true;

  private _checked: boolean = false;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  public writeValue(value: boolean) {
    this.checked = !!value;
    this.changeDetector.markForCheck();
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  public registerOnChange(fn: (value: any) => void) {
    this.controlValueAccessorChangeFn = fn;
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
    this.changeDetector.markForCheck();
  }

  /**
   * Event handler for toggle input element.
   * Toggles `toggle` state if element is not disabled.
   */
  public onInteractionEvent(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();

    if (!this.disabled) {
      this.toggle();
      this.emitChangeEvent();
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

  /** Called when the toggle is blurred. Needed to properly implement ControlValueAccessor. */
  /*istanbul ignore next */
  public onTouched: () => any = () => {};

  private controlValueAccessorChangeFn: (value: any) => void = (value) => {};

  private emitChangeEvent() {
    this.controlValueAccessorChangeFn(this._checked);
    this.toggleChange.emit({
      checked: this._checked
    });
  }

  /**
   * Toggles the `checked` value between true and false
   */
  private toggle() {
    this.checked = !this.checked;
  }
}
