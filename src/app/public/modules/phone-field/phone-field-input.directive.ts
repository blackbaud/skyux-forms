import {
  Directive,
  forwardRef,
  ElementRef,
  Input,
  Renderer2,
  HostListener,
  AfterViewInit,
  Injector,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator,
  AbstractControl,
  NgControl,
  FormControl
} from '@angular/forms';

import {
  SkyPhoneFieldComponent
} from './phone-field.component';

// tslint:disable:no-forward-ref no-use-before-declare
const SKY_PHONE_FIELD_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyPhoneFieldInputDirective),
  multi: true
};

const SKY_PHONE_FIELD_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SkyPhoneFieldInputDirective),
  multi: true
};
// tslint:enable

@Directive({
  selector: '[skyPhoneFieldInput]',
  providers: [
    SKY_PHONE_FIELD_VALUE_ACCESSOR,
    SKY_PHONE_FIELD_VALIDATOR
  ]
})
export class SkyPhoneFieldInputDirective implements OnInit, AfterViewInit,
  ControlValueAccessor, Validator {

  /**
   * Disabling linting here as per the Angular style guide "Style 05-13" it is acceptable
   * to alias when when the directive name is also an input property,
   * and the directive name doesn't describe the property.
   */
   // tslint:disable-next-line:no-input-rename
  @Input('skyPhoneFieldInput')
  public skyPhoneFieldComponent: SkyPhoneFieldComponent;

  @Input()
  public set defaultCountry(value: string) {
    this.skyPhoneFieldComponent.setDefaultCountry(value);
    this._defaultCountryCode = value;
  }

  public get defaultCountry() {
    return this._defaultCountryCode;
  }

  @Input()
  public set disabled(value: boolean) {
    this.skyPhoneFieldComponent.disabled = value;
    this.renderer.setProperty(
      this.elRef.nativeElement,
      'disabled',
      value);
    this._disabled = value;
  }

  public get disabled(): boolean {
    return this._disabled || false;
  }

  @Input()
  public skyPhoneFieldNoValidate: boolean = false;

  private set modelValue(value: string) {
    this._modelValue = value;
    this.setInputValue(value);
    this._onChange(value);
    this._validatorChange();
  }

  private get modelValue(): string {
    return this._modelValue;
  }

  private _defaultCountryCode: string;

  private _disabled: boolean;

  private _modelValue: string;

  public constructor(
    private changeDetector: ChangeDetectorRef,
    private elRef: ElementRef,
    private injector: Injector,
    private renderer: Renderer2
  ) { }

  public ngOnInit(): void {
    this.renderer.addClass(this.elRef.nativeElement, 'sky-form-control');
    if (this.defaultCountry) {
      this.skyPhoneFieldComponent.selectCountry(this.defaultCountry);
    }
    this.renderer.setAttribute(this.elRef.nativeElement, 'placeholder',
      this.skyPhoneFieldComponent.selectedCountry.placeholder);
  }

  public ngAfterViewInit(): void {
    this.skyPhoneFieldComponent.selectedCountryChanged.subscribe((country: any) => {
      this._validatorChange();
      this.renderer.setAttribute(this.elRef.nativeElement, 'placeholder', country.placeholder);
    });
    // This is needed to address a bug in Angular 4, where the value is not changed on the view.
    // See: https://github.com/angular/angular/issues/13792
    const control = (<NgControl>this.injector.get(NgControl)).control as FormControl;
    /* istanbul ignore else */
    if (control && this.modelValue) {
      control.setValue(this.modelValue, { emitEvent: false });
      /* istanbul ignore else */
      if (this.changeDetector) {
        this.changeDetector.detectChanges();
      }
    }
  }

  /**
   * Writes the new value for reactive forms on change events on the input element
   * @param event The change event that was received
   */
  @HostListener('change', ['$event'])
  public onChange(event: any): void {
    this.writeValue(event.target.value);
  }

  /**
   * Marks reactive form controls as touched on input blur events
   */
  @HostListener('blur')
  public onBlur(): void {
    this._onTouched();
  }

  /**
   * Writes the new value for reactive forms
   * @param value The new value for the input
   */
  public writeValue(value: any): void {
    this.modelValue = value;
  }

  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }

  public registerOnTouched(fn: () => any): void { this._onTouched = fn; }

  public registerOnValidatorChange(fn: () => void): void { this._validatorChange = fn; }

  /**
   * Sets the disabled state on the input
   * @param isDisabled the new value of the input's disabled state
   */
  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Validate's the form control's current value
   * @param control the form control for the input
   */
  public validate(control: AbstractControl): { [key: string]: any } {
    let value = control.value;

    if (!value) {
      return undefined;
    }

    if (!this.skyPhoneFieldComponent.validateNumber(value) && !this.skyPhoneFieldNoValidate) {
      return {
        'skyPhoneField': {
          invalid: control.value
        }
      };
    }

    return undefined;
  }

  private setInputValue(value: string): void {
    this.renderer.setProperty(
      this.elRef.nativeElement,
      'value',
      value ? value : ''
    );
  }

  /*istanbul ignore next */
  private _onChange = (_: any) => { };
  /*istanbul ignore next */

  private _onTouched = () => { };

  private _validatorChange = () => { };
}
