import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Checkbox', () => {

  it('should match previous checkbox screenshot', (done) => {
    SkyHostBrowser.get('visual/checkbox');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-checkbox').toMatchBaselineScreenshot(done);
  });

  it('should match previous checkbox screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/checkbox');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-checkbox').toMatchBaselineScreenshot(done);
  });

  it('should match previous checkbox screenshot', (done) => {
    SkyHostBrowser.get('visual/checkbox');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-icon-checkbox').toMatchBaselineScreenshot(done);
  });

  it('should match previous checkbox screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/checkbox');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-icon-checkbox').toMatchBaselineScreenshot(done);
  });
});
