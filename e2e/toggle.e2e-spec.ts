import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Toggle', () => {

  it('should match previous toggle screenshot', (done) => {
    SkyHostBrowser.get('visual/toggle');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-toggle').toMatchBaselineScreenshot(done, {
      screenshotName: 'toggle'
    });
  });

  it('should match previous toggle screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/toggle');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-toggle').toMatchBaselineScreenshot(done, {
      screenshotName: 'toggle-xs'
    });
  });

  it('should match previous toggle screenshot', (done) => {
    SkyHostBrowser.get('visual/toggle');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-disabled-toggle').toMatchBaselineScreenshot(done, {
      screenshotName: 'disabled-toggle'
    });
  });

  it('should match previous toggle screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/toggle');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-disabled-toggle').toMatchBaselineScreenshot(done, {
      screenshotName: 'disabled-toggle-xs'
    });
  });
});
