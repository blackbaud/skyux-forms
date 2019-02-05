import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  async
} from '@angular/core/testing';

import {
  FormsModule,
  NgModel,
  ReactiveFormsModule
} from '@angular/forms';

import {
  By
} from '@angular/platform-browser';

import {
  expect
} from '@skyux-sdk/testing';

import {
  PhoneFieldTestComponent
} from './fixtures/phone-field.component.fixture';

import {
  PhoneFieldReactiveTestComponent
} from './fixtures/phone-field-reactive.component.fixture';

import {
  SkyPhoneFieldModule
} from './phone-field.module';

fdescribe('Phone Field Component', () => {

  function setInput(
    element: HTMLElement,
    text: string,
    compFixture: ComponentFixture<any>) {
    let inputEvent = document.createEvent('Event');
    let params = {
      bubbles: false,
      cancelable: false
    };
    inputEvent.initEvent('input', params.bubbles, params.cancelable);

    let changeEvent = document.createEvent('Event');
    changeEvent.initEvent('change', params.bubbles, params.cancelable);
    let inputEl = element.querySelector('input');
    inputEl.value = text;

    inputEl.dispatchEvent(inputEvent);
    compFixture.detectChanges();

    inputEl.dispatchEvent(changeEvent);
    compFixture.detectChanges();
    tick();
  }

  function blurInput(
    element: HTMLElement,
    compFixture: ComponentFixture<any>) {

    let inputEvent = document.createEvent('Event');
    let params = {
      bubbles: false,
      cancelable: false
    };
    inputEvent.initEvent('blur', params.bubbles, params.cancelable);
    let inputEl = element.querySelector('input');

    inputEl.dispatchEvent(inputEvent);
    compFixture.detectChanges();
    tick();
  }

  describe('template form', () => {

    let fixture: ComponentFixture<PhoneFieldTestComponent>;
    let component: PhoneFieldTestComponent;
    let nativeElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          PhoneFieldTestComponent
        ],
        imports: [
          SkyPhoneFieldModule,
          FormsModule
        ]
      });

      fixture = TestBed.createComponent(PhoneFieldTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      component = fixture.componentInstance;
    });

    it('should create the component with the appropriate styles', () => {
      fixture.detectChanges();
      expect(nativeElement.querySelector('input')).toHaveCssClass('sky-form-control');
      expect(nativeElement
        .querySelector('.sky-input-group .sky-input-group-btn .sky-dropdown-button'))
        .not.toBeNull();
    });

    xit('should be accessible', async(() => {
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(fixture.nativeElement).toBeAccessible();
      });
    }));

    describe('initialization', () => {

      it('should initialize the default country correctly', fakeAsync(() => {
        component.defaultCountry = 'us';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(nativeElement.querySelector('input').placeholder)
          .toBe(component.inputDirective.skyPhoneFieldComponent.countryData
            .find(country => country.iso2 === 'us').placeholder);
      }));

      it('should initialize without a default country', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(nativeElement.querySelector('input').placeholder)
          .toBe(component.inputDirective.skyPhoneFieldComponent.countryData[0].placeholder);
      }));

      it('should handle initializing with number', fakeAsync(() => {
        component.modelValue = '8675555309';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(nativeElement.querySelector('input').value).toBe('8675555309');
      }));

      it('should handle undefined initialization', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(nativeElement.querySelector('input').value).toBe('');

        expect(nativeElement.querySelector('input')).not.toHaveCssClass('ng-invalid');
      }));

    });

    describe('input change', () => {

      it('should handle input change with a string with the expected format', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        setInput(nativeElement, '8675555309', fixture);
        expect(nativeElement.querySelector('input').value).toBe('8675555309');
        expect(component.modelValue).toEqual('8675555309');
      }));

      it('should handle input change with a string with the an unexpected format', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        setInput(nativeElement, '867-555-5309', fixture);
        expect(nativeElement.querySelector('input').value).toBe('867-555-5309');
        expect(component.modelValue).toEqual('867-555-5309');
      }));

    });

    describe('model change', () => {

      it('should handle model change with a valid number', fakeAsync(() => {
        fixture.detectChanges();
        component.modelValue = '8675555309';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(nativeElement.querySelector('input').value).toBe('8675555309');
      }));

    });

    describe('validation', () => {
      let ngModel: NgModel;

      beforeEach(() => {
        let inputElement = fixture.debugElement.query(By.css('input'));
        ngModel = <NgModel>inputElement.injector.get(NgModel);
      });

      it('should validate properly when invalid number is passed through input change',
        fakeAsync(() => {
          component.defaultCountry = 'us';
          fixture.detectChanges();
          tick();
          setInput(nativeElement, '123', fixture);
          fixture.detectChanges();

          expect(nativeElement.querySelector('input').value).toBe('123');

          expect(component.modelValue)
            .toBe('123');

          expect(ngModel.valid).toBe(false);
          expect(ngModel.pristine).toBe(false);
          expect(ngModel.touched).toBe(false);

        }));

        it('should validate properly when invalid number on initialization', fakeAsync(() => {
          component.modelValue = '1234';
          component.defaultCountry = 'us';
          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          expect(nativeElement.querySelector('input').value).toBe('1234');

          expect(component.modelValue)
            .toBe('1234');

          expect(ngModel.valid).toBe(false);

          expect(ngModel.touched).toBe(false);

          blurInput(fixture.nativeElement, fixture);
          expect(ngModel.valid).toBe(false);
          expect(ngModel.touched).toBe(true);
        }));

        it('should validate properly when invalid number format on initialization', fakeAsync(() => {
          component.modelValue = '867-555-530';
          component.defaultCountry = 'us';
          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          expect(nativeElement.querySelector('input').value).toBe('867-555-530');

          expect(component.modelValue)
            .toBe('867-555-530');

          expect(ngModel.valid).toBe(false);

          expect(ngModel.touched).toBe(false);

          blurInput(fixture.nativeElement, fixture);
          expect(ngModel.valid).toBe(false);
          expect(ngModel.touched).toBe(true);
        }));

        it('should validate properly when valid number format on initialization', fakeAsync(() => {
          component.modelValue = '867-555-5309';
          component.defaultCountry = 'us';
          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          expect(nativeElement.querySelector('input').value).toBe('867-555-5309');

          expect(component.modelValue)
            .toBe('867-555-5309');

          expect(ngModel.valid).toBe(true);

          expect(ngModel.touched).toBe(false);

          blurInput(fixture.nativeElement, fixture);
          expect(ngModel.valid).toBe(true);
          expect(ngModel.touched).toBe(true);
        }));

        it('should validate properly when invalid number on model change', fakeAsync(() => {
          component.defaultCountry = 'us';
          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          component.modelValue = '1234';

          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          expect(nativeElement.querySelector('input').value).toBe('1234');

          expect(component.modelValue)
            .toBe('1234');

          expect(ngModel.valid).toBe(false);

        }));

        it('should validate properly when input changed to empty string', fakeAsync(() => {
          component.defaultCountry = 'us';
          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          setInput(fixture.nativeElement, '1234', fixture);

          setInput(fixture.nativeElement, '', fixture);

          expect(nativeElement.querySelector('input').value).toBe('');

          expect(component.modelValue)
            .toBe('');

          expect(ngModel.valid).toBe(true);
        }));

        it('should handle invalid and then valid number', fakeAsync(() => {
          component.defaultCountry = 'us';
          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          setInput(fixture.nativeElement, '1234', fixture);

          setInput(fixture.nativeElement, '8675555309', fixture);

          fixture.detectChanges();
          tick();

          expect(nativeElement.querySelector('input').value).toBe('8675555309');

          expect(component.modelValue)
            .toEqual('8675555309');

          expect(ngModel.valid).toBe(true);
        }));

        it('should handle noValidate property', fakeAsync(() => {
          component.noValidate = true;

          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          setInput(fixture.nativeElement, '1234', fixture);

          expect(nativeElement.querySelector('input').value).toBe('1234');

          expect(component.modelValue)
            .toBe('1234');

          expect(ngModel.valid).toBe(true);

        }));
    });

    describe('disabled state', () => {

      it('should disable the input and dropdown when disable is set to true', () => {
        component.isDisabled = true;
        fixture.detectChanges();

        expect(fixture.componentInstance.inputDirective.disabled).toBeTruthy();
        expect(fixture.debugElement.query(By.css('input')).nativeElement.disabled).toBeTruthy();
        expect(fixture.debugElement.query(By.css('sky-dropdown button')).nativeElement.disabled).toBeTruthy();
      });

      it('should not disable the input and dropdown when disable is set to false', () => {
        component.isDisabled = false;
        fixture.detectChanges();

        expect(fixture.componentInstance.inputDirective.disabled).toBeFalsy();
        expect(fixture.debugElement.query(By.css('input')).nativeElement.disabled).toBeFalsy();
        expect(fixture.debugElement.query(By.css('sky-dropdown button')).nativeElement.disabled).toBeFalsy();
      });

    });

    describe('country selector', () => {

      it('should update the placeholder to the new country', () => {
        fixture.detectChanges();
        let originalCountryData = component.inputDirective.skyPhoneFieldComponent
          .countryData.slice(0);

        fixture.debugElement.query(By.css('button.sky-dropdown-button')).nativeElement.click();
        fixture.detectChanges();

        fixture.debugElement.queryAll(By.css('.sky-dropdown-item button'))[2].nativeElement.click();
        fixture.detectChanges();

        expect(nativeElement.querySelector('input').placeholder)
          .toBe(originalCountryData[2].placeholder);
      });

      it('should revalidate after the country is changed', fakeAsync(() => {
        let inputElement = fixture.debugElement.query(By.css('input'));
        let ngModel = <NgModel>inputElement.injector.get(NgModel);

        component.defaultCountry = 'us';
        fixture.detectChanges();
        component.modelValue = '8675555309';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        tick();

        expect(ngModel.valid).toBe(true);

        fixture.debugElement.query(By.css('button.sky-dropdown-button')).nativeElement.click();
        fixture.detectChanges();
        tick();

        fixture.debugElement.queryAll(By.css('.sky-dropdown-item button'))[2].nativeElement.click();
        fixture.detectChanges();
        tick();

        expect(ngModel.valid).toBe(false);
      }));

      it('should validate correctly after country is changed', fakeAsync(() => {
        let inputElement = fixture.debugElement.query(By.css('input'));
        let ngModel = <NgModel>inputElement.injector.get(NgModel);

        component.defaultCountry = 'us';
        fixture.detectChanges();
        component.modelValue = '8675555309';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        tick();

        expect(ngModel.valid).toBe(true);

        fixture.debugElement.query(By.css('button.sky-dropdown-button')).nativeElement.click();
        fixture.detectChanges();
        tick();

        fixture.debugElement.queryAll(By.css('.sky-dropdown-item button'))[2].nativeElement.click();
        fixture.detectChanges();
        tick();

        expect(ngModel.valid).toBe(false);

        component.modelValue = '024569874';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        tick();

        expect(ngModel.valid).toBe(true);
      }));

    });

  });

  describe('reactive form', () => {
    let fixture: ComponentFixture<PhoneFieldReactiveTestComponent>;
    let component: PhoneFieldReactiveTestComponent;
    let nativeElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          PhoneFieldReactiveTestComponent
        ],
        imports: [
          SkyPhoneFieldModule,
          FormsModule,
          ReactiveFormsModule
        ]
      });

      fixture = TestBed.createComponent(PhoneFieldReactiveTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      component = fixture.componentInstance;
    });

    afterEach(() => {
      fixture.destroy();
    });

    describe('initialization', () => {

      it('should initialize the default country correctly', fakeAsync(() => {
        component.defaultCountry = 'us';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(nativeElement.querySelector('input').placeholder)
          .toBe(component.inputDirective.skyPhoneFieldComponent.countryData
            .find(country => country.iso2 === 'us').placeholder);
      }));

      it('should initialize without a default country', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(nativeElement.querySelector('input').placeholder)
          .toBe(component.inputDirective.skyPhoneFieldComponent.countryData[0].placeholder);
      }));

      it('should handle initializing with number', fakeAsync(() => {
        component.initialValue = '8675555309';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(nativeElement.querySelector('input').value).toBe('8675555309');
      }));

      it('should handle undefined initialization', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(nativeElement.querySelector('input').value).toBe('');

        expect(nativeElement.querySelector('input')).not.toHaveCssClass('ng-invalid');
      }));

    });

    describe('input change', () => {

      it('should handle input change with a string with the expected format', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        setInput(nativeElement, '8675555309', fixture);
        expect(nativeElement.querySelector('input').value).toBe('8675555309');
        expect(component.phoneControl.value).toEqual('8675555309');
      }));

      it('should handle input change with a string with the an unexpected format', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        setInput(nativeElement, '867-555-5309', fixture);
        expect(nativeElement.querySelector('input').value).toBe('867-555-5309');
        expect(component.phoneControl.value).toEqual('867-555-5309');
      }));

    });

    describe('model change', () => {

      it('should handle model change with a valid number', fakeAsync(() => {
        fixture.detectChanges();
        component.phoneControl.setValue('8675555309');
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(nativeElement.querySelector('input').value).toBe('8675555309');
      }));

    });

    describe('validation', () => {

      it('should validate properly when invalid number is passed through input change',
        fakeAsync(() => {
          component.defaultCountry = 'us';
          fixture.detectChanges();
          tick();
          setInput(nativeElement, '123', fixture);
          fixture.detectChanges();

          expect(nativeElement.querySelector('input').value).toBe('123');

          expect(component.phoneControl.value)
            .toBe('123');

          expect(component.phoneControl.valid).toBe(false);
          expect(component.phoneControl.pristine).toBe(false);
          expect(component.phoneControl.touched).toBe(false);

        }));

        it('should validate properly when invalid number on initialization', fakeAsync(() => {
          component.initialValue = '1234';
          component.defaultCountry = 'us';
          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          expect(nativeElement.querySelector('input').value).toBe('1234');

          expect(component.phoneControl.value)
            .toBe('1234');

          expect(component.phoneControl.valid).toBe(false);

          expect(component.phoneControl.touched).toBe(false);

          blurInput(fixture.nativeElement, fixture);
          expect(component.phoneControl.valid).toBe(false);
          expect(component.phoneControl.touched).toBe(true);
        }));

        it('should validate properly when invalid number format on initialization', fakeAsync(() => {
          component.initialValue = '867-555-530';
          component.defaultCountry = 'us';
          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          expect(nativeElement.querySelector('input').value).toBe('867-555-530');

          expect(component.phoneControl.value)
            .toBe('867-555-530');

          expect(component.phoneControl.valid).toBe(false);

          expect(component.phoneControl.touched).toBe(false);

          blurInput(fixture.nativeElement, fixture);
          expect(component.phoneControl.valid).toBe(false);
          expect(component.phoneControl.touched).toBe(true);
        }));

        it('should validate properly when valid number format on initialization', fakeAsync(() => {
          component.initialValue = '867-555-5309';
          component.defaultCountry = 'us';
          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          expect(nativeElement.querySelector('input').value).toBe('867-555-5309');

          expect(component.phoneControl.value)
            .toBe('867-555-5309');

          expect(component.phoneControl.valid).toBe(true);

          expect(component.phoneControl.touched).toBe(false);

          blurInput(fixture.nativeElement, fixture);
          expect(component.phoneControl.valid).toBe(true);
          expect(component.phoneControl.touched).toBe(true);
        }));

        it('should validate properly when invalid number on model change', fakeAsync(() => {
          component.defaultCountry = 'us';
          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          component.phoneControl.setValue('1234');

          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          expect(nativeElement.querySelector('input').value).toBe('1234');

          expect(component.phoneControl.value)
            .toBe('1234');

          expect(component.phoneControl.valid).toBe(false);

        }));

        it('should validate properly when input changed to empty string', fakeAsync(() => {
          component.defaultCountry = 'us';
          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          setInput(fixture.nativeElement, '1234', fixture);

          setInput(fixture.nativeElement, '', fixture);

          expect(nativeElement.querySelector('input').value).toBe('');

          expect(component.phoneControl.value)
            .toBe('');

          expect(component.phoneControl.valid).toBe(true);
        }));

        it('should handle invalid and then valid number', fakeAsync(() => {
          component.defaultCountry = 'us';
          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          setInput(fixture.nativeElement, '1234', fixture);

          setInput(fixture.nativeElement, '8675555309', fixture);

          fixture.detectChanges();
          tick();

          expect(nativeElement.querySelector('input').value).toBe('8675555309');

          expect(component.phoneControl.value)
            .toEqual('8675555309');

          expect(component.phoneControl.valid).toBe(true);
        }));

        it('should handle noValidate property', fakeAsync(() => {
          component.noValidate = true;

          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          setInput(fixture.nativeElement, '1234', fixture);

          expect(nativeElement.querySelector('input').value).toBe('1234');

          expect(component.phoneControl.value)
            .toBe('1234');

          expect(component.phoneControl.valid).toBe(true);

        }));
    });

    describe('disabled state', () => {

      it('should disable the input and dropdown when disable is set to true', fakeAsync(() => {
        fixture.detectChanges();
        component.phoneControl.disable();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        tick();

        expect(fixture.componentInstance.inputDirective.disabled).toBeTruthy();
        expect(fixture.debugElement.query(By.css('input')).nativeElement.disabled).toBeTruthy();
        expect(fixture.debugElement.query(By.css('sky-dropdown button')).nativeElement.disabled).toBeTruthy();
      }));

      it('should not disable the input and dropdown when disable is set to false', fakeAsync(() => {
        fixture.detectChanges();
        component.phoneControl.enable();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        tick();

        expect(fixture.componentInstance.inputDirective.disabled).toBeFalsy();
        expect(fixture.debugElement.query(By.css('input')).nativeElement.disabled).toBeFalsy();
        expect(fixture.debugElement.query(By.css('sky-dropdown button')).nativeElement.disabled).toBeFalsy();
      }));

    });

    describe('country selector', () => {

      it('should update the placeholder to the new country', () => {
        fixture.detectChanges();
        let originalCountryData = component.inputDirective.skyPhoneFieldComponent
          .countryData.slice(0);

        fixture.debugElement.query(By.css('button.sky-dropdown-button')).nativeElement.click();
        fixture.detectChanges();

        fixture.debugElement.queryAll(By.css('.sky-dropdown-item button'))[2].nativeElement.click();
        fixture.detectChanges();

        expect(nativeElement.querySelector('input').placeholder)
          .toBe(originalCountryData[2].placeholder);
      });

      it('should revalidate after the country is changed', fakeAsync(() => {
        component.defaultCountry = 'us';
        fixture.detectChanges();
        component.phoneControl.setValue('8675555309');
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        tick();

        expect(component.phoneControl.valid).toBe(true);

        fixture.debugElement.query(By.css('button.sky-dropdown-button')).nativeElement.click();
        fixture.detectChanges();
        tick();

        fixture.debugElement.queryAll(By.css('.sky-dropdown-item button'))[2].nativeElement.click();
        fixture.detectChanges();
        tick();

        expect(component.phoneControl.valid).toBe(false);
      }));

      it('should validate correctly after country is changed', fakeAsync(() => {
        component.defaultCountry = 'us';
        fixture.detectChanges();
        component.phoneControl.setValue('8675555309');
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        tick();

        expect(component.phoneControl.valid).toBe(true);

        fixture.debugElement.query(By.css('button.sky-dropdown-button')).nativeElement.click();
        fixture.detectChanges();
        tick();

        fixture.debugElement.queryAll(By.css('.sky-dropdown-item button'))[2].nativeElement.click();
        fixture.detectChanges();
        tick();

        expect(component.phoneControl.valid).toBe(false);

        component.phoneControl.setValue('024569874');
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        tick();

        expect(component.phoneControl.valid).toBe(true);
      }));

    });

  });

});
