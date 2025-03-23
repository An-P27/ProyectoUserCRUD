import { Component, inject } from '@angular/core';
import { CardUserComponent } from '../../components/card-user/card-user.component';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { IResponse } from '../../interfaces/iresponse.interface';

@Component({
  selector: 'app-home',
  imports: [CardUserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userService = inject(UsersService);
  arrUsers: IUser[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 10;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.loadUsers();
  }

  gotoNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  gotoPrev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  loadUsers() {
    try {
      this.usersService
        .getAll(this.currentPage)
        .subscribe((response: IResponse) => {
          this.arrUsers = response.results;
          this.totalPages = response.total_pages;
        });
    } catch (error: any) {
      console.error('Error', error);
    }
  }

  deleteUser(event: Boolean) {
    if (event) {
      this.loadUsers();
    }
  }
}
