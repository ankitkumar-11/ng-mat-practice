import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list-presenation',
  templateUrl: './user-list-presenation.component.html',
  styleUrls: ['./user-list-presenation.component.scss']
})
export class UserListPresenationComponent implements OnInit {


  private _usersList: any;
  public get usersList(): any {
    return this._usersList;
  }
  @Input() public set usersList(v: any) {
    if (v)
      this._usersList = v;
  }

  protected displayedColumns: string[] = ['position', 'name', 'email', 'phoneNumber', 'age', 'action'];

  constructor() { }

  ngOnInit(): void {
  }

}
