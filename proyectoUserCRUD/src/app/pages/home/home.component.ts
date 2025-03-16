import { Component, inject } from '@angular/core';
import { CardUserComponent } from '../../components/card-user/card-user.component';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  imports: [CardUserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userService = inject(UsersService);
  arrUsers: IUser[] = [];

  async ngOnInit() {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.arrUsers = data.results;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
