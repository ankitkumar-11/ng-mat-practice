import { Directive, ElementRef, HostListener } from '@angular/core';

import { ONLY_ALPHABETS_REGEX } from '../constants/constants';

@Directive({
  selector: '[appOnlyAlphabets]'
})
export class OnlyAlphabetsDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const initalValue = this._el.nativeElement.value;

    this._el.nativeElement.value = initalValue.replace(ONLY_ALPHABETS_REGEX, '');
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
