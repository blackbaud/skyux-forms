import {
  DebugElement
} from '@angular/core';

import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  BrowserModule,
  By
} from '@angular/platform-browser';

import {
  FormControl,
  FormsModule,
  NgModel,
  ReactiveFormsModule
} from '@angular/forms';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkyToggleComponent,
  SkyToggleModule
} from './';

import {
  ToggleChangeEventTestComponent,
  ToggleFormDirectivesTestComponent,
  ToggleOnPushTestComponent,
  ToggleReactiveFormTestComponent,
  ToggleTestComponent,
  ToggleTestModule
} from './fixtures';

describe('Toggle component', () => {
  let fixture: ComponentFixture<any>;

  function createEvent(eventName: string) {
    let evt = document.createEvent('CustomEvent');
    evt.initEvent(eventName, false, false);
    return evt;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        SkyToggleModule,
        ToggleTestModule
      ]
    });
  });

  describe('basic behaviors', () => {
    let toggleDebugElement: DebugElement;
    let toggleNativeElement: HTMLElement;
    let toggleInstance: SkyToggleComponent;
    let testComponent: ToggleTestComponent;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLLabelElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(ToggleTestComponent);

      fixture.detectChanges();
      tick();

      toggleDebugElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
      toggleNativeElement = toggleDebugElement.nativeElement;
      toggleInstance = toggleDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
      inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');
      labelElement =
        <HTMLLabelElement>toggleNativeElement.querySelector('label.sky-toggle-wrapper');
    }));

    it('should add and remove the toggled state', () => {
      expect(toggleInstance.toggled).toBe(false);
      expect(inputElement.checked).toBe(false);

      testComponent.isToggled = true;
      fixture.detectChanges();

      expect(toggleInstance.toggled).toBe(true);
      expect(inputElement.checked).toBe(true);

      testComponent.isToggled = false;
      fixture.detectChanges();

      expect(toggleInstance.toggled).toBe(false);
      expect(inputElement.checked).toBe(false);
    });

    it('should toggle `toggled` state on click', fakeAsync(() => {
      fixture.detectChanges();
      expect(toggleInstance.toggled).toBe(false);
      expect(testComponent.isToggled).toBe(false);

      labelElement.click();

      tick();
      fixture.detectChanges();
      expect(toggleInstance.toggled).toBe(true);
      expect(testComponent.isToggled).toBe(true);

      labelElement.click();

      tick();
      fixture.detectChanges();

      expect(toggleInstance.toggled).toBe(false);
      expect(testComponent.isToggled).toBe(false);
    }));

    it('should add and remove disabled state', () => {
      fixture.detectChanges();

      expect(toggleInstance.disabled).toBe(false);
      expect(inputElement.tabIndex).toBe(0);
      expect(inputElement.disabled).toBe(false);

      testComponent.isDisabled = true;
      fixture.detectChanges();

      expect(toggleInstance.disabled).toBe(true);
      expect(inputElement.disabled).toBe(true);

      testComponent.isDisabled = false;
      fixture.detectChanges();

      expect(toggleInstance.disabled).toBe(false);
      expect(inputElement.tabIndex).toBe(0);
      expect(inputElement.disabled).toBe(false);
    });

    it('should not toggle `toggled` state upon interation while disabled', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();

      inputElement.dispatchEvent(createEvent('change'));
      fixture.detectChanges();
      expect(toggleInstance.toggled).toBe(false);
      labelElement.click();
      expect(toggleInstance.toggled).toBe(false);
    });

    it('should preserve the user-provided id', () => {
      expect(toggleNativeElement.id).toBe('simple-toggle');
    });

    it('should project the toggle content into the label element', () => {
      let label =
        <HTMLLabelElement>toggleNativeElement
          .querySelector('.sky-toggle-wrapper sky-toggle-label');
      expect(label.textContent.trim()).toBe('Simple toggle');
    });

    it('should make the host element a tab stop', () => {
      expect(inputElement.tabIndex).toBe(0);
    });

    it('should pass accessibility', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(fixture.nativeElement).toBeAccessible();
      });
    }));

  });

  describe('with change event and no initial value', () => {
    let toggleDebugElement: DebugElement;
    let toggleNativeElement: HTMLElement;
    let toggleInstance: SkyToggleComponent;
    let testComponent: ToggleChangeEventTestComponent;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLLabelElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(ToggleChangeEventTestComponent);

      fixture.detectChanges();
      tick();

      toggleDebugElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
      toggleNativeElement = toggleDebugElement.nativeElement;
      toggleInstance = toggleDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
      inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');
      labelElement =
        <HTMLLabelElement>toggleNativeElement.querySelector('label.sky-toggle-wrapper');
    }));

    it('should call not call the change event when the toggle is not interacted with',
      fakeAsync(() => {
        fixture.detectChanges();
        expect(testComponent.lastEvent).toBeUndefined();

        toggleInstance.toggled = true;
        fixture.detectChanges();

        tick();
        expect(testComponent.lastEvent).toBeUndefined();
      }));

    it('should call the change event and not emit a DOM event to the change output', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.lastEvent).toBeUndefined();

      // Trigger the click on the inputElement, because the input will probably
      // emit a DOM event to the change output.
      inputElement.click();
      fixture.detectChanges();

      tick();
      // We're checking the arguments type / emitted value to be a boolean, because sometimes the
      // emitted value can be a DOM Event, which is not valid.
      // See angular/angular#4059
      expect(testComponent.lastEvent.toggled).toBe(true);

    }));
  });

  describe('with provided label attribute ', () => {
    let toggleDebugElement: DebugElement;
    let toggleNativeElement: HTMLElement;
    let inputElement: HTMLInputElement;

    it('should use the provided label as the input aria-label', fakeAsync(() => {
      fixture = TestBed.createComponent(ToggleTestComponent);

      toggleDebugElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
      toggleNativeElement = toggleDebugElement.nativeElement;
      inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');

      fixture.detectChanges();

      tick();
      expect(inputElement.getAttribute('aria-label')).toBe('Super effective');
    }));
  });

  describe('with provided labelledBy attribute ', () => {
    let toggleDebugElement: DebugElement;
    let toggleNativeElement: HTMLElement;
    let inputElement: HTMLInputElement;

    it('should use the provided labeledBy as the input aria-labelledby', fakeAsync(() => {
      fixture = TestBed.createComponent(ToggleTestComponent);

      toggleDebugElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
      toggleNativeElement = toggleDebugElement.nativeElement;
      inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');

      fixture.debugElement.componentInstance.labelledById = 'some-id';

      fixture.detectChanges();

      tick();
      expect(inputElement.getAttribute('aria-labelledby')).toBe('some-id');
    }));

    it('should not assign aria-labelledby if no labeledBy is provided', fakeAsync(() => {
      fixture = TestBed.createComponent(ToggleTestComponent);

      toggleDebugElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
      toggleNativeElement = toggleDebugElement.nativeElement;
      inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');

      fixture.detectChanges();

      tick();
      expect(inputElement.getAttribute('aria-labelledby')).toBeNull();
    }));
  });

  describe('with provided tabIndex', () => {
    let toggleDebugElement: DebugElement;
    let toggleNativeElement: HTMLElement;
    let testComponent: ToggleTestComponent;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLLabelElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(ToggleTestComponent);

      fixture.detectChanges();
      tick();

      testComponent = fixture.debugElement.componentInstance;
      toggleDebugElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
      toggleNativeElement = toggleDebugElement.nativeElement;
      inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');
      labelElement = <HTMLLabelElement>toggleNativeElement.querySelector('label');

      testComponent.customTabIndex = 7;
      fixture.detectChanges();
    }));

    it('should preserve any given tabIndex', () => {
      expect(inputElement.tabIndex).toBe(7);
    });

    it('should preserve given tabIndex when the toggle is disabled then enabled', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();

      testComponent.customTabIndex = 13;
      fixture.detectChanges();

      testComponent.isDisabled = false;
      fixture.detectChanges();

      expect(inputElement.tabIndex).toBe(13);
    });
  });

  describe('with multiple toggles', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ToggleTestComponent);
      fixture.debugElement.componentInstance.multiple = true;
      fixture.detectChanges();
    });

    it('should assign a unique id to each toggle', () => {
      let [firstId, secondId] =
        fixture.debugElement.queryAll(By.directive(SkyToggleComponent))
          .map(debugElement => debugElement.nativeElement.querySelector('input').id);

      expect(firstId).toBeTruthy();
      expect(secondId).toBeTruthy();
      expect(firstId).not.toEqual(secondId);
    });
  });

  describe('with ngModel and an initial value', () => {
    let toggleElement: DebugElement;
    let testComponent: ToggleFormDirectivesTestComponent;
    let inputElement: HTMLInputElement;
    let toggleNativeElement: HTMLElement;
    let ngModel: NgModel;
    let labelElement: HTMLLabelElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(ToggleFormDirectivesTestComponent);
      testComponent = fixture.debugElement.componentInstance;
      testComponent.isGood = true;

      fixture.detectChanges();
      tick();

      toggleElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
      toggleNativeElement = toggleElement.nativeElement;

      inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');
      ngModel = <NgModel>toggleElement.injector.get(NgModel);
      labelElement =
        <HTMLLabelElement>toggleElement
          .nativeElement.querySelector('label.sky-toggle-wrapper');
    }));

    it('should be in pristine, untouched, and valid states', fakeAsync(() => {
      fixture.detectChanges();
      expect(ngModel.valid).toBe(true);
      expect(ngModel.pristine).toBe(true);
      expect(ngModel.dirty).toBe(false);
      expect(ngModel.touched).toBe(false);
      expect(testComponent.isGood).toBe(true);

      labelElement.click();

      fixture.detectChanges();

      tick();
      fixture.detectChanges();

      expect(ngModel.valid).toBe(true);
      expect(ngModel.pristine).toBe(false);
      expect(ngModel.dirty).toBe(true);
      expect(ngModel.touched).toBe(false);
      expect(testComponent.isGood).toBe(false);

      inputElement.dispatchEvent(createEvent('blur'));
      expect(ngModel.touched).toBe(true);
    }));
  });

  describe('with ngModel', () => {
    let toggleElement: DebugElement;
    let testComponent: ToggleFormDirectivesTestComponent;
    let inputElement: HTMLInputElement;
    let toggleNativeElement: HTMLElement;
    let ngModel: NgModel;
    let labelElement: HTMLLabelElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(ToggleFormDirectivesTestComponent);

      fixture.detectChanges();
      tick();

      toggleElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
      toggleNativeElement = toggleElement.nativeElement;

      testComponent = fixture.debugElement.componentInstance;
      inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');
      ngModel = <NgModel>toggleElement.injector.get(NgModel);
      labelElement =
        <HTMLLabelElement>toggleElement
          .nativeElement.querySelector('label.sky-toggle-wrapper');
    }));

    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      fixture.detectChanges();
      expect(ngModel.valid).toBe(true);
      expect(ngModel.pristine).toBe(true);
      expect(ngModel.dirty).toBe(false);
      expect(ngModel.touched).toBe(false);

      labelElement.click();

      fixture.detectChanges();

      tick();
      fixture.detectChanges();

      expect(ngModel.valid).toBe(true);
      expect(ngModel.pristine).toBe(false);
      expect(ngModel.dirty).toBe(true);
      expect(ngModel.touched).toBe(false);
      expect(testComponent.isGood).toBe(true);

      inputElement.dispatchEvent(createEvent('blur'));
      expect(ngModel.touched).toBe(true);
    }));

    it('should change toggle state through ngModel programmatically', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      expect(inputElement.checked).toBe(false);
      expect(testComponent.isGood).toBe(false);
      fixture.detectChanges();
      testComponent.isGood = true;

      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(inputElement.checked).toBe(true);
    }));
  });

  describe('with reactive form', () => {
    let toggleElement: DebugElement;
    let testComponent: ToggleReactiveFormTestComponent;
    let inputElement: HTMLInputElement;
    let toggleNativeElement: HTMLElement;
    let formControl: FormControl;
    let labelElement: HTMLLabelElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(ToggleReactiveFormTestComponent);

      fixture.detectChanges();
      tick();

      toggleElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
      toggleNativeElement = toggleElement.nativeElement;

      testComponent = fixture.debugElement.componentInstance;
      inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');
      formControl = testComponent.toggle1;
      labelElement =
        <HTMLLabelElement>toggleElement
          .nativeElement.querySelector('label.sky-toggle-wrapper');
    }));

    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      fixture.detectChanges();
      expect(formControl.valid).toBe(true);
      expect(formControl.pristine).toBe(true);
      expect(formControl.dirty).toBe(false);
      expect(formControl.touched).toBe(false);

      labelElement.click();

      fixture.detectChanges();

      tick();
      fixture.detectChanges();

      expect(formControl.valid).toBe(true);
      expect(formControl.pristine).toBe(false);
      expect(formControl.touched).toBe(false);
      expect(formControl.dirty).toBe(true);
      expect(formControl.value).toBe(true);

      inputElement.dispatchEvent(createEvent('blur'));
      expect(formControl.touched).toBe(true);
    }));

    it('should change toggle state through form control programmatically', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      expect(inputElement.checked).toBe(false);
      expect(formControl.value).toBe(false);
      fixture.detectChanges();
      formControl.setValue(true);

      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(inputElement.checked).toBe(true);
    }));

    it('should change disable state through form control programmatically', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      expect(inputElement.disabled).toBe(false);
      expect(formControl.value).toBe(false);
      fixture.detectChanges();
      formControl.disable();

      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(inputElement.disabled).toBe(true);
      expect(inputElement.checked).toBe(false);

      formControl.enable();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(inputElement.disabled).toBe(false);
      expect(inputElement.checked).toBe(false);
    }));
  });

  describe('with name attribute', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ToggleTestComponent);

      fixture.detectChanges();
    });

    it('should forward name value to input element', () => {
      let toggleElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
      let inputElement = <HTMLInputElement>toggleElement.nativeElement.querySelector('input');

      expect(inputElement.getAttribute('name')).toBe('test-name');
    });
  });

  describe('with a consumer using OnPush change detection', () => {
    let toggleElement: DebugElement;
    let testComponent: ToggleOnPushTestComponent;
    let inputElement: HTMLInputElement;
    let toggleNativeElement: HTMLElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(ToggleOnPushTestComponent);

      fixture.detectChanges();
      tick();

      toggleElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
      toggleNativeElement = toggleElement.nativeElement;

      testComponent = fixture.debugElement.componentInstance;
      inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');
    }));

    it('should change toggle state through ngModel programmatically', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      expect(inputElement.checked).toBe(false);
      expect(testComponent.isToggled).toBe(false);
      fixture.detectChanges();
      testComponent.isToggled = true;
      testComponent.ref.markForCheck();

      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(inputElement.checked).toBe(true);
    }));
  });
});
