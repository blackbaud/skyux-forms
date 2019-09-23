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

describe('single file attachment', () => {
  describe('with label set', () => {
    function matchesPreviousAttachmentAndLabel(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): void {
      SkyHostBrowser.get('visual/single-file-attachment');
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
      SkyHostBrowser.get('visual/single-file-attachment');
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
