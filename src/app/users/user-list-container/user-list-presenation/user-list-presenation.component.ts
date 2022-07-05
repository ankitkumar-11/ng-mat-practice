import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../model/user.modal';

@Component({
  selector: 'app-user-list-presenation',
  templateUrl: './user-list-presenation.component.html',
  styleUrls: ['./user-list-presenation.component.scss']
})
export class UserListPresenationComponent implements OnInit {

  /**
   * @description Setter for userList from Input
   */
  @Input() public set usersList(usersList: User[] | null) {
    if (usersList)
      this._usersList = usersList;
  }
  public get usersList(): User[] {
    return this._usersList;
  }

  @Output() editId: EventEmitter<string>;
  @Output() deleteId: EventEmitter<User>;

  private _usersList!: User[];

  protected displayedColumns: string[] = ['position', 'fullname', 'email', 'phoneNo', 'dateOfBirth', 'gender', 'action'];

  constructor() {
    this.editId = new EventEmitter<string>();
    this.deleteId = new EventEmitter<User>();
  }

  ngOnInit(): void {
  }

  public onEdit(id: string): void {
    this.editId.emit(id);
  }

  public onDelete(user: User): void {
    this.deleteId.emit(user)
  }
}
