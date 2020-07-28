import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';

import {
  SkyBrowserDetector
} from './browser-detector';

@Directive({
  selector: '[skyAutofill]'
})
export class SkyAutofillDirective implements OnInit {

  /**
   * Prevents the browser's native autofill from displaying for an input element.
   * @required
   */
  @Input()
  public set skyAutofill(value: string) {
    this._autofill = value;
    this.setAutocomplete(this.elementRef, this._autofill);
  }

  private _autofill: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  /**
   * Implementation for Angular's OnInit lifecycle hook.
   * @internal
   */
  public ngOnInit(): void {
    this.setAutocomplete(this.elementRef, this._autofill);
  }

  private setAutocomplete(element: ElementRef, value: string): void {
    if (value === 'on') {
      this.renderer.removeAttribute(element.nativeElement, 'autocomplete');
      return;
    }

    if (value === 'off') {
      const isChrome = SkyBrowserDetector.isChromeDesktop;

      if (isChrome) {
        const name = element.nativeElement.getAttribute('name') || 'sky-input';
        this.renderer.setAttribute(element.nativeElement, 'autocomplete', `new-${name}`);
      } else {
        this.renderer.setAttribute(element.nativeElement, 'autocomplete', 'off');
      }
      return;
    }
  }
}
