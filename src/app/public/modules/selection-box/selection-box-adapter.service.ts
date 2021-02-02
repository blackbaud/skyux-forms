import {
  ElementRef,
  Injectable
} from '@angular/core';

/**
 * @internal
 */
@Injectable()
export class SkySelectionBoxAdapterService {

  public focus(el: ElementRef): void {
    el.nativeElement.focus();
  }

  public getControl(el: ElementRef): HTMLElement {
    return el.nativeElement.querySelector('.sky-switch');
  }

  public isDescendant(parentEl: ElementRef, childEl: ElementRef): boolean {
    return parentEl.nativeElement.contains(childEl);
  }

}
