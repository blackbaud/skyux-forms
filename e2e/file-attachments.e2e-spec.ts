import {
  element,
  by
} from 'protractor';

import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('File attachments', () => {
  it('should match previous file drop screenshot', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-drop'
    });
  });

  it('should match previous file drop screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-drop-xs'
    });
  });

  it('should match previous file drop screenshot when no links allowed', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('.sky-test-allow-links')).click();
    expect('#screenshot-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-drop-no-links'
    });
  });

  it('should match previous file drop screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.sky-test-allow-links')).click();
    expect('#screenshot-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-drop-no-links-xs'
    });
  });

  it('should match previous file attachment screenshot', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-file-attachment').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-attachment'
    });
  });

  it('should match previous file attachment screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-file-attachment').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-attachment-xs'
    });
  });

  it('should match previous file attachment screenshot when required', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('.sky-test-required')).click();
    expect('#screenshot-file-attachment').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-attachment-required'
    });
  });

  it('should match previous file attachment screenshot when required (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.sky-test-required')).click();
    expect('#screenshot-file-attachment').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-attachment-required-xs'
    });
  });

  it('should match previous file attachment screenshot when label set', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('.sky-test-label')).click();
    expect('#screenshot-file-attachment').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-attachment-label'
    });
  });

  it('should match previous file attachment screenshot when label set (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.sky-test-label')).click();
    expect('#screenshot-file-attachment').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-attachment-label-xs'
    });
  });

  it('should match previous file attachment screenshot when required and label set', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('.sky-test-required')).click();
    element(by.css('.sky-test-label')).click();
    expect('#screenshot-file-attachment').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-attachment-required-label'
    });
  });

  it('should match previous file attachment screenshot when required and label set (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.sky-test-required')).click();
    element(by.css('.sky-test-label')).click();
    expect('#screenshot-file-attachment').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-attachment-required-label-xs'
    });
  });
});
