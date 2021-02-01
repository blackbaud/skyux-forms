import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  RouterTestingModule
} from '@angular/router/testing';

import {
  expect,
  expectAsync
} from '@skyux-sdk/testing';

import {
  SkyCoreAdapterService,
  SkyIdModule,
  SkyMediaQueryService
} from '@skyux/core';

import {
  MockSkyMediaQueryService
} from '@skyux/core/testing';

import {
  SkyCheckboxModule
} from '../checkbox/checkbox.module';

import {
  SkyRadioModule
} from '../radio/radio.module';

import {
  SelectionBoxTestComponent
} from './fixtures/selection-box.component.fixture';

import {
  SkySelectionBoxAdapterService
} from './selection-box-adapter.service';

import {
  SkySelectionBoxComponent
} from './selection-box.component';

import {
  SkySelectionBoxModule
} from './selection-box.module';

describe('Selection box component', () => {

  //#region helpers
  function getSelectionBox(): HTMLElement {
    return fixture.nativeElement.querySelector('.sky-selection-box');
  }

  function getDescription(): NodeListOf<HTMLElement> {
    return fixture.nativeElement.querySelectorAll('.sky-selection-box-description');
  }

  function getHeader(): NodeListOf<HTMLElement> {
    return fixture.nativeElement.querySelectorAll('.sky-selection-box-header');
  }

  function getIcon(): NodeListOf<HTMLElement> {
    return fixture.nativeElement.querySelectorAll('.sky-selection-box-icon');
  }
  //#endregion

  let fixture: ComponentFixture<SelectionBoxTestComponent>;
  let mockMediaQueryService: MockSkyMediaQueryService;

  beforeEach(() => {

    mockMediaQueryService = new MockSkyMediaQueryService();
    TestBed.configureTestingModule({
      declarations: [
        SelectionBoxTestComponent
      ],
      imports: [
        RouterTestingModule,
        SkyCheckboxModule,
        SkyIdModule,
        SkyRadioModule,
        SkySelectionBoxModule
      ],
      providers: [
        SkyCoreAdapterService,
        SkySelectionBoxAdapterService
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

    fixture.detectChanges();
  });

  it('should transclude icon, header, and detail sections', () => {
    expect(getIcon()[0]).not.toBeNull();
    expect(getHeader()[0]).not.toBeNull();
    expect(getDescription()[0]).not.toBeNull();
  });

  it('should interact with form control when clicking on selection box parent', () => {
  });

  it('should interact with form control when pressing enter on selection box parent', () => {
  });

  it('should have a role of button', () => {
    const role: string = getSelectionBox().getAttribute('role');
    expect(role).toBe('button');
  });

  it('should have a tabindex on the clickable area', () => {
    const tabIndex: string = getSelectionBox().getAttribute('tabindex');
    expect(tabIndex).toBe('0');
  });

  it('should be accessible', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(async () => {
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  }));

});
