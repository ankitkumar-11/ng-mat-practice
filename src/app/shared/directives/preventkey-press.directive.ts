import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventkeyPress]'
})
export class PreventkeyPressDirective {

  constructor() { }

  @HostListener('keydown', ['$event']) onInputChange(event: Event) {
    event.preventDefault();
  }
}
