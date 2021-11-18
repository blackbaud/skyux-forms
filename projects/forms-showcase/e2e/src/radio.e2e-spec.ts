import { expect, SkyHostBrowser, SkyVisualThemeSelector } from '@skyux-sdk/e2e';

describe('Radio', () => {
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

  function validateAll() {
    it('should match previous radio screenshot', async (done) => {
      await SkyHostBrowser.setWindowBreakpoint('lg');
      await SkyHostBrowser.scrollTo('#screenshot-radio');

      expect('#screenshot-radio').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('radio'),
      });
    });

    it('should match previous radio screenshot (screen: xs)', async (done) => {
      await SkyHostBrowser.setWindowBreakpoint('xs');
      await SkyHostBrowser.scrollTo('#screenshot-radio');

      expect('#screenshot-radio').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('radio-xs'),
      });
    });

    it('should match previous icon radio screenshot', async (done) => {
      await SkyHostBrowser.setWindowBreakpoint('lg');
      await SkyHostBrowser.scrollTo('#screenshot-icon-radio');

      expect('#screenshot-icon-radio').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('icon-radio'),
      });
    });

    it('should match previous icon radio screenshot (screen: xs)', async (done) => {
      await SkyHostBrowser.setWindowBreakpoint('xs');
      await SkyHostBrowser.scrollTo('#screenshot-icon-radio');

      expect('#screenshot-icon-radio').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('icon-radio-xs'),
      });
    });
  }

  beforeEach(async () => {
    await SkyHostBrowser.get('visual/radio');
  });

  validateAll();

  describe('when modern theme', () => {
    beforeEach(async () => {
      await selectTheme('modern', 'light');
    });

    validateAll();
  });

  describe('when modern theme in dark mode', () => {
    beforeEach(async () => {
      await selectTheme('modern', 'dark');
    });

    validateAll();
  });
});
