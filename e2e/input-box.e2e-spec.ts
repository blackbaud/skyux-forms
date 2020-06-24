import {
  browser,
  by,
  element,
  Key
} from 'protractor';

import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

describe('Input box', () => {
  let currentTheme: string;
  let currentThemeMode: string;

  async function selectTheme(theme: string, mode: string): Promise<void> {
    currentTheme = theme;
    currentThemeMode = mode;

    return SkyVisualThemeSelector.selectTheme(theme, mode);
  }

  function getScreenshotName(name: string): string {
    if (currentTheme) {
      name += '-' + currentTheme;
    }

    if (currentThemeMode) {
      name += '-' + currentThemeMode;
    }

    return name;
  }

  async function clickLabel(wrapperId: string): Promise<void> {
    await element(by.css(`#${wrapperId} label`)).click();

    // Move the cursor so the hover state isn't activated.
    await SkyHostBrowser.moveCursorOffScreen();
  }

  async function hoverElement(selector: string): Promise<void> {
    await browser.actions().mouseMove(element(by.css(selector))).perform();
  }

  async function mouseDownElement(selector: string): Promise<void> {
    await browser.actions().mouseDown(element(by.css(selector))).perform();
  }

  async function tabToNextElement(): Promise<void> {
    const el = await browser.driver.switchTo().activeElement();
    await el.sendKeys(Key.TAB);
  }

  async function validateBasic(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-basic');

    expect('#input-box-basic').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-basic')
    });
  }

  async function validateSideBySide(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-side-by-side');

    expect('#input-box-side-by-side').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-side-by-side')
    });
  }

  async function validateFocusedBasic(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-basic');

    await clickLabel('input-box-basic');

    expect('#input-box-basic').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-basic-focused')
    });
  }

  async function validateFocusedTextarea(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-textarea');

    await clickLabel('input-box-textarea');

    expect('#input-box-textarea').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-textarea-focused')
    });
  }

  async function validateFocusedButtonSingleInput(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-button-single');

    await clickLabel('input-box-button-single');

    expect('#input-box-button-single').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-button-focused-single-input')
    });
  }

  async function validateFocusedButtonSingleButton(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-button-single');

    await clickLabel('input-box-button-single');
    await tabToNextElement();

    expect('#input-box-button-single').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-button-focused-single-button')
    });
  }

  async function validateFocusedButtonMutlipleButton1(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-button-multiple');

    await clickLabel('input-box-button-multiple');
    await tabToNextElement();

    expect('#input-box-button-multiple').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-button-focused-multiple-button-1')
    });
  }

  async function validateFocusedButtonMutlipleButton2(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-button-multiple');

    await clickLabel('input-box-button-multiple');
    await tabToNextElement();
    await tabToNextElement();

    expect('#input-box-button-multiple').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-button-focused-multiple-button-2')
    });
  }

  async function validateHoverBasic(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-basic');

    await hoverElement('#input-box-basic input');

    expect('#input-box-basic').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-basic-hover')
    });
  }

  async function validateActiveBasic(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-basic');

    await mouseDownElement('#input-box-basic input');

    expect('#input-box-basic').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-basic-active')
    });
  }

  async function validateHoverButtonSingleInput(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-button-single');

    await hoverElement('#input-box-button-single input');

    expect('#input-box-button-single').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-button-hover-single-input')
    });
  }

  async function validateHoverButtonSingleButton(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-button-single');

    await hoverElement('#input-box-button-single button');

    expect('#input-box-button-single').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-button-hover-single-button')
    });
  }

  async function validateErrorFormControl(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-form-control-error');

    expect('#input-box-form-control-error').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-form-control-error')
    });
  }

  async function validateErrorFormControlName(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-form-control-name-error');

    expect('#input-box-form-control-name-error').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-form-control-name-error')
    });
  }

  async function validateErrorNgModel(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-ngmodel-error');

    expect('#input-box-ngmodel-error').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-ngmodel-error')
    });
  }

  async function validateErrorFocused(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-ngmodel-error');

    await clickLabel('input-box-ngmodel-error');

    expect('#input-box-ngmodel-error').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-error-focused')
    });
  }

  async function validateErrorHover(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-ngmodel-error');

    await hoverElement('#input-box-ngmodel-error');

    expect('#input-box-ngmodel-error').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-error-hover')
    });
  }

  async function validateFocusedErrorInput(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-form-control-error-button-single');

    await clickLabel('input-box-form-control-error-button-single');

    expect('#input-box-form-control-error-button-single').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-error-focused-input')
    });
  }

  async function validateFocusedErrorButton(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-form-control-error-button-single');

    await clickLabel('input-box-form-control-error-button-single');
    await tabToNextElement();

    expect('#input-box-form-control-error-button-single').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-error-focused-button')
    });
  }

  async function validateDisabled(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-disabled');

    expect('#input-box-disabled').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-disabled')
    });
  }

  async function validateButtonDisabled(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-button-disabled');

    expect('#input-box-disabled').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-button-disabled')
    });
  }

  async function validateDisabledHover(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-disabled');

    await hoverElement('#input-box-disabled');

    expect('#input-box-disabled').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-disabled-hover')
    });
  }

  beforeEach(async () => {
    currentTheme = undefined;
    currentThemeMode = undefined;

    await SkyHostBrowser.get('visual/input-box');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-input-box');
    await SkyHostBrowser.moveCursorOffScreen();
  });

  it('should match previous input box screenshot', (done) => {
    validateBasic(done);
  });

  it('should match previous input box side-by-side screenshot', (done) => {
    validateSideBySide(done);
  });

  it('should match previous basic input box screenshot when focused', (done) => {
    validateFocusedBasic(done);
  });

  it('should match previous basic input box screenshot when hovered', (done) => {
    validateHoverBasic(done);
  });

  it('should match previous basic input box screenshot when active', (done) => {
    validateActiveBasic(done);
  });

  it('should match previous textarea input box screenshot when focused', (done) => {
    validateFocusedTextarea(done);
  });

  it('should match previous input box with a button screenshot when input is focused', (done) => {
    validateFocusedButtonSingleInput(done);
  });

  it('should match previous input box with a button screenshot when button is focused', (done) => {
    validateFocusedButtonSingleButton(done);
  });

  it(
    'should match previous input box with multiple buttons screenshot when button 1 is focused',
    (done) => {
      validateFocusedButtonMutlipleButton1(done);
    }
  );

  it(
    'should match previous input box with multiple buttons screenshot when button 2 is focused',
    (done) => {
      validateFocusedButtonMutlipleButton2(done);
    }
  );

  it(
    'should match previous input box with single button screenshot when input is hovered',
    (done) => {
      validateHoverButtonSingleInput(done);
    }
  );

  it(
    'should match previous input box with single button screenshot when button is hovered',
    (done) => {
      validateHoverButtonSingleButton(done);
    }
  );

  it(
    'should match previous input box with error when bound to form control',
    (done) => {
      validateErrorFormControl(done);
    }
  );

  it(
    'should match previous input box with error when bound to form control name',
    (done) => {
      validateErrorFormControlName(done);
    }
  );

  it(
    'should match previous input box with error when bound to ngModel',
    (done) => {
      validateErrorNgModel(done);
    }
  );

  it(
    'should match previous input box with error when focused',
    (done) => {
      validateErrorFocused(done);
    }
  );

  it(
    'should match previous input box with button and error when input is focused',
    (done) => {
      validateFocusedErrorInput(done);
    }
  );

  it(
    'should match previous input box with button and error when button is focused',
    (done) => {
      validateFocusedErrorButton(done);
    }
  );

  it(
    'should match previous input box with error when hovered',
    (done) => {
      validateErrorHover(done);
    }
  );

  it('should match previous input box when disabled', (done) => {
    validateDisabled(done);
  });

  it('should match previous input box when disabled and hovered', (done) => {
    validateDisabledHover(done);
  });

  it('should match previous input box with button when disabled', (done) => {
    validateButtonDisabled(done);
  });

  describe('when modern theme', () => {

    beforeEach(async () => {
      await selectTheme('modern', 'light');
    });

    it('should match previous input box screenshot', (done) => {
      validateBasic(done);
    });

    it('should match previous input box side-by-side screenshot', (done) => {
      validateSideBySide(done);
    });

    it('should match previous basic input box screenshot when focused', (done) => {
      validateFocusedBasic(done);
    });

    it('should match previous basic input box screenshot when hovered', (done) => {
      validateHoverBasic(done);
    });

    it('should match previous basic input box screenshot when active', (done) => {
      validateActiveBasic(done);
    });

    it('should match previous textarea input box screenshot when focused', (done) => {
      validateFocusedTextarea(done);
    });

    it('should match previous input box with a button screenshot when input is focused', (done) => {
      validateFocusedButtonSingleInput(done);
    });

    it(
      'should match previous input box with a button screenshot when button is focused',
      (done) => {
        validateFocusedButtonSingleButton(done);
      }
    );

    it(
      'should match previous input box with multiple buttons screenshot when button 1 is focused',
      (done) => {
        validateFocusedButtonMutlipleButton1(done);
      }
    );

    it(
      'should match previous input box with multiple buttons screenshot when button 2 is focused',
      (done) => {
        validateFocusedButtonMutlipleButton2(done);
      }
    );

    it(
      'should match previous input box with single button screenshot when input is hovered',
      (done) => {
        validateHoverButtonSingleInput(done);
      }
    );

    it(
      'should match previous input box with single button screenshot when button is hovered',
      (done) => {
        validateHoverButtonSingleButton(done);
      }
    );

    it(
      'should match previous input box with error when bound to form control',
      (done) => {
        validateErrorFormControl(done);
      }
    );

    it(
      'should match previous input box with error when bound to form control name',
      (done) => {
        validateErrorFormControlName(done);
      }
    );

    it(
      'should match previous input box with error when bound to ngModel',
      (done) => {
        validateErrorNgModel(done);
      }
    );

    it(
      'should match previous input box with error when focused',
      (done) => {
        validateErrorFocused(done);
      }
    );

    it(
      'should match previous input box with button and error when input is focused',
      (done) => {
        validateFocusedErrorInput(done);
      }
    );

    it(
      'should match previous input box with button and error when button is focused',
      (done) => {
        validateFocusedErrorButton(done);
      }
    );

    it(
      'should match previous input box with error when hovered',
      (done) => {
        validateErrorHover(done);
      }
    );

    it('should match previous input box when disabled', (done) => {
      validateDisabled(done);
    });

    it('should match previous input box when disabled and hovered', (done) => {
      validateDisabledHover(done);
    });

    it('should match previous input box with button when disabled', (done) => {
      validateButtonDisabled(done);
    });

  });

  describe('when modern theme in dark mode', () => {

    beforeEach(async () => {
      await selectTheme('modern', 'dark');
    });

    it('should match previous input box screenshot', (done) => {
      validateBasic(done);
    });

    it('should match previous input box side-by-side screenshot', (done) => {
      validateSideBySide(done);
    });

    it('should match previous basic input box screenshot when focused', (done) => {
      validateFocusedBasic(done);
    });

    it('should match previous basic input box screenshot when hovered', (done) => {
      validateHoverBasic(done);
    });

    it('should match previous basic input box screenshot when active', (done) => {
      validateActiveBasic(done);
    });

    it('should match previous textarea input box screenshot when focused', (done) => {
      validateFocusedTextarea(done);
    });

    it('should match previous input box with a button screenshot when input is focused', (done) => {
      validateFocusedButtonSingleInput(done);
    });

    it(
      'should match previous input box with a button screenshot when button is focused',
      (done) => {
        validateFocusedButtonSingleButton(done);
      }
    );

    it(
      'should match previous input box with multiple buttons screenshot when button 1 is focused',
      (done) => {
        validateFocusedButtonMutlipleButton1(done);
      }
    );

    it(
      'should match previous input box with multiple buttons screenshot when button 2 is focused',
      (done) => {
        validateFocusedButtonMutlipleButton2(done);
      }
    );

    it(
      'should match previous input box with single button screenshot when input is hovered',
      (done) => {
        validateHoverButtonSingleInput(done);
      }
    );

    it(
      'should match previous input box with single button screenshot when button is hovered',
      (done) => {
        validateHoverButtonSingleButton(done);
      }
    );

    it(
      'should match previous input box with error when bound to form control',
      (done) => {
        validateErrorFormControl(done);
      }
    );

    it(
      'should match previous input box with error when bound to form control name',
      (done) => {
        validateErrorFormControlName(done);
      }
    );

    it(
      'should match previous input box with error when bound to ngModel',
      (done) => {
        validateErrorNgModel(done);
      }
    );

    it(
      'should match previous input box with error when focused',
      (done) => {
        validateErrorFocused(done);
      }
    );

    it(
      'should match previous input box with button and error when input is focused',
      (done) => {
        validateFocusedErrorInput(done);
      }
    );

    it(
      'should match previous input box with button and error when button is focused',
      (done) => {
        validateFocusedErrorButton(done);
      }
    );

    it(
      'should match previous input box with error when hovered',
      (done) => {
        validateErrorHover(done);
      }
    );

    it('should match previous input box when disabled', (done) => {
      validateDisabled(done);
    });

    it('should match previous input box when disabled and hovered', (done) => {
      validateDisabledHover(done);
    });

    it('should match previous input box with button when disabled', (done) => {
      validateButtonDisabled(done);
    });

  });

});
