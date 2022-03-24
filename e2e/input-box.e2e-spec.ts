import {
  browser,
  by,
  element,
  ExpectedConditions,
  Key
} from 'protractor';

import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

class ThemePlatformHelper {
  public static shouldSkipVisualTests() {
    const idxPlatformKey = process.argv.indexOf('--platform');
    const idxPlatformVSTS = process.argv.indexOf('vsts');

    // Minimist sure is nice
    if (idxPlatformKey > -1 && idxPlatformVSTS > -1 && idxPlatformVSTS === (idxPlatformKey + 1)) {
      console.warn('Platform is VSTS - skipping visual test.');
      return true;
    }
  }
}

// tslint:disable-next-line: max-line-length
const LONG_STRING = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis massa id justo sagittis auctor quis ac orci. Donec scelerisque varius mi, non dignissim est rhoncus eget. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam at quam erat. Integer at dignissim massa. Pellentesque dictum lacinia malesuada. Quisque quis aliquet enim. Duis suscipit velit interdum libero venenatis, eget fringilla erat faucibus. Duis tincidunt ipsum arcu, ac egestas erat pharetra volutpat. Sed quam tortor, ultrices ac rhoncus non, tincidunt at mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis massa id justo sagittis auctor quis ac orci. Donec scelerisque varius mi, non dignissim est rhoncus eget. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam at quam erat. Integer at dignissim massa. Pellentesque dictum lacinia malesuada. Quisque quis aliquet enim. Duis suscipit velit interdum libero venenatis, eget fringilla erat faucibus. Duis tincidunt ipsum arcu, ac egestas erat pharetra volutpat. Sed quam tortor, ultrices ac rhoncus non, tincidunt at mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.`;

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
    const inputId = await element(
      by.css(`#${wrapperId} input, #${wrapperId} textarea`)
    ).getAttribute('id');

    const label = element(by.css(`label[for="${inputId}"]`));
    browser.wait(ExpectedConditions.elementToBeClickable(label), 5000);
    await SkyHostBrowser.scrollTo(`label[for="${inputId}"]`);
    await label.click();

    // Move the cursor so the hover state isn't activated.
    await SkyHostBrowser.moveCursorOffScreen();
  }

  async function sendKeysToInput(wrapperId: string, value: string): Promise<void> {
    const input = await element(
      by.css(`#${wrapperId} input, #${wrapperId} textarea`)
    );

    await input.clear();
    await input.sendKeys(value);
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

  async function tabToPreviousElement(): Promise<void> {
    const el = await browser.driver.switchTo().activeElement();
    await el.sendKeys(Key.chord(Key.SHIFT, Key.TAB));
  }

  function checkSkipTests(done: DoneFn) {
    if (ThemePlatformHelper.shouldSkipVisualTests()) {
      return done();
    }
  }

  function runTests(): void {
    it('should match previous input box screenshot', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-basic');

      expect('#input-box-basic').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-basic')
      });
    });

    it('should match previous input box side-by-side screenshot', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-side-by-side');

      expect('#input-box-side-by-side').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-side-by-side')
      });
    });

    it('should match previous basic input box screenshot when focused', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-basic');

      await clickLabel('input-box-basic');

      expect('#input-box-basic').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-basic-focused')
      });
    });

    it('should match previous basic input box screenshot when hovered', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-basic');

      await hoverElement('#input-box-basic input');

      expect('#input-box-basic').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-basic-hover')
      });
    });

    it('should match previous basic input box screenshot when active', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-basic');

      await mouseDownElement('#input-box-basic input');

      expect('#input-box-basic').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-basic-active')
      });
    });

    it('should match previous input box screenshot with an inline help component', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-help-inline');

      expect('#input-box-help-inline').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-help-inline')
      });
    });

    it(`should match previous input box screenshot with an inline help component
        along side a character counter and required indicator`, async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-help-inline-required-with-character-counter');

      expect('#input-box-help-inline-required-with-character-counter').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-help-inline-required-with-character-counter')
      });
    });

    it('should match previous textarea input box screenshot when focused', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-textarea');

      await clickLabel('input-box-textarea');

      expect('#input-box-textarea').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-textarea-focused')
      });

    });

    it('should match previous textarea input box screenshot when text overflows into label', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-textarea');

      await clickLabel('input-box-textarea');
      await sendKeysToInput('input-box-textarea', LONG_STRING);

      expect('#input-box-textarea').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-textarea-overflow')
      });

    });

    it(
      'should match previous input box with a button screenshot when input is focused',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-button-single');

        await clickLabel('input-box-button-single');

        expect('#input-box-button-single').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-button-focused-single-input')
        });
      }
    );

    it(
      'should match previous input box with a button screenshot when button is focused',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-button-single');

        await clickLabel('input-box-button-single');
        await tabToNextElement();

        expect('#input-box-button-single').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-button-focused-single-button')
        });
      }
    );

    it(
      'should match previous input box with multiple buttons screenshot when button 1 is focused',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-button-multiple');

        await clickLabel('input-box-button-multiple');
        await tabToNextElement();

        expect('#input-box-button-multiple').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-button-focused-multiple-button-1')
        });
      }
    );

    it(
      'should match previous input box with multiple buttons screenshot when button 2 is focused',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-button-multiple');

        await clickLabel('input-box-button-multiple');
        await tabToNextElement();
        await tabToNextElement();

        expect('#input-box-button-multiple').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-button-focused-multiple-button-2')
        });
      }
    );

    it(
      'should match previous input box with single button screenshot when input is hovered',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-button-single');

        await hoverElement('#input-box-button-single input');

        expect('#input-box-button-single').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-button-hover-single-input')
        });
      }
    );

    it(
      'should match previous input box with single button screenshot when button is hovered',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-button-single');

        await hoverElement('#input-box-button-single button');

        expect('#input-box-button-single').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-button-hover-single-button')
        });
      }
    );

    it(
      'should match previous input box with error when bound to form control',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-form-control-error');

        expect('#input-box-form-control-error').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-form-control-error')
        });
      }
    );

    it(
      'should match previous input box with error when bound to form control name',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-form-control-name-error');

        expect('#input-box-form-control-name-error').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-form-control-name-error')
        });
      }
    );

    it(
      'should match previous input box with error when bound to ngModel',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-ngmodel-error');

        expect('#input-box-ngmodel-error').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-ngmodel-error')
        });
      }
    );

    it(
      'should match previous input box with error when focused',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-ngmodel-error');

        await clickLabel('input-box-ngmodel-error');

        expect('#input-box-ngmodel-error').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-error-focused')
        });
      }
    );

    it(
      'should match previous input box with button and error when input is focused',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-form-control-error-button-single');

        await clickLabel('input-box-form-control-error-button-single');

        expect('#input-box-form-control-error-button-single').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-error-focused-input')
        });
      }
    );

    it(
      'should match previous input box with button and error when button is focused',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-form-control-error-button-single');

        await clickLabel('input-box-form-control-error-button-single');
        await tabToNextElement();

        expect('#input-box-form-control-error-button-single').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-error-focused-button')
        });
      }
    );

    it(
      'should match previous input box with error when hovered',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-ngmodel-error');

        await hoverElement('#input-box-ngmodel-error');

        expect('#input-box-ngmodel-error').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-error-hover')
        });
      }
    );

    it('should match previous input box when disabled', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-disabled');

      expect('#input-box-disabled').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-disabled')
      });
    });

    it('should match previous input box when disabled and hovered', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-disabled');

      await hoverElement('#input-box-disabled');

      expect('#input-box-disabled').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-disabled-hover')
      });
    });

    it('should match previous input box with button when disabled', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-button-disabled');

      expect('#input-box-button-disabled').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-button-disabled')
      });
    });

    it('should match previous input box with select', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-select');

      expect('#input-box-select').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-select')
      });
    });

    it('should match previous input box with select when disabled', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-select-disabled');

      expect('#input-box-select-disabled').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-select-disabled')
      });
    });

    // Basic no label
    it('should match previous input box no label screenshot', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-basic-no-label');

      expect('#input-box-basic-no-label').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-basic-no-label')
      });
    });

    it('should match previous basic input box no label screenshot when focused', async (done) => {
      checkSkipTests(done);

      await SkyHostBrowser.scrollTo('#input-box-basic-no-label');

      await clickLabel('input-box-basic-no-label');

      expect('#input-box-basic-no-label').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-basic-no-label-focused')
      });
    });

    it('should match previous basic input box no label screenshot when hovered', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-basic-no-label');

      await hoverElement('#input-box-basic-no-label input');

      expect('#input-box-basic-no-label').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-basic-no-label-hover')
      });
    });

    it('should match previous basic input box no label screenshot when active', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-basic-no-label');

      await mouseDownElement('#input-box-basic-no-label input');

      expect('#input-box-basic-no-label').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-basic-no-label-active')
      });
    });

    // Single button no label
    it(
      'should match previous input box with a button no label screenshot when input is focused',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-button-single-no-label');

        await clickLabel('input-box-button-single-no-label');

        expect('#input-box-button-single-no-label').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-button-no-label-focused-single-input')
        });
      }
    );

    it(
      'should match previous input box with a button no label screenshot when button is focused',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-button-single-no-label');

        await clickLabel('input-box-button-single-no-label');
        await tabToNextElement();

        expect('#input-box-button-single-no-label').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-button-no-label-focused-single-button')
        });
      }
    );

    it(
      'should match previous input box with single button no label screenshot when input is hovered',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-button-single-no-label');

        await hoverElement('#input-box-button-single-no-label input');

        expect('#input-box-button-single-no-label').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-button-no-label-hover-single-input')
        });
      }
    );

    it(
      'should match previous input box with single button no label screenshot when button is hovered',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-button-single-no-label');

        await hoverElement('#input-box-button-single-no-label button');

        expect('#input-box-button-single-no-label').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-button-no-label-hover-single-button')
        });
      }
    );

    // Select no label
    it('should match previous input box with select no label', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-select-no-label');

      expect('#input-box-select-no-label').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-select-no-label')
      });
    });

    // Basic with wrapper
    it('should match previous input box with wrapper element screenshot', async (done) => {
      await SkyHostBrowser.scrollTo('#input-box-basic-wrapper');

      expect('#input-box-basic-wrapper').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('input-box-basic-wrapper')
      });
    });

    // Single button on left
    it(
      'should match previous input box with a button on left',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-button-single-left');

        expect('#input-box-button-single-left').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-button-single-left')
        });
      }
    );

    it(
      'should match previous input box with a button on left screenshot when input is focused',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-button-single-left');

        await clickLabel('input-box-button-single-left');

        expect('#input-box-button-single-left').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-button-focused-single-left-input')
        });
      }
    );

    it(
      'should match previous input box with a button on left screenshot when button is focused',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-button-single-left');

        await clickLabel('input-box-button-single-left');
        await tabToPreviousElement();

        expect('#input-box-button-single-left').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-button-focused-single-left-button')
        });
      }
    );

    // Inset button
    it(
      'should match previous input box with an inset button',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-button-inset');

        expect('#input-box-button-inset').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-button-inset')
        });
      }
    );

    it(
      'should match previous input box with an inset button screenshot when input is focused',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-button-inset');

        await clickLabel('input-box-button-inset');

        expect('#input-box-button-inset').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-button-inset-input')
        });
      }
    );

    it(
      'should match previous input box with an inset button screenshot when button is focused',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-button-inset');

        await clickLabel('input-box-button-inset');
        await tabToNextElement();

        expect('#input-box-button-inset').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-button-inset-button')
        });
      }
    );

    it(
      'should match previous narrow input box with an inset button',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-button-inset-narrow');

        expect('#input-box-button-inset-narrow').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-button-inset-narrow')
        });
      }
    );

    // Inset icon
    it(
      'should match previous input box with an inset icon',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-icon-inset');

        expect('#input-box-icon-inset').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-icon-inset')
        });
      }
    );

    it(
      'should match previous input box with an inset button screenshot when input is focused',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-icon-inset');

        await clickLabel('input-box-button-inset');

        expect('#input-box-icon-inset').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-icon-inset-focused')
        });
      }
    );

    // Disabled inset icon
    it(
      'should match previous input box with a disabled inset icon',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-icon-inset-disabled');

        expect('#input-box-icon-inset-disabled').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-icon-inset-disabled')
        });
      }
    );

    // Left inset icon
    it(
      'should match previous input box with a left inset icon',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-icon-inset-left');

        expect('#input-box-icon-inset-left').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-icon-inset-left')
        });
      }
    );

    it(
      'should match previous input box with a left inset icon screenshot when input is focused',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-icon-inset-left');

        await clickLabel('input-box-icon-inset-left');

        expect('#input-box-icon-inset-left').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-icon-inset-left-focused')
        });
      }
    );

    // Placeholder text
    it(
      'should match previous input box with placeholder text',
      async (done) => {
        await SkyHostBrowser.scrollTo('#input-box-placeholder');

        expect('#input-box-placeholder').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('input-box-placeholder')
        });
      }
    );
  }

  beforeEach(async () => {
    currentTheme = undefined;
    currentThemeMode = undefined;

    await SkyHostBrowser.get('visual/input-box');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-input-box');
    await SkyHostBrowser.moveCursorOffScreen();
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
