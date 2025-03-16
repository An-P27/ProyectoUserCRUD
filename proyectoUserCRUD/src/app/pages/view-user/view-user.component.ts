import { Component, inject, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-view-user',
  imports: [],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css',
})
export class ViewUserComponent {
  @Input() idUser: string = '';
  userService = inject(UsersService);
  myUser!: IUser;

  async ngOnInit() {
    let id = this.idUser;
    try {
      this.myUser = await this.userService.getById(id);
    } catch (error) {
      console.log(error);
    }
  }
}
