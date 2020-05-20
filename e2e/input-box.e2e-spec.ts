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

  function validateBasic(done: DoneFn): void {
    expect('#screenshot-input-box').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('input-boxes')
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

  describe('when modern theme', () => {

    beforeEach(async () => {
      await selectTheme('modern', 'light');
    });

    it('should match previous input box screenshot', (done) => {
      validateBasic(done);
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

  });

  describe('when modern theme in dark mode', () => {

    beforeEach(async () => {
      await selectTheme('modern', 'dark');
    });

    it('should match previous input box screenshot', (done) => {
      validateBasic(done);
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

  });

});
