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

// tslint:disable:no-forward-ref no-use-before-declare
const SKY_TOGGLE_SWITCH_CONTROL_VALUE_ACCESSOR: any = {
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

let uniqueId = 0;

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
  public set checked(checked: boolean) {
    if (checked !== this.checked) {
      this._checked = checked;
      this.onChange(checked);

      // Do not mark the field as "dirty"
      // if the field has been initialized with a value.
      if (this.isFirstChange && this.control) {
        this.control.markAsPristine();
        this.isFirstChange = false;
      }
    }
  }

  public get checked(): boolean {
    return this._checked || false;
  }

  @Input()
  public disabled = false;

  @Input()
  public tabIndex = 0;

  @Output()
  public toggleChange = new EventEmitter<SkyToggleSwitchChange>();

  public get labelElementId(): string {
    if (this.ariaLabel) {
      return;
    }

    return `sky-toggle-switch-label-${this.toggleSwitchId}`;
  }

  private control: AbstractControl;
  private isFirstChange: boolean = true;
  private toggleSwitchId = uniqueId++;

  private _checked: boolean = false;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public writeValue(value: boolean) {
    this.checked = !!value;
    this.changeDetector.markForCheck();
  }

  public validate(control: AbstractControl): ValidationErrors {
    if (!this.control) {
      this.control = control;
    }

    return;
  }

  public registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  public setDisabledState(disabled: boolean) {
    this.disabled = disabled;
    this.changeDetector.markForCheck();
  }

  public onButtonClick(event: any): void {
    event.stopPropagation();

    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.toggle();
    this.emitChangeEvent();
  }

  public onButtonBlur(): void {
    this.onTouched();
  }

  /* istanbul ignore next */
  private onTouched: () => any = () => {};
  private onChange: (value: any) => void = () => {};

  private emitChangeEvent() {
    this.onChange(this._checked);
    this.toggleChange.emit({
      checked: this._checked
    });
  }

  private toggle(): void {
    this.checked = !this.checked;
  }
}
