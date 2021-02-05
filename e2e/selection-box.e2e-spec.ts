import {
  by,
  element
} from 'protractor';

import {
  SkyHostBrowserBreakpoint
} from '@skyux-sdk/e2e/host-browser/host-browser-breakpoint';

import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

describe('Selection box', () => {

  //#region helpers
  let browserSize: SkyHostBrowserBreakpoint;
  let currentTheme: string;
  let currentThemeMode: string;

  async function selectTheme(theme: string, mode: string): Promise<void> {
    currentTheme = theme;
    currentThemeMode = mode;

    return SkyVisualThemeSelector.selectTheme(theme, mode);
  }

  async function setBrowserSize(size: SkyHostBrowserBreakpoint): Promise<void> {
    browserSize = size;

    return SkyHostBrowser.setWindowBreakpoint(size);
  }

  function getScreenshotName(name: string): string {
    if (browserSize) {
      name += '-' + browserSize;
    }

    if (currentTheme) {
      name += '-' + currentTheme;
    }

    if (currentThemeMode) {
      name += '-' + currentThemeMode;
    }

    return name;
  }

  async function clickRadio(): Promise<void> {
    await element(by.css('#screenshot-selection-box-radio .sky-selection-box')).click();

    // Move the cursor so the hover state isn't activated.
    await SkyHostBrowser.moveCursorOffScreen();
  }

  async function clickCheckbox(): Promise<void> {
    await element(by.css('#screenshot-selection-box-checkbox .sky-selection-box')).click();

    // Move the cursor so the hover state isn't activated.
    await SkyHostBrowser.moveCursorOffScreen();
  }

  function runTests(): void {
    it('should match previous screenshot with a radio button', async (done) => {
      await SkyHostBrowser.scrollTo('#screenshot-selection-box-radio');
      expect('#screenshot-selection-box-radio')
        .toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('selection-box-radio')
        });
    });
    it('should match previous screenshot with a radio button when checked', async (done) => {
      await SkyHostBrowser.scrollTo('#screenshot-selection-box-radio');
      await clickRadio();
      expect('#screenshot-selection-box-radio')
        .toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('selection-box-radio-checked')
        });
    });
    it('should match previous screenshot with a checkbox', async (done) => {
      await SkyHostBrowser.scrollTo('#screenshot-selection-box-checkbox');
      expect('#screenshot-selection-box-checkbox')
        .toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('selection-box-checkbox')
        });
    });
    it('should match previous screenshot with a checkbox when checked', async (done) => {
      await SkyHostBrowser.scrollTo('#screenshot-selection-box-checkbox');
      await clickCheckbox();
      expect('#screenshot-selection-box-checkbox')
        .toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('selection-box-checkbox-checked')
        });
    });
    it('should match previous screenshot with no icon', async (done) => {
      await SkyHostBrowser.scrollTo('#screenshot-selection-box-no-icon');
      expect('#screenshot-selection-box-no-icon')
        .toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('selection-box-no-icon')
        });
    });
  }
  //#endregion

  describe('(size: lg)', () => {
    beforeEach( async() => {
      currentTheme = undefined;
      currentThemeMode = undefined;
      await SkyHostBrowser.get('visual/selection-box');
      await setBrowserSize('lg');
    });

    runTests();

    describe('when modern theme', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'light');
      });

      runTests();
    });

    describe('when modern theme in dark mode', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'dark');
      });

      runTests();
    });
  });

  describe('(size: xs)', () => {
    beforeEach( async() => {
      currentTheme = undefined;
      currentThemeMode = undefined;
      await SkyHostBrowser.get('visual/selection-box');
      await setBrowserSize('xs');
    });

    runTests();

    describe('when modern theme', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'light');
      });

      runTests();
    });

    describe('when modern theme in dark mode', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'dark');
      });

      runTests();
    });
  });
});
