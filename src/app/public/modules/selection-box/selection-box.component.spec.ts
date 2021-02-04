import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  expect,
  expectAsync,
  SkyAppTestUtility
} from '@skyux-sdk/testing';

import {
  SkyMediaQueryService
} from '@skyux/core';

import {
  MockSkyMediaQueryService
} from '@skyux/core/testing';

import {
  SkySelectionBoxFixturesModule
} from './fixtures/selection-box-fixtures.module';

import {
  SelectionBoxTestComponent
} from './fixtures/selection-box.component.fixture';

import {
  SkySelectionBoxComponent
} from './selection-box.component';

describe('Selection box component', () => {

  //#region helpers
  function getRadioSelectionBoxes(): NodeListOf<HTMLElement> {
    return fixture.nativeElement.querySelectorAll('#radioSelectionBoxes .sky-selection-box');
  }
  function getCheckboxSelectionBoxes(): NodeListOf<HTMLElement> {
    return fixture.nativeElement.querySelectorAll('#checkboxSelectionBoxes .sky-selection-box');
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

  function getRadioButtons(): NodeListOf<HTMLInputElement> {
    return fixture.nativeElement.querySelectorAll('#radioSelectionBoxes input');
  }

  function getCheckboxes(): NodeListOf<HTMLInputElement> {
    return fixture.nativeElement.querySelectorAll('#checkboxSelectionBoxes input');
  }
  //#endregion

  let fixture: ComponentFixture<SelectionBoxTestComponent>;
  let mockMediaQueryService: MockSkyMediaQueryService;

  beforeEach(() => {

    mockMediaQueryService = new MockSkyMediaQueryService();
    TestBed.configureTestingModule({
      imports: [
        SkySelectionBoxFixturesModule
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

  it('should interact with radio buttons when clicking on selection box parent', () => {
    const selectionBoxes = getRadioSelectionBoxes();
    const radioButtons = getRadioButtons();
    selectionBoxes[1].click();
    fixture.detectChanges();

    expect(radioButtons[0].checked).toEqual(false);
    expect(radioButtons[1].checked).toEqual(true);
    expect(radioButtons[2].checked).toEqual(false);

    selectionBoxes[2].click();
    fixture.detectChanges();

    expect(radioButtons[0].checked).toEqual(false);
    expect(radioButtons[1].checked).toEqual(false);
    expect(radioButtons[2].checked).toEqual(true);
  });

  it('should interact with checkboxes when clicking on selection box parent', () => {
    const selectionBoxes = getCheckboxSelectionBoxes();
    const checkboxes = getCheckboxes();
    selectionBoxes[1].click();
    fixture.detectChanges();

    expect(checkboxes[0].checked).toEqual(false);
    expect(checkboxes[1].checked).toEqual(true);
    expect(checkboxes[2].checked).toEqual(false);

    selectionBoxes[2].click();
    fixture.detectChanges();

    expect(checkboxes[0].checked).toEqual(false);
    expect(checkboxes[1].checked).toEqual(true);
    expect(checkboxes[2].checked).toEqual(true);
  });

  // Tests that depend on sky-checkbox and sky-radio need to use async.
  it('show selected state when selection box is clicked', async(() => {
    const selectionBoxes = getCheckboxSelectionBoxes();

    selectionBoxes[1].click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(selectionBoxes[0]).not.toHaveCssClass('sky-selection-box-selected');
      expect(selectionBoxes[1]).toHaveCssClass('sky-selection-box-selected');
      expect(selectionBoxes[2]).not.toHaveCssClass('sky-selection-box-selected');
    })
  }));

  // Tests that depend on sky-checkbox and sky-radio need to use async.
  it('show selected state when space key is pressed', async(() => {
    const selectionBoxes = getCheckboxSelectionBoxes();

    SkyAppTestUtility.fireDomEvent(selectionBoxes[1], 'keydown', {
      customEventInit: {
        key: ' '
      }
    });
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(selectionBoxes[0]).not.toHaveCssClass('sky-selection-box-selected');
      expect(selectionBoxes[1]).toHaveCssClass('sky-selection-box-selected');
      expect(selectionBoxes[2]).not.toHaveCssClass('sky-selection-box-selected');
    })
  }));

  // Tests that depend on sky-checkbox and sky-radio need to use async.
  it('show selected state when checkbox is clicked', async(() => {
    const selectionBoxes = getCheckboxSelectionBoxes();

    getCheckboxes()[1].click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(selectionBoxes[0]).not.toHaveCssClass('sky-selection-box-selected');
      expect(selectionBoxes[1]).toHaveCssClass('sky-selection-box-selected');
      expect(selectionBoxes[2]).not.toHaveCssClass('sky-selection-box-selected');
    })
  }));

  // Tests that depend on sky-checkbox and sky-radio need to use async.
  it('show selected state when radio button is clicked', async(() => {
    const selectionBoxes = getRadioSelectionBoxes();

    getRadioButtons()[1].click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(selectionBoxes[0]).not.toHaveCssClass('sky-selection-box-selected');
      expect(selectionBoxes[1]).toHaveCssClass('sky-selection-box-selected');
      expect(selectionBoxes[2]).not.toHaveCssClass('sky-selection-box-selected');
    })
  }));

  it('should interact with form control when pressing space key on selection box parent', () => {
  });

  it('should have a role of button', () => {
    const role: string = getRadioSelectionBoxes()[0].getAttribute('role');
    expect(role).toBe('button');
  });

  it('should have a tabindex on the clickable area', () => {
    const tabIndex: string = getRadioSelectionBoxes()[0].getAttribute('tabindex');
    expect(tabIndex).toBe('0');
  });

  it('should update tabindex of tabbable children elements to -1', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const tabbableChild = fixture.nativeElement.querySelector('#link');
      expect(tabbableChild.getAttribute('tabindex')).toBe('-1');
    })
  }));

  it('should be accessible', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(async () => {
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  }));

});
