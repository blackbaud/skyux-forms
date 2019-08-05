import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
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
  Subscription
} from 'rxjs/Subscription';

import {
  SkyCharacterCountComponent
} from './character-count.component';

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
  selector: '[skyCharacterCountInput]',
  providers: [
    SKY_CHARACTER_COUNT_VALUE_ACCESSOR,
    SKY_CHARACTER_COUNT_VALIDATOR
  ]
})
export class SkyCharacterCountInputDirective implements
  OnInit, OnDestroy, ControlValueAccessor, Validator, OnChanges, AfterViewInit {

  public inputChangedSubscription: Subscription;

  @Input()
  public skyCharacterCountInput: SkyCharacterCountComponent;

  private get modelValue(): string {
    return this._modelValue;
  }

  private set modelValue(value: string) {
    if (value !== this._modelValue) {
      this._modelValue = value;
      this.skyCharacterCountInput.currentText = value;
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
    this.inputChangedSubscription = this.skyCharacterCountInput.textChanged
      .subscribe((newTime: String) => {
        this.writeValue(newTime);
        this._onTouched();
      });
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
        this.control.setValue(this.modelValue, {
          emitEvent: false
        });

        this.changeDetector.markForCheck();
      });
    }
  }

  public ngOnDestroy() {
    this.inputChangedSubscription.unsubscribe();
  }

  public ngOnChanges() {
  }

  @HostListener('input', ['$event'])
  public onInput(event: any) {
    this.skyCharacterCountInput.currentInputLength = event.target.value.length;
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
    /*
      Component only needs label text after a change event
      Make sure the label text hasn't changed during the change event
      Other option is to make a directive for the label to update whenever it changes
    */
    if (this.elRef.nativeElement.labels && this.elRef.nativeElement.labels[0]) {
      this.skyCharacterCountInput.labelText = this.elRef.nativeElement.labels[0].innerText;
    }
    console.log(this.elRef.nativeElement.labels);
    this.skyCharacterCountInput.currentInputLength = value ? value.length : 0;
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
    if (value.length > this.skyCharacterCountInput.maxCharacterCount) {
      this.control.markAsTouched();

      return {
        'skyCharacterCount': {
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
