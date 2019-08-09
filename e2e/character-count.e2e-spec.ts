import {
  by,
  element
} from 'protractor';

import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Character count', () => {

  it('should match previous character-count screenshot', (done) => {
    SkyHostBrowser.get('visual/character-count');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('#screenshot-character-count');
    expect('#screenshot-character-count').toMatchBaselineScreenshot(done, {
      screenshotName: 'character-count'
    });
  });

  it('should match previous character-count screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/character-count');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-character-count');
    expect('#screenshot-character-count').toMatchBaselineScreenshot(done, {
      screenshotName: 'character-count-xs'
    });
  });

  it('should match previous character-count screenshot when invalid', (done) => {
    SkyHostBrowser.get('visual/character-count');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('#screenshot-character-count');
    element(by.css("input[formControlName='firstName']"))
      .sendKeys('A message that exceeds the limit \n');
    expect('#screenshot-character-count').toMatchBaselineScreenshot(done, {
      screenshotName: 'character-count-invalid'
    });
  });

  it('should match previous character-count screenshot when invalid (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/character-count');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-character-count');
    element(by.css("input[formControlName='firstName']"))
      .sendKeys('A message that exceeds the limit \n');
    expect('#screenshot-character-count').toMatchBaselineScreenshot(done, {
      screenshotName: 'character-count-invalid-xs'
    });
  });

});
