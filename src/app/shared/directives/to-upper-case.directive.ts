import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appToUpperCase]'
})
export class ToUpperCaseDirective {


  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event.target']) onInputChange(input: HTMLInputElement) {
    const initalValue = input.value;
    this._el.nativeElement.value = initalValue.toUpperCase();
  }
}
