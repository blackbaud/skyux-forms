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

const SM_BREAKPOINT_CLASS_NAME = 'sky-responsive-container-sm';
const MD_BREAKPOINT_CLASS_NAME = 'sky-responsive-container-md';
const LG_BREAKPOINT_CLASS_NAME = 'sky-responsive-container-lg';

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
    const smBreakpointMaxPixels = 991;
    const mdBreakpointMinPixels = 992;
    const mdBreakpointMaxPixels = 1439;

    if (width <= smBreakpointMaxPixels) {
      return SkyMediaBreakpoints.sm;
    } else if (width >= mdBreakpointMinPixels && width <= mdBreakpointMaxPixels) {
      return SkyMediaBreakpoints.md;
    } else {
      return SkyMediaBreakpoints.lg;
    }
  }

  /**
   * Returns the width of the `parentNode` of the provided `element`.
   */
  public getParentWidth(element: ElementRef): number {
    return element.nativeElement.parentNode.getBoundingClientRect().width;
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

    this.renderer.removeClass(nativeEl, SM_BREAKPOINT_CLASS_NAME);
    this.renderer.removeClass(nativeEl, MD_BREAKPOINT_CLASS_NAME);
    this.renderer.removeClass(nativeEl, LG_BREAKPOINT_CLASS_NAME);

    let newClass: string;

    // tslint:disable-next-line: switch-default
    switch (breakpoint) {
      case SkyMediaBreakpoints.sm: {
        newClass = SM_BREAKPOINT_CLASS_NAME;
        break;
      }
      case SkyMediaBreakpoints.md: {
        newClass = MD_BREAKPOINT_CLASS_NAME;
        break;
      }
      case SkyMediaBreakpoints.lg: {
        newClass = LG_BREAKPOINT_CLASS_NAME;
        break;
      }
    }

    this.renderer.addClass(nativeEl, newClass);
  }

}
