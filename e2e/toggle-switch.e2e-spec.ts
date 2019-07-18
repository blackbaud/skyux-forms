import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Toggle switch', () => {

  beforeEach(() => {
    SkyHostBrowser.get('visual/toggle-switch');
  });

  it('should match previous toggle switch screenshot', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-toggle-switch').toMatchBaselineScreenshot(done, {
      screenshotName: 'toggle-switch'
    });
  });

  it('should match previous toggle switch screenshot (screen: xs)', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-toggle-switch').toMatchBaselineScreenshot(done, {
      screenshotName: 'toggle-switch-xs'
    });
  });
});
