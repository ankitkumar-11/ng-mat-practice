import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list-container',
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.scss']
})
export class UserListContainerComponent implements OnInit {

  protected usersList$: Observable<any>;
  constructor(private _service: UserService) {
    this.usersList$ = new Observable<any>
  }

  ngOnInit(): void {

    this.usersList$ = this._service.getUsers();
  }





}
