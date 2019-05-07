import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Radio', () => {

  it('should match previous radio screenshot', (done) => {
    SkyHostBrowser.get('visual/radio');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('#screenshot-radio');
    expect('#screenshot-radio').toMatchBaselineScreenshot(done, {
      screenshotName: 'radio'
    });
  });

  it('should match previous radio screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/radio');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-radio');
    expect('#screenshot-radio').toMatchBaselineScreenshot(done, {
      screenshotName: 'radio-xs'
    });
  });

  it('should match previous icon radio screenshot', (done) => {
    SkyHostBrowser.get('visual/radio');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('#screenshot-icon-radio');
    expect('#screenshot-icon-radio').toMatchBaselineScreenshot(done, {
      screenshotName: 'icon-radio'
    });
  });

  it('should match previous icon radio screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/radio');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-icon-radio');
    expect('#screenshot-icon-radio').toMatchBaselineScreenshot(done, {
      screenshotName: 'icon-radio-xs'
    });
  });
});
