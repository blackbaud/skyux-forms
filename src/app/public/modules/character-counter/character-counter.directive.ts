import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer
} from '@angular/core';

import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator
} from '@angular/forms';

import {
  SkyCharacterCounterIndicatorComponent
} from './character-counter-indicator.component';

// tslint:disable:no-forward-ref no-use-before-declare
const SKY_CHARACTER_COUNT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyCharacterCountInputDirective),
  multi: true
};

const SKY_CHARACTER_COUNT_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SkyCharacterCountInputDirective),
  multi: true
};

// tslint:enable
@Directive({
  selector: '[skyCharacterCounter]',
  providers: [
    SKY_CHARACTER_COUNT_VALUE_ACCESSOR,
    SKY_CHARACTER_COUNT_VALIDATOR
  ]
})
export class SkyCharacterCountInputDirective implements
  OnInit, ControlValueAccessor, Validator, OnChanges, AfterViewInit {

  @Input()
  public skyCharacterCounterIndicator: SkyCharacterCounterIndicatorComponent;

  @Input()
  public skyCharacterCounterLimit: number = 0;

  private get modelValue(): string {
    return this._modelValue;
  }

  private set modelValue(value: string) {
    if (value !== this._modelValue) {
      this._modelValue = value;
      this.skyCharacterCounterIndicator.characterCount = value.length;
      this.setInputValue(value);
      this._validatorChange();
      this._onChange(value);
    }
  }

  private control: AbstractControl;
  private _modelValue: string;

  constructor(
    private renderer: Renderer,
    private elRef: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit() {
    this.renderer.setElementClass(this.elRef.nativeElement, 'sky-form-control', true);
    this.skyCharacterCounterIndicator.characterCountLimit = this.skyCharacterCounterLimit;
  }

  public ngAfterViewInit(): void {
    // This is needed to address a bug in Angular 4.
    // When a control value is set intially, its value is not represented on the view.
    // See: https://github.com/angular/angular/issues/13792
    // Of note is the parent check which allows us to determine if the form is reactive.
    // Without this check there is a changed before checked error
    /* istanbul ignore else */
    if (this.control && this.control.parent) {
      setTimeout(() => {
        console.log(this.modelValue);
        this.control.setValue(this.modelValue, {
          emitEvent: false
        });

        this.changeDetector.markForCheck();
        console.log(this.modelValue);
      });
    }
  }

  public ngOnChanges() {
    // Handle changes to character count limit
    this.skyCharacterCounterIndicator.characterCountLimit = this.skyCharacterCounterLimit;

    // Update errors
    if (this.control) {
      console.log('ping');
      this.control.updateValueAndValidity();
    }
  }

  @HostListener('input', ['$event'])
  public onInput(event: any) {
    this.skyCharacterCounterIndicator.characterCount = event.target.value.length;
  }

  @HostListener('change', ['$event'])
  public onChange(event: any) {
    this.writeValue(event.target.value);
  }

  @HostListener('blur')
  public onBlur /* istanbul ignore next */ () {
    this._onTouched();
  }

  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }
  public registerOnTouched(fn: () => any): void { this._onTouched = fn; }
  public registerOnValidatorChange(fn: () => void): void { this._validatorChange = fn; }

  public writeValue(value: any) {
    this.modelValue = value;
  }

  public validate(control: AbstractControl): { [key: string]: any } {
    if (!this.control) {
      this.control = control;
    }

    let value = control.value;
    if (!value) {
      return undefined;
    }

    /* istanbul ignore next */
    if (value.length > this.skyCharacterCounterLimit) {
      this.control.markAsTouched();

      return {
        'skyCharacterCounter': {
          invalid: control.value
        }
      };
    }

    return undefined;
  }

  private setInputValue(value: string): void {
    this.renderer.setElementProperty(
      this.elRef.nativeElement,
      'value',
      value
    );
  }

  /*istanbul ignore next */
  private _onChange = (_: any) => { };
  /*istanbul ignore next */
  private _onTouched = () => { };
  private _validatorChange = () => { };
}
