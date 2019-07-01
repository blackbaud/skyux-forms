import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef
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
  SkyToggleChange
} from './types';

/**
 * Provider Expression that allows sky-toggle to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 */
// tslint:disable:no-forward-ref no-use-before-declare
export const SKY_TOGGLE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyToggleComponent),
  multi: true
};

const SKY_TOGGLE_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SkyToggleComponent),
  multi: true
};

// tslint:enable

@Component({
  selector: 'sky-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    SKY_TOGGLE_CONTROL_VALUE_ACCESSOR,
    SKY_TOGGLE_VALIDATOR
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyToggleComponent implements ControlValueAccessor, Validator {

  @Input()
  public ariaLabel: string;

  @Input()
  public ariaLabelledBy: string;

  @Input()
  public disabled: boolean = false;

  @Input()
  public tabindex: number = 0;

  @Output()
  public toggleChanged: EventEmitter<SkyToggleChange> = new EventEmitter<SkyToggleChange>();

  @Input()
  public set toggled(toggled: boolean) {
    if (toggled !== this.toggled) {
      this._toggled = toggled;
      this._controlValueAccessorChangeFn(toggled);

      // Do not mark the field as "dirty"
      // if the field has been initialized with a value.
      if (this.isFirstChange && this.control) {
        this.control.markAsPristine();
        this.isFirstChange = false;
      }
    }
  }

  public get toggled() {
    return this._toggled;
  }

  private control: AbstractControl;
  private isFirstChange = true;
  private _toggled: boolean = false;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  public writeValue(value: any) {
    this.toggled = !!value;
    this.changeDetector.markForCheck();
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

  public registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  /** Called when the toggle is blurred. Needed to properly implement ControlValueAccessor. */
  /*istanbul ignore next */
  public onTouched: () => any = () => {};
  /*istanbul ignore next */
  private onValidatorChange = () => {};

  private _controlValueAccessorChangeFn: (value: any) => void = (value) => {};

  private _emitChangeEvent() {
    this._controlValueAccessorChangeFn(this._toggled);
    this.toggleChanged.emit({
      toggled: this._toggled
    });
  }

  /**
   * Toggles the `toggled` value between true and false
   */
  private _toggle() {
    this.toggled = !this.toggled;
  }
}
