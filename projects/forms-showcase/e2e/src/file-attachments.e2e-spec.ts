import {
  element,
  by
} from 'protractor';

import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('File attachments', () => {
  it('should match previous file drop screenshot', async (done) => {
    await SkyHostBrowser.get('visual/file-attachment');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-drop'
    });
  });

  it('should match previous file drop screenshot (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/file-attachment');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-drop-xs'
    });
  });

  it('should match previous file drop screenshot when no links allowed', async (done) => {
    await SkyHostBrowser.get('visual/file-attachment');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await element(by.css('.sky-test-allow-links')).click();
    expect('#screenshot-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-drop-no-links'
    });
  });

  it('should match previous file drop screenshot (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/file-attachment');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await element(by.css('.sky-test-allow-links')).click();
    expect('#screenshot-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-drop-no-links-xs'
    });
  });
});
