import {
  by,
  element
} from 'protractor';

import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

import {
  SkyHostBrowserBreakpoint
} from '@skyux-sdk/e2e/host-browser/host-browser-breakpoint';

describe('Single file attachment', () => {

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

  function runTests(): void {
    it('should match previous screenshot', (done) => {
      expect('#screenshot-single-file-attachment').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('single-file-attachment')
      });
    });

    it('should match previous screenshot with no label', async (done) => {
      await element(by.css('#toggleLabel')).click();
      expect('#screenshot-single-file-attachment').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('single-file-attachment-no-label')
      });
    });

    it('should match previous screenshot when image is uploaded', async(done) => {
      await SkyHostBrowser.scrollTo('#screenshot-single-file-attachment-image');
      expect('#screenshot-single-file-attachment-image').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('single-file-attachment-with-image')
      });
    });

    it('should match previous screenshot when file is uploaded', async(done) => {
      await SkyHostBrowser.scrollTo('#screenshot-single-file-attachment-file');
      expect('#screenshot-single-file-attachment-file').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('single-file-attachment-with-file')
      });
    });
  }
  //#endregion

  describe('(size: lg)', () => {
    beforeEach( async() => {
      currentTheme = undefined;
      currentThemeMode = undefined;
      await SkyHostBrowser.get('visual/single-file-attachment');
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
      await SkyHostBrowser.get('visual/single-file-attachment');
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
