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

describe('Character count', () => {
  let currentTheme: string;
  let currentThemeMode: string;

  async function selectTheme(theme: string, mode: string): Promise<void> {
    currentTheme = theme;
    currentThemeMode = mode;

    return SkyVisualThemeSelector.selectTheme(theme, mode);
  }

  function runTests(breakpoint: SkyHostBrowserBreakpoint): void {
    function getScreenshotName(name: string): string {
      if (currentTheme) {
        name += '-' + currentTheme;
      }

      if (currentThemeMode) {
        name += '-' + currentThemeMode;
      }

      if (breakpoint !== 'lg') {
        name += '-' + breakpoint;
      }

      return name;
    }

    it('should match previous character-count screenshot', async (done) => {
      await SkyHostBrowser.setWindowBreakpoint(breakpoint);
      await SkyHostBrowser.scrollTo('#screenshot-character-count');

      expect('#screenshot-character-count').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('character-count')
      });
    });

    it('should match previous character-count screenshot when invalid', async (done) => {
      await SkyHostBrowser.setWindowBreakpoint(breakpoint);
      await SkyHostBrowser.scrollTo('#screenshot-character-count');

      element(by.css("input[formControlName='firstName']"))
        .sendKeys('A message that exceeds the limit \n');

      expect('#screenshot-character-count').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('character-count-invalid')
      });
    });

    it('should match previous character-count in input box screenshot', async (done) => {
      await SkyHostBrowser.setWindowBreakpoint(breakpoint);
      await SkyHostBrowser.scrollTo('#screenshot-character-count-input-box');
      await SkyHostBrowser.moveCursorOffScreen();

      expect('#screenshot-character-count-input-box').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('character-count-input-box')
      });
    });

    it(
      'should match previous character-count in input box with no label screenshot',
      async (done) => {
        await SkyHostBrowser.setWindowBreakpoint(breakpoint);
        await SkyHostBrowser.scrollTo('#screenshot-character-count-input-box-no-label');
        await SkyHostBrowser.moveCursorOffScreen();

        expect('#screenshot-character-count-input-box-no-label').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('character-count-input-box-no-label')
        });
      }
    );
  }

  beforeEach(async () => {
    currentTheme = undefined;
    currentThemeMode = undefined;

    await SkyHostBrowser.get('visual/character-count');
  });

  runTests('lg');

  describe('at xs screen', () => {
    runTests('xs');
  });

  describe('when modern theme', () => {
    beforeEach(async () => {
      await selectTheme('modern', 'light');
    });

    runTests('lg');

    describe('at xs screen', () => {
      runTests('xs');
    });
  });

  describe('when modern theme in dark mode', () => {
    beforeEach(async () => {
      await selectTheme('modern', 'dark');
    });

    runTests('lg');

    describe('at xs screen', () => {
      runTests('xs');
    });
  });

});
