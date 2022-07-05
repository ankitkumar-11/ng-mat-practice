import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { User } from '../model/user.modal';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form-container',
  templateUrl: './user-form-container.component.html',
  styleUrls: ['./user-form-container.component.scss']
})
export class UserFormContainerComponent implements OnInit {

  public editData$: Observable<User>
  private editId!: string;
  private isEditMode: boolean;
  constructor(private _userService: UserService, private _utitlity: UtilitiesService, private _router: Router, private activetedRoute: ActivatedRoute) {
    this.editData$ = new Observable<User>();
    this.isEditMode = false;
  }

  ngOnInit(): void {
    this.editId = this.activetedRoute.snapshot.params['id']
    if (this.editId) {
      this.editData$ = this._userService.getUserById(this.editId)
      this.isEditMode = true;
    }
  }

  public onSubmit(userData: User): void {
    this.isEditMode ? this.updateUser(userData) : this.addUser(userData);
  }

  public onCancel() {
    this.redirectToList()
  }

  private redirectToList(): void {
    this._router.navigate(['users/list']);
  }

  private addUser(userData: User) {
    this._userService.addUser(userData).subscribe({
      next: () => {
        this._utitlity.showSnackBar("New User Added");
        this.redirectToList();
      },
      error: (e) => {
        console.error(e)
      }
    })
  }

  private updateUser(userData: User) {
    this._userService.updateUser(userData, this.editId).subscribe({
      next: () => {
        this._utitlity.showSnackBar("User Details Updated");
        this.redirectToList();
      },
      error: (e) => {
        console.error(e)
      }
    })
  }

}
