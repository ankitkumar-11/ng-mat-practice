import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {




  protected isOpen: boolean;

  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  constructor(private _observer: BreakpointObserver) {
    this.isOpen = true;
  }

  ngOnInit(): void {
    this._observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.drawer.mode = 'over';
        this.drawer.close();
      } else {
        this.drawer.mode = 'side';
        this.drawer.open();
      }
    });
  }

  protected toggleSideNav() {
    this.isOpen = !this.isOpen
  }

}
