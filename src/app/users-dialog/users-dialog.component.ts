import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { UtilitiesService } from '../shared/services/utilities.service';
import { User } from '../users/model/user.modal';
import { UserService } from './user.service';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss']
})
export class UsersDialogComponent implements OnInit {

  protected usersList$: Observable<User[]>;
  constructor(private _service: UserService, private _router: Router, private _utitlity: UtilitiesService) {
    this.usersList$ = new Observable<User[]>
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.usersList$ = this._service.getUsers();
  }

  public addUser(userData: User) {
    this._service.addUser(userData).subscribe({
      next: () => {
        this._utitlity.showSnackBar("New User Added");
      },
      error: (e) => {
        console.error(e)
      }
    })
  }

  public updateUser(data:any) {
    // this._service.updateUser(userData, userData.id).subscribe({
    //   next: () => {
    //     this._utitlity.showSnackBar("User Details Updated");
    //   },
    //   error: (e) => {
    //     console.error(e)
    //   }
    // })
  }


  public onDelete(user: User): void {
    const mgs = `Are you sure you want to Delete ${user.firstName.concat(' ', user.lastName)}?`;
    this._utitlity.openDeleteConfirmation(mgs).afterClosed().subscribe({
      next: (result) => {
        if (result && user.id) {
          this.removeUser(user.id)
        }
      },
      error: (e) => {
        console.error(e)
      }
    })
  }

  private removeUser(id: string): void {
    this._service.removeUser(id).subscribe({
      next: () => {
        this._utitlity.showSnackBar("User is Removed");
        this.getUsers();
      },
      error: (e) => {
        console.error(e);
      }
    })
  }
}
