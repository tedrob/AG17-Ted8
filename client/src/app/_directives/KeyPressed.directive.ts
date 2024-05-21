import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appKeyPressed]',
})
export class KeyPressedDirective {
  constructor(elRef: ElementRef<HTMLElement>) {
    elRef.nativeElement.setAttribute('tabindex', '0');
    elRef.nativeElement.addEventListener('keypress', (e) => console.log(e));
  }
}
