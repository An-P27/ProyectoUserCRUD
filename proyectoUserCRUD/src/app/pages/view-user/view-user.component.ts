import { Component, inject, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { ButtonsComponent } from '../../shared/buttons/buttons.component';

@Component({
  selector: 'app-view-user',
  imports: [ButtonsComponent],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css',
})
export class ViewUserComponent {
  @Input() idUser: string = '';
  userService = inject(UsersService);
  myUser: IUser = {
    _id: '',
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: '',
    password: '',
  };

  async ngOnInit() {
    let id = this.idUser;
    try {
      this.myUser = await this.userService.getById(id);
    } catch (error: any) {
      console.error('Error', error);
    }
  }
}
