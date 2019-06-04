import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DebugElement
} from '@angular/core';
import {
  ComponentFixture,
  async,
  TestBed
} from '@angular/core/testing';
import {
  BrowserModule,
  By
} from '@angular/platform-browser';
import {
  FormsModule,
  NgModel,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkyToggleChange,
  SkyToggleComponent,
  SkyToggleModule
} from './';

/** Simple component for testing a single toggle. */
@Component({
  template: `
  <div>
    <sky-toggle
        id="simple-toggle"
        [toggled]="isToggled"
        [disabled]="isDisabled"
        (change)="toggleChange($event)">
      <sky-toggle-label>
        Simple toggle
      </sky-toggle-label>
    </sky-toggle>
  </div>`
})
class SingleToggleComponent {
  public isToggled: boolean = false;
  public isDisabled: boolean = false;

  public toggleChange($event: any) {
    this.isToggled = $event.toggled;
  }
}

/** Simple component for testing an MdToggle with ngModel. */
@Component({
  template: `
  <div>
    <form>
      <sky-toggle name="cb" [(ngModel)]="isGood" #wut>
        <sky-toggle-label>
          Be good
        </sky-toggle-label>
      </sky-toggle>
    </form>
  </div>
  `
})
class ToggleWithFormDirectivesComponent {
  public isGood: boolean = false;
}

/** Simple component for testing an MdToggle with ngModel. */
@Component({
  template: `
  <div>
    <form [formGroup]="toggleForm">
      <sky-toggle name="tog" formControlName="toggle1" #wut>
        <sky-toggle-label>
          Be good
        </sky-toggle-label>
      </sky-toggle>
    </form>
  </div>
  `
})
class ToggleWithReactiveFormComponent {
  public toggle1: FormControl = new FormControl(false);

  public toggleForm = new FormGroup({ 'toggle1': this.toggle1 });
}

/** Simple test component with multiple toggles. */
@Component(({
  template: `
    <sky-toggle>
      <sky-toggle-label>
        Option 1
      </sky-toggle-label>
    </sky-toggle>
    <sky-toggle>Option 2</sky-toggle>
  `
}))
class MultipleTogglesComponent { }

/** Simple test component with tabIndex */
@Component({
  template: `
    <sky-toggle [tabindex]="customTabIndex" [disabled]="isDisabled">
    </sky-toggle>`
})
class ToggleWithTabIndexComponent {
  public customTabIndex: number = 7;
  public isDisabled: boolean = false;
}

/** Simple test component with an aria-label set. */
@Component({
  template: `<sky-toggle label="Super effective"></sky-toggle>`
})
class ToggleWithAriaLabelComponent { }

/** Simple test component with an aria-label set. */
@Component({
  template: `<sky-toggle labelledBy="some-id"></sky-toggle>`
})
class ToggleWithAriaLabelledbyComponent { }

/** Simple test component with name attribute */
@Component({
  template: `<sky-toggle name="test-name"></sky-toggle>`
})
class ToggleWithNameAttributeComponent { }

/** Simple test component with change event */
@Component({
  template: `<sky-toggle (change)="lastEvent = $event"></sky-toggle>`
})
class ToggleWithChangeEventComponent {
  public lastEvent: SkyToggleChange;
}

/** Simple test component with OnPush change detection */
@Component({
  template: `
  <div>
    <sky-toggle
      id="simple-toggle"
      [(ngModel)]="isToggled">
    </sky-toggle>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class ToggleWithOnPushChangeDetectionComponent {
  public isToggled: boolean = false;
  constructor(public ref: ChangeDetectorRef) { }
}

describe('Toggle component', () => {
  let fixture: ComponentFixture<any>;

  function createEvent(eventName: string) {
    let evt = document.createEvent('CustomEvent');
    evt.initEvent(eventName, false, false);
    return evt;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToggleWithAriaLabelComponent,
        ToggleWithAriaLabelledbyComponent,
        ToggleWithChangeEventComponent,
        ToggleWithFormDirectivesComponent,
        ToggleWithNameAttributeComponent,
        ToggleWithOnPushChangeDetectionComponent,
        ToggleWithTabIndexComponent,
        ToggleWithReactiveFormComponent,
        MultipleTogglesComponent,
        SingleToggleComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        SkyToggleModule
      ]
    });
  });

  describe('basic behaviors', () => {
    let toggleDebugElement: DebugElement;
    let toggleNativeElement: HTMLElement;
    let toggleInstance: SkyToggleComponent;
    let testComponent: SingleToggleComponent;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLLabelElement;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(SingleToggleComponent);

      fixture.whenStable().then(() => {
        toggleDebugElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
        toggleNativeElement = toggleDebugElement.nativeElement;
        toggleInstance = toggleDebugElement.componentInstance;
        testComponent = fixture.debugElement.componentInstance;
        inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');
        labelElement =
          <HTMLLabelElement>toggleNativeElement.querySelector('label.sky-toggle-wrapper');
      });
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

    it('should toggle `toggled` state on click', async(() => {
      fixture.detectChanges();
      expect(toggleInstance.toggled).toBe(false);
      expect(testComponent.isToggled).toBe(false);

      labelElement.click();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(toggleInstance.toggled).toBe(true);
        expect(testComponent.isToggled).toBe(true);

        labelElement.click();

        fixture.whenStable().then(() => {
          fixture.detectChanges();

          expect(toggleInstance.toggled).toBe(false);
          expect(testComponent.isToggled).toBe(false);
        });
      });
    }));

    it('should add and remove disabled state', () => {
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
    let testComponent: ToggleWithChangeEventComponent;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLLabelElement;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(ToggleWithChangeEventComponent);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        toggleDebugElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
        toggleNativeElement = toggleDebugElement.nativeElement;
        toggleInstance = toggleDebugElement.componentInstance;
        testComponent = fixture.debugElement.componentInstance;
        inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');
        labelElement =
          <HTMLLabelElement>toggleNativeElement.querySelector('label.sky-toggle-wrapper');
      });
    }));

    it('should call not call the change event when the toggle is not interacted with',
      async(() => {
        fixture.detectChanges();
        expect(testComponent.lastEvent).toBeUndefined();

        toggleInstance.toggled = true;
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          expect(testComponent.lastEvent).toBeUndefined();
        });
      }));

    it('should call the change event and not emit a DOM event to the change output', async(() => {
      fixture.detectChanges();
      expect(testComponent.lastEvent).toBeUndefined();

      // Trigger the click on the inputElement, because the input will probably
      // emit a DOM event to the change output.
      inputElement.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        // We're checking the arguments type / emitted value to be a boolean, because sometimes the
        // emitted value can be a DOM Event, which is not valid.
        // See angular/angular#4059
        expect(testComponent.lastEvent.toggled).toBe(true);
      });

    }));
  });

  describe('with provided label attribute ', () => {
    let toggleDebugElement: DebugElement;
    let toggleNativeElement: HTMLElement;
    let inputElement: HTMLInputElement;

    it('should use the provided label as the input aria-label', async(() => {
      fixture = TestBed.createComponent(ToggleWithAriaLabelComponent);

      toggleDebugElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
      toggleNativeElement = toggleDebugElement.nativeElement;
      inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputElement.getAttribute('aria-label')).toBe('Super effective');
      });
    }));
  });

  describe('with provided labelledBy attribute ', () => {
    let toggleDebugElement: DebugElement;
    let toggleNativeElement: HTMLElement;
    let inputElement: HTMLInputElement;

    it('should use the provided labeledBy as the input aria-labelledby', async(() => {
      fixture = TestBed.createComponent(ToggleWithAriaLabelledbyComponent);

      toggleDebugElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
      toggleNativeElement = toggleDebugElement.nativeElement;
      inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputElement.getAttribute('aria-labelledby')).toBe('some-id');
      });
    }));

    it('should not assign aria-labelledby if no labeledBy is provided', async(() => {
      fixture = TestBed.createComponent(SingleToggleComponent);

      toggleDebugElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
      toggleNativeElement = toggleDebugElement.nativeElement;
      inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputElement.getAttribute('aria-labelledby')).toBeNull();
      });
    }));
  });

  describe('with provided tabIndex', () => {
    let toggleDebugElement: DebugElement;
    let toggleNativeElement: HTMLElement;
    let testComponent: ToggleWithTabIndexComponent;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLLabelElement;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(ToggleWithTabIndexComponent);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        testComponent = fixture.debugElement.componentInstance;
        toggleDebugElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
        toggleNativeElement = toggleDebugElement.nativeElement;
        inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');
        labelElement = <HTMLLabelElement>toggleNativeElement.querySelector('label');
      });
    }));

    it('should preserve any given tabIndex', async(() => {
      expect(inputElement.tabIndex).toBe(7);
    }));

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
    beforeEach(async(() => {
      fixture = TestBed.createComponent(MultipleTogglesComponent);

      fixture.detectChanges();
    }));

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
    let testComponent: ToggleWithFormDirectivesComponent;
    let inputElement: HTMLInputElement;
    let toggleNativeElement: HTMLElement;
    let ngModel: NgModel;
    let labelElement: HTMLLabelElement;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(ToggleWithFormDirectivesComponent);
      testComponent = fixture.debugElement.componentInstance;
      testComponent.isGood = true;
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        toggleElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
        toggleNativeElement = toggleElement.nativeElement;

        inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');
        ngModel = <NgModel>toggleElement.injector.get(NgModel);
        labelElement =
          <HTMLLabelElement>toggleElement
            .nativeElement.querySelector('label.sky-toggle-wrapper');
      });
    }));

    it('should be in pristine, untouched, and valid states', async(() => {
      fixture.detectChanges();
      expect(ngModel.valid).toBe(true);
      expect(ngModel.pristine).toBe(true);
      expect(ngModel.dirty).toBe(false);
      expect(ngModel.touched).toBe(false);
      expect(testComponent.isGood).toBe(true);

      labelElement.click();

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(ngModel.valid).toBe(true);
        expect(ngModel.pristine).toBe(false);
        expect(ngModel.dirty).toBe(true);
        expect(ngModel.touched).toBe(false);
        expect(testComponent.isGood).toBe(false);

        inputElement.dispatchEvent(createEvent('blur'));
        expect(ngModel.touched).toBe(true);
      });
    }));
  });

  describe('with ngModel', () => {
    let toggleElement: DebugElement;
    let testComponent: ToggleWithFormDirectivesComponent;
    let inputElement: HTMLInputElement;
    let toggleNativeElement: HTMLElement;
    let ngModel: NgModel;
    let labelElement: HTMLLabelElement;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(ToggleWithFormDirectivesComponent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        toggleElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
        toggleNativeElement = toggleElement.nativeElement;

        testComponent = fixture.debugElement.componentInstance;
        inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');
        ngModel = <NgModel>toggleElement.injector.get(NgModel);
        labelElement =
          <HTMLLabelElement>toggleElement
            .nativeElement.querySelector('label.sky-toggle-wrapper');
      });
    }));

    it('should be in pristine, untouched, and valid states initially', async(() => {
      fixture.detectChanges();
      expect(ngModel.valid).toBe(true);
      expect(ngModel.pristine).toBe(true);
      expect(ngModel.dirty).toBe(false);
      expect(ngModel.touched).toBe(false);

      labelElement.click();

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(ngModel.valid).toBe(true);
        expect(ngModel.pristine).toBe(false);
        expect(ngModel.dirty).toBe(true);
        expect(ngModel.touched).toBe(false);
        expect(testComponent.isGood).toBe(true);

        inputElement.dispatchEvent(createEvent('blur'));
        expect(ngModel.touched).toBe(true);
      });
    }));

    it('should change toggle state through ngModel programmatically', async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(inputElement.checked).toBe(false);
        expect(testComponent.isGood).toBe(false);
        fixture.detectChanges();
        testComponent.isGood = true;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(inputElement.checked).toBe(true);
        });
      });
    }));
  });

  describe('with reactive form', () => {
    let toggleElement: DebugElement;
    let testComponent: ToggleWithReactiveFormComponent;
    let inputElement: HTMLInputElement;
    let toggleNativeElement: HTMLElement;
    let formControl: FormControl;
    let labelElement: HTMLLabelElement;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(ToggleWithReactiveFormComponent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        toggleElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
        toggleNativeElement = toggleElement.nativeElement;

        testComponent = fixture.debugElement.componentInstance;
        inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');
        formControl = testComponent.toggle1;
        labelElement =
          <HTMLLabelElement>toggleElement
            .nativeElement.querySelector('label.sky-toggle-wrapper');
      });
    }));

    it('should be in pristine, untouched, and valid states initially', async(() => {
      fixture.detectChanges();
      expect(formControl.valid).toBe(true);
      expect(formControl.pristine).toBe(true);
      expect(formControl.dirty).toBe(false);
      expect(formControl.touched).toBe(false);

      labelElement.click();

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(formControl.valid).toBe(true);
        expect(formControl.pristine).toBe(false);
        expect(formControl.touched).toBe(false);
        expect(formControl.dirty).toBe(true);
        expect(formControl.value).toBe(true);

        inputElement.dispatchEvent(createEvent('blur'));
        expect(formControl.touched).toBe(true);
      });
    }));

    it('should change toggle state through form control programmatically', async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(inputElement.checked).toBe(false);
        expect(formControl.value).toBe(false);
        fixture.detectChanges();
        formControl.setValue(true);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(inputElement.checked).toBe(true);
        });
      });
    }));

    it('should change disable state through form control programmatically', async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(inputElement.disabled).toBe(false);
        expect(formControl.value).toBe(false);
        fixture.detectChanges();
        formControl.disable();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(inputElement.disabled).toBe(true);
          expect(inputElement.checked).toBe(false);

          formControl.enable();
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(inputElement.disabled).toBe(false);
            expect(inputElement.checked).toBe(false);
          });
        });
      });
    }));
  });

  describe('with name attribute', () => {
    beforeEach(async(() => {
      fixture = TestBed.createComponent(ToggleWithNameAttributeComponent);

      fixture.detectChanges();
    }));

    it('should forward name value to input element', () => {
      let toggleElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
      let inputElement = <HTMLInputElement>toggleElement.nativeElement.querySelector('input');

      expect(inputElement.getAttribute('name')).toBe('test-name');
    });
  });

  describe('with a consumer using OnPush change detection', () => {
    let toggleElement: DebugElement;
    let testComponent: ToggleWithOnPushChangeDetectionComponent;
    let inputElement: HTMLInputElement;
    let toggleNativeElement: HTMLElement;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(ToggleWithOnPushChangeDetectionComponent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        toggleElement = fixture.debugElement.query(By.directive(SkyToggleComponent));
        toggleNativeElement = toggleElement.nativeElement;

        testComponent = fixture.debugElement.componentInstance;
        inputElement = <HTMLInputElement>toggleNativeElement.querySelector('input');
      });
    }));

    it('should change toggle state through ngModel programmatically', async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(inputElement.checked).toBe(false);
        expect(testComponent.isToggled).toBe(false);
        fixture.detectChanges();
        testComponent.isToggled = true;
        testComponent.ref.markForCheck();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(inputElement.checked).toBe(true);
        });
      });
    }));
  });
});
