import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GENDER } from 'src/app/shared/constants/constants';
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
    if (usersList) {
      this._usersList = usersList;
      this.dataSource.data = this._usersList
    }
  }
  public get usersList(): User[] {
    return this._usersList;
  }

  @Output() editUserData: EventEmitter<{ data: User, id: string }>;
  @Output() newUserData: EventEmitter<User>;
  @Output() deleteId: EventEmitter<User>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  private _usersList!: User[];
  public dataSource: MatTableDataSource<User>;
  public GENDER = GENDER;

  protected displayedColumns: string[] = ['position', 'fullname', 'email', 'phoneNo', 'dateOfBirth', 'gender', 'action'];

  constructor(private _dialog: MatDialog) {
    this.editUserData = new EventEmitter<{ data: User, id: string }>();
    this.newUserData = new EventEmitter<User>();
    this.deleteId = new EventEmitter<User>();
    this.dataSource = new MatTableDataSource<User>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onDelete(user: User): void {
    this.deleteId.emit(user)
  }

  onForm(user?: User) {
    const formDialogRef = user ? this._dialog.open(UserFormPresentationComponent, { data: user }) : this._dialog.open(UserFormPresentationComponent)
    formDialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          user && user.id ? this.editUserData.emit({ data: data, id: user.id }) : this.newUserData.emit(data);
        }
      },
      error: (e) => {
        console.error(e)
      }
    })
  }

  public applyFilter(keyPressEvent: KeyboardEvent) {
    let value: string = (keyPressEvent.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

}
