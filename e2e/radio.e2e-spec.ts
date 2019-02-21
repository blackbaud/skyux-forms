import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Radio', () => {

  it('should match previous radio screenshot', (done) => {
    SkyHostBrowser.get('visual/radio');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-radio').toMatchBaselineScreenshot(done);
  });

  it('should match previous radio screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/radio');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-radio').toMatchBaselineScreenshot(done);
  });

  it('should match previous icon radio screenshot', (done) => {
    SkyHostBrowser.get('visual/radio');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-icon-radio').toMatchBaselineScreenshot(done);
  });

  it('should match previous icon radio screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/radio');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-icon-radio').toMatchBaselineScreenshot(done);
  });

  it('should match previous radio with a wrapping label screenshot', (done) => {
    SkyHostBrowser.get('visual/radio');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-radio-wrapping-label').toMatchBaselineScreenshot(done);
  });

  it('should match previous radio screenshot with a wrapping label (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/radio');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-radio-wrapping-label').toMatchBaselineScreenshot(done);
  });
});
