import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/users/model/user.modal';
import { UserFormPresentationComponent } from './user-form-presentation/user-form-presentation.component';

@Component({
  selector: 'app-users-list-presentation',
  templateUrl: './users-list-presentation.component.html',
  styleUrls: ['./users-list-presentation.component.scss']
})
export class UsersListPresentationComponent implements OnInit {

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

  @Output() editUserData: EventEmitter<{ data: User, id: string }>;
  @Output() newUserData: EventEmitter<User>;
  @Output() deleteId: EventEmitter<User>;

  private _usersList!: User[];

  protected displayedColumns: string[] = ['position', 'fullname', 'email', 'phoneNo', 'dateOfBirth', 'gender', 'action'];

  constructor(private _dialog: MatDialog) {
    this.editUserData = new EventEmitter<{ data: User, id: string }>();
    this.newUserData = new EventEmitter<User>();
    this.deleteId = new EventEmitter<User>();
  }

  ngOnInit(): void {
  }

  public onDelete(user: User): void {
    this.deleteId.emit(user)
  }

  onForm(user?: User) {
    const formDialogRef = user ? this._dialog.open(UserFormPresentationComponent, { data: user }) : this._dialog.open(UserFormPresentationComponent)
    formDialogRef.afterClosed().subscribe({
      next: (data) => {
        // user ? this.editUserData.emit(data, user.id) : this.newUserData.emit(data);
      },
      error: (e) => {
        console.error(e)
      }
    })
  }

}
