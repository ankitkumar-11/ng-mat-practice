import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle: EventEmitter<Event>;

  constructor() {
    this.toggle = new EventEmitter<Event>();
  }

  ngOnInit(): void {
  }

  protected sideNavToggele() {
    this.toggle.emit();
  }

}
