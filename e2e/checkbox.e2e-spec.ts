import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

describe('Checkbox', () => {
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
    it('should match previous checkbox screenshot', async (done) => {
      await SkyHostBrowser.setWindowBreakpoint('lg');

      expect('#screenshot-checkbox').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('checkbox')
      });
    });

    it('should match previous checkbox screenshot (screen: xs)', async (done) => {
      await SkyHostBrowser.setWindowBreakpoint('xs');

      expect('#screenshot-checkbox').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('checkbox-xs')
      });
    });

    it('should match previous icon checkbox screenshot', async (done) => {
      await SkyHostBrowser.setWindowBreakpoint('lg');

      expect('#screenshot-icon-checkbox').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('checkbox-icon')
      });
    });

    it('should match previous icon checkbox screenshot (screen: xs)', async (done) => {
      await SkyHostBrowser.setWindowBreakpoint('xs');

      expect('#screenshot-icon-checkbox').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('checkbox-icon-xs')
      });
    });
  }

  beforeEach(async () => {
    await SkyHostBrowser.get('visual/checkbox');
  });

  validateAll();

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
