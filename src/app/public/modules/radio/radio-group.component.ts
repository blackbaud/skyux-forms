import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  Optional,
  QueryList,
  Self,
  ChangeDetectorRef
} from '@angular/core';

import {
  AbstractControl,
  NgControl
} from '@angular/forms';

import {
  Subject
} from 'rxjs/Subject';

import {
  SkyRadioChange
} from './types';

import {
  SkyRadioComponent
} from './radio.component';

let nextUniqueId = 0;

@Component({
  selector: 'sky-radio-group',
  templateUrl: './radio-group.component.html'
})
export class SkyRadioGroupComponent implements AfterContentInit, AfterViewInit, OnDestroy {
  @Input()
  public ariaLabelledBy: string;

  @Input()
  public ariaLabel: string;

  @Input()
  public set name(value: string) {
    this._name = value;
    this.updateRadioButtonNames();
  }
  public get name(): string {
    return this._name;
  }

  /**
  * Indicates whether the input is required for form validation.
  * When you set this property to `true`, the component adds `aria-required` and `required` attributes to the input element,
  * and will show an invalid state until the input element is complete. This property accepts a boolean value.
  */
 @Input()
 public required: boolean = false;

  @Input()
  public set value(value: any) {
    const isNewValue = value !== this._value;

    if (isNewValue) {
      this._value = value;
      this.onChange(this._value);
      this.updateCheckedRadioFromValue();
    }
  }
  public get value(): any {
    return this._value;
  }

  @Input()
  public set tabIndex(value: number) {
    if (this._tabIndex !== value) {
      this._tabIndex = value;
      this.updateRadioButtonTabIndexes();
    }
  }
  public get tabIndex(): number {
    return this._tabIndex;
  }

  @ContentChildren(SkyRadioComponent, { descendants: true })
  private radios: QueryList<SkyRadioComponent>;

  private ngUnsubscribe = new Subject();

  private _name = `sky-radio-group-${nextUniqueId++}`;
  private _value: any;
  private _tabIndex: number;

  constructor(
    private changeDetector: ChangeDetectorRef,
    @Self() @Optional() private ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public ngAfterContentInit(): void {
    this.resetRadioButtons();

    // Watch for radio selections.
    this.watchForSelections();

    this.radios.changes
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        this.resetRadioButtons();

        // Subscribe to the new radio buttons
        this.watchForSelections();
      });
  }

  public ngAfterViewInit(): void {
    if (this.ngControl) {
      // Backwards compatibility support for anyone still using Validators.Required.
      this.required = this.required || this.hasRequiredValidation(this.ngControl);
      this.changeDetector.detectChanges();
    }
  }

  public watchForSelections() {
    this.radios.forEach((radio) => {
      radio.change
        .takeUntil(this.ngUnsubscribe)
        .subscribe((change: SkyRadioChange) => {
          this.onTouched();
          this.writeValue(change.value);
        });
    });
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

  private updateRadioButtonNames(): void {
    if (this.radios) {
      this.radios.forEach(radio => {
        radio.name = this.name;
      });
    }
  }

  private updateRadioButtonTabIndexes(): void {
    if (this.radios) {
      this.radios.forEach(radio => {
        radio.groupTabIndex = this.tabIndex;
      });
    }
  }

  private updateCheckedRadioFromValue(): void {
    if (!this.radios) {
      return;
    }

    this.radios.forEach((radio) => {
      radio.checked = (this._value === radio.value);
    });
  }

  private resetRadioButtons(): void {
    this.updateCheckedRadioFromValue();
    this.updateRadioButtonNames();
    this.updateRadioButtonTabIndexes();
  }

  // TODO: replace me with static helper.
  /**
   * Gets the required state of the checkbox.
   * Currently, Angular doesn't offer a way to get this easily, so we have to create an empty
   * control using the current validator to see if it throws a `required` validation error.
   * https://github.com/angular/angular/issues/13461#issuecomment-340368046
   */
  private hasRequiredValidation(ngControl: NgControl): boolean {
    const abstractControl = ngControl.control as AbstractControl;
    if (abstractControl && abstractControl.validator) {
      const validator = abstractControl.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }
}
