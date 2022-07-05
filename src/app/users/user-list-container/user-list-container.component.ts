import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { User } from '../model/user.modal';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list-container',
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.scss']
})
export class UserListContainerComponent implements OnInit {

  protected usersList$: Observable<User[]>;
  constructor(private _service: UserService, private _router: Router, private _utilitie: UtilitiesService) {
    this.usersList$ = new Observable<User[]>
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.usersList$ = this._service.getUsers();
  }

  public onEdit(id: string): void {
    this._router.navigate([`/users/edit/${id}`]);
  }

  public onDelete(user: User): void {
    const mgs = `Are you sure you want to Delete ${user.firstName.concat(' ', user.lastName)}?`;
    this._utilitie.openDeleteConfirmation(mgs).afterClosed().subscribe({
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
        this._utilitie.showSnackBar("User is Removed");
        this.getUsers();
      },
      error: (e) => {
        console.error(e);
      }
    })
  }
}
