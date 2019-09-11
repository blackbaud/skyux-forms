import {
  element,
  by
} from 'protractor';

import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  SkyHostBrowserBreakpoint
} from '@skyux-sdk/e2e/host-browser/host-browser-breakpoint';

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

  it('should match previous file drop screenshot when no links allowed (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/file-attachment');
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.sky-test-allow-links')).click();
    expect('#screenshot-file-drop').toMatchBaselineScreenshot(done, {
      screenshotName: 'file-drop-no-links-xs'
    });
  });

  describe('with label set', () => {
    function matchesPreviousAttachmentAndLabel(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): void {
      SkyHostBrowser.get('visual/file-attachment');
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      expect('#screenshot-file-attachment').toMatchBaselineScreenshot(done, {
        screenshotName: `file-attachment-label-${screenSize}`
      });
    }

    it('should match previous screenshot on large screens', (done) => {
      matchesPreviousAttachmentAndLabel('lg', done);
    });

    it('should match previous screenshot on small screens', (done) => {
      matchesPreviousAttachmentAndLabel('xs', done);
    });
  });

  describe('without label set', () => {
    function matchesPreviousAttachmentAndLabel(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): void {
      SkyHostBrowser.get('visual/file-attachment');
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      element(by.css('.sky-test-label')).click();

      expect('#screenshot-file-attachment').toMatchBaselineScreenshot(done, {
        screenshotName: `file-attachment-no-label-${screenSize}`
      });
    }

    it('should match previous screenshot on large screens', (done) => {
      matchesPreviousAttachmentAndLabel('lg', done);
    });

    it('should match previous screenshot on small screens', (done) => {
      matchesPreviousAttachmentAndLabel('xs', done);
    });
  });
});
