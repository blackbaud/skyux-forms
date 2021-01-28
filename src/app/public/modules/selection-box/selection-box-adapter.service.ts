import {
  ElementRef,
  Injectable
} from "@angular/core";

/**
 * @internal
 */
@Injectable()
export class SkySelectionBoxAdapterService {

  public isDescendant(parentEl: ElementRef, childEl: ElementRef): boolean {
    return parentEl.nativeElement.contains(childEl);
  }

  public getControl(el: ElementRef): HTMLElement {
    return el.nativeElement.querySelector('.sky-switch');
  }

}
