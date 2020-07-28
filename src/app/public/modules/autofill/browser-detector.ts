/**
 * Inspired by Angular 4's `BrowserDetection` utility:
 * https://github.com/angular/angular/blob/4.4.x/packages/platform-browser/testing/src/browser_util.ts
 * @internal
 */
export class SkyBrowserDetector {

  private static get skyNavigator(): any {
    return navigator;
  }

  public static isChromeDesktop = (
    SkyBrowserDetector.skyNavigator.userAgent.indexOf('Chrome') > -1 &&
      SkyBrowserDetector.skyNavigator.userAgent.indexOf('Mobile Safari') === -1 &&
      SkyBrowserDetector.skyNavigator.userAgent.indexOf('Edge') === -1
  );

}
