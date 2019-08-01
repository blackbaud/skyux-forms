import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Checkbox', () => {

  it('should match previous checkbox screenshot', (done) => {
    SkyHostBrowser.get('visual/checkbox');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-checkbox').toMatchBaselineScreenshot(done, {
      screenshotName: 'checkbox'
    });
  });

  it('should match previous checkbox screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/checkbox');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-checkbox').toMatchBaselineScreenshot(done, {
      screenshotName: 'checkbox-xs'
    });
  });

  it('should match previous icon checkbox screenshot', (done) => {
    SkyHostBrowser.get('visual/checkbox');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-icon-checkbox').toMatchBaselineScreenshot(done, {
      screenshotName: 'checkbox-icon'
    });
  });

  it('should match previous icon checkbox screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/checkbox');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-icon-checkbox').toMatchBaselineScreenshot(done, {
      screenshotName: 'checkbox-icon-xs'
    });
  });
});
