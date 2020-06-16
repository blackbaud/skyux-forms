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

    await element(by.css('#input-box-basic label')).click();

    expect('#input-box-basic').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-box-basic-focused')
    });
  }

  async function validateFocusedTextarea(done: DoneFn): Promise<void> {
    await SkyHostBrowser.scrollTo('#input-box-textarea');

    await element(by.css('#input-box-textarea label')).click();

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

  beforeEach(async () => {
    currentTheme = undefined;
    currentThemeMode = undefined;

    await SkyHostBrowser.get('visual/input-box');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-input-box');
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

  it('should match previous input box disabled screenshot', (done) => {
    validateDisabled(done);
  });

  it('should match previous input box with button disabled screenshot', (done) => {
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

    it('should match previous input box disabled screenshot', (done) => {
      validateDisabled(done);
    });

    it('should match previous input box with button disabled screenshot', (done) => {
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

    it('should match previous input box disabled screenshot', (done) => {
      validateDisabled(done);
    });

    it('should match previous input box with button disabled screenshot', (done) => {
      validateButtonDisabled(done);
    });

  });

});
