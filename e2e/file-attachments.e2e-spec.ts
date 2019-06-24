import {
  element,
  by
} from 'protractor';

import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('File attachments', () => {
  it('should match previous file attachments screenshot', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-drop-lg'
    });
  });

  it('should match previous file attachments screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-drop-xs'
    });
  });

  it('should match previous file attachments screenshot when no links allowed', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('.sky-test-allow-links')).click();
    expect('#screenshot-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-drop-no-links-lg'
    });
  });

  it('should match previous file attachments screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.sky-test-allow-links')).click();
    expect('#screenshot-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-drop-no-links-xs'
    });
  });

  it('should match previous file attachments screenshot when required', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('.sky-test-required')).click();
    expect('#screenshot-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-drop-required-lg'
    });
  });

  it('should match previous file attachments screenshot when required (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.sky-test-required')).click();
    expect('#screenshot-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-drop-required-xs'
    });
  });

  it('should match previous file attachments screenshot when required with label', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('.sky-test-required')).click();
    element(by.css('.sky-test-label')).click();
    expect('#screenshot-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-drop-required-label-xs'
    });
  });

  it('should match previous file attachments screenshot when required with label (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.sky-test-required')).click();
    element(by.css('.sky-test-label')).click();
    expect('#screenshot-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-drop-required-label-xs'
    });
  });

  it('should match previous single file attachments screenshot', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-single-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'single-file-drop-lg'
    });
  });

  it('should match previous single file attachments screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-single-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'single-file-drop-xs'
    });
  });

  it('should match previous file attachments screenshot when required', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('.sky-test-required')).click();
    expect('#screenshot-single-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'single-file-drop-required-lg'
    });
  });

  it('should match previous file attachments screenshot when required (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.sky-test-required')).click();
    expect('#screenshot-single-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'single-file-drop-required-xs'
    });
  });

  it('should match previous file attachments screenshot when required with label', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('.sky-test-required')).click();
    element(by.css('.sky-test-label')).click();
    expect('#screenshot-single-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'single-file-drop-required-label-lg'
    });
  });

  it('should match previous file attachments screenshot when required with label (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.sky-test-required')).click();
    element(by.css('.sky-test-label')).click();
    expect('#screenshot-single-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'single-file-drop-required-label-xs'
    });
  });
});
