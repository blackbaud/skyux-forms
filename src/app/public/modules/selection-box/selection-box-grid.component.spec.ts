import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  expect,
  expectAsync
} from '@skyux-sdk/testing';

import {
  SkyTheme,
  SkyThemeMode,
  SkyThemeService,
  SkyThemeSettings,
  SkyThemeSettingsChange
} from '@skyux/theme';

import {
  BehaviorSubject
} from 'rxjs';

import {
  SkySelectionBoxFixturesModule
} from './fixtures/selection-box-fixtures.module';

import {
  SelectionBoxGridTestComponent
} from './fixtures/selection-box-grid.component.fixture';
import { SkySelectionBoxGridComponent } from './selection-box-grid.component';

import {
  SkySelectionBoxGridAlignItems
} from './types/selection-box-grid-align-items';

describe('Selection box grid component', () => {

  //#region helpers
  function getSelectionBoxGrid(): HTMLElement {
    return fixture.nativeElement.querySelector('.sky-selection-box-grid');
  }

  function getSelectionBoxes(): NodeListOf<HTMLElement> {
    return fixture.nativeElement.querySelectorAll('.sky-selection-box-grid .sky-selection-box');
  }
  //#endregion

  let fixture: ComponentFixture<SelectionBoxGridTestComponent>;
  let component: SelectionBoxGridTestComponent;
  let mockThemeSvc: {
    settingsChange: BehaviorSubject<SkyThemeSettingsChange>
  };

  beforeEach(() => {
    mockThemeSvc = {
      settingsChange: new BehaviorSubject<SkyThemeSettingsChange>(
        {
          currentSettings: new SkyThemeSettings(
            SkyTheme.presets.default,
            SkyThemeMode.presets.light
          ),
          previousSettings: undefined
        }
      )
    };

    fixture = TestBed.configureTestingModule({
      imports: [
        SkySelectionBoxFixturesModule
      ],
      providers: [
        {
          provide: SkyThemeService,
          useValue: mockThemeSvc
        }
      ]
    }).createComponent(SelectionBoxGridTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set alignItems to center by default', () => {
    expect(getSelectionBoxGrid()).not.toHaveCssClass('sky-selection-box-grid-align-left');
    expect(getSelectionBoxGrid()).toHaveCssClass('sky-selection-box-grid-align-center');
  });

  it('should set proper CSS classess when alignItems is set to center', () => {
    component.alignItems = SkySelectionBoxGridAlignItems.Center;
    fixture.detectChanges();

    expect(getSelectionBoxGrid()).not.toHaveCssClass('sky-selection-box-grid-align-left');
    expect(getSelectionBoxGrid()).toHaveCssClass('sky-selection-box-grid-align-center');
  });

  it('should set proper CSS classess when alignItems is set to left', () => {
    component.alignItems = SkySelectionBoxGridAlignItems.Left;
    fixture.detectChanges();

    expect(getSelectionBoxGrid()).not.toHaveCssClass('sky-selection-box-grid-align-center');
    expect(getSelectionBoxGrid()).toHaveCssClass('sky-selection-box-grid-align-left');
  });

  it(`should sync all child selection boxes to have the same height as the tallest selection box`, async(() => {
    fixture.componentInstance.firstBoxHeight = '500px';
    fixture.detectChanges();
    // Wait for setTimeout() to fire.
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const selectionBoxes = getSelectionBoxes();
      const newHeight = selectionBoxes[0].getBoundingClientRect().height;

      expect(newHeight).toBeGreaterThanOrEqual(500);
      for (let i = 0; i < selectionBoxes.length; i++) {
        expect(selectionBoxes[i].getBoundingClientRect().height).toEqual(newHeight);
      }
    });
  }));

  it(`should update CSS responsive classes on window resize`, async(() => {
    const spy = spyOn(SkySelectionBoxGridComponent.prototype as any, 'updateBreakpointClass');
    expect(spy).not.toHaveBeenCalled();

    // IE 11 workaround for window.dispatchEvent.
    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
      const evt = document.createEvent('UIEvents') as any;
      evt.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(evt);
    } else {
      window.dispatchEvent(new Event('resize'));
    }
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('should be accessible', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    await expectAsync(fixture.nativeElement).toBeAccessible();
  });

});
