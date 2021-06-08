import {
  ElementRef,
  Injectable
} from '@angular/core';

/**
 * @internal
 */
 @Injectable({
   providedIn: 'root'
 })
 export class SkyInputBoxAdapterService {

  public focusControl(elRef: ElementRef): void {
    const control = elRef.nativeElement.querySelector('.sky-form-control');
    if (control) {
      control.focus();
    }
  }

 }
