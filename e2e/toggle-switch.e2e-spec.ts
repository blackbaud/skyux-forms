import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

describe('Toggle switch', () => {
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

  function runTests(): void {
    it('should match previous toggle switch screenshot', async (done) => {
      await SkyHostBrowser.setWindowBreakpoint('lg');

      expect('#screenshot-toggle-switch').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('toggle-switch')
      });
    });

    it('should match previous toggle switch screenshot (screen: xs)', async (done) => {
      await SkyHostBrowser.setWindowBreakpoint('xs');

      expect('#screenshot-toggle-switch').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('toggle-switch-xs')
      });
    });
  }

  beforeEach(async () => {
    currentTheme = undefined;
    currentThemeMode = undefined;

    await SkyHostBrowser.get('visual/toggle-switch');
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
