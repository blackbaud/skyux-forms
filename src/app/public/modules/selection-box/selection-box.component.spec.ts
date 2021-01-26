import {
  DebugElement
} from '@angular/core';

import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  BrowserModule,
  By
} from '@angular/platform-browser';

import {
  RouterTestingModule
} from '@angular/router/testing';

import {
  expect,
  expectAsync
} from '@skyux-sdk/testing';

import {
  SkyMediaQueryService
} from '@skyux/core';

import {
  MockSkyMediaQueryService
} from '@skyux/core/testing';

import {
  SelectionBoxTestComponent
} from './fixtures/selection-box.component.fixture';

import {
  SkySelectionBoxComponent
} from './selection-box.component';

import {
  SkySelectionBoxModule
} from './selection-box.module';

describe('Selection box component', () => {

  //#region helpers
  function getDescription(): HTMLElement {
    return fixture.nativeElement.querySelector('description');
  }

  function getHeader(): HTMLElement {
    return fixture.nativeElement.querySelector('header');
  }

  function getIcon(): HTMLElement {
    return fixture.nativeElement.querySelector('icon');
  }
  //#endregion

  let fixture: ComponentFixture<SelectionBoxTestComponent>;
  let cmp: SelectionBoxTestComponent;
  let el: HTMLElement;
  let debugElement: DebugElement;
  let mockMediaQueryService: MockSkyMediaQueryService;

  beforeEach(() => {

    mockMediaQueryService = new MockSkyMediaQueryService();
    TestBed.configureTestingModule({
      declarations: [
        SelectionBoxTestComponent
      ],
      imports: [
        BrowserModule,
        RouterTestingModule,
        SkySelectionBoxModule
      ]
    });

    fixture = TestBed.overrideComponent(SkySelectionBoxComponent, {
      add: {
        providers: [
          {
            provide: SkyMediaQueryService,
            useValue: mockMediaQueryService
          }
        ]
      }
    })
    .createComponent(SelectionBoxTestComponent);

    fixture = TestBed.createComponent(SelectionBoxTestComponent);
    cmp = fixture.componentInstance as SelectionBoxTestComponent;
    el = fixture.nativeElement as HTMLElement;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should transclude icon, header, and detail sections', () => {
    expect(iconContainer).not.toBeNull();
    expect(headerContainer).not.toBeNull();
    expect(detailsContainer).not.toBeNull();
  });

  it('should interact with form control when clicking on selection box parent', () => {
  });

  it('should interact with form control when pressing enter on selection box parent', () => {
  });

  it('should have a role of button and tabindex on the clickable area', () => {
    expect(debugElement.query(By.css('.sky-action-button')).attributes['role']).toBe('button');
    expect(debugElement.query(By.css('.sky-action-button')).attributes['tabindex']).toBe('0');
  });

  it('should be accessible', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(async () => {
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  }));

});
