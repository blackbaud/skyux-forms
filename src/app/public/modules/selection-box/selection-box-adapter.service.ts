import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2
} from '@angular/core';

import {
  SkyCoreAdapterService,
  SkyMediaBreakpoints
} from '@skyux/core';

const SM_BREAKPOINT_MAX_PIXELS = 991;

/**
 * @internal
 */
@Injectable()
export class SkySelectionBoxAdapterService {

  private renderer: Renderer2;

  constructor(
    private coreAdapterService: SkyCoreAdapterService,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(undefined, undefined);
  }

  /**
   * Sets focus on the specified element.
   */
  public focus(el: ElementRef): void {
    el.nativeElement.focus();
  }

  /**
   * Returns a child element with the `.sky-switch` class.
   * Useful for getting SKYUX-themed radio buttons or checkboxes.
   */
  public getControl(el: ElementRef): HTMLElement {
    return el.nativeElement.querySelector('.sky-switch');
  }

  /**
   * Returns a breakpoint based on the width.
   * @param width Width of element in pixels.
   */
  public getBreakpointForWidth(width: number): SkyMediaBreakpoints {
    let breakpoint: SkyMediaBreakpoints;

    if (width <= SM_BREAKPOINT_MAX_PIXELS) {
      breakpoint = SkyMediaBreakpoints.sm;
    } else {
      breakpoint = SkyMediaBreakpoints.md;
    }

    return breakpoint;
  }

  /**
   * Returns `true` if the `childEl` is a descendant of the `parentEl`.
   */
  public isDescendant(parentEl: ElementRef, childEl: ElementRef): boolean {
    return parentEl.nativeElement.contains(childEl);
  }

  /**
   * Sets the `tabIndex` of all focusable children of the `element` to the provided `tabIndex`.
   */
  public setChildrenTabIndex(element: ElementRef, tabIndex: number): void {
    const el = element.nativeElement;
    const focusableElems = this.coreAdapterService.getFocusableChildren(el, {
      ignoreVisibility: true
    });
    let index = focusableElems.length;
    while (index--) {
      focusableElems[index].tabIndex = tabIndex;
    }
  }

  /**
   * Adds responsive CSS class on the provided element, based on its current width.
   */
  public setResponsiveClass(element: ElementRef, breakpoint: SkyMediaBreakpoints): void {
    const nativeEl: HTMLElement = element.nativeElement;

    this.renderer.removeClass(nativeEl, 'sky-responsive-container-sm');
    this.renderer.removeClass(nativeEl, 'sky-responsive-container-md');

    let newClass: string;

    // tslint:disable-next-line: switch-default
    switch (breakpoint) {
      case SkyMediaBreakpoints.sm: {
        newClass = 'sky-responsive-container-sm';
        break;
      }
      case SkyMediaBreakpoints.md: {
        newClass = 'sky-responsive-container-md';
        break;
      }
    }

    this.renderer.addClass(nativeEl, newClass);
  }

}
