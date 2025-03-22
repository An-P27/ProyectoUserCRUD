import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { toast } from 'ngx-sonner';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-buttons',
  imports: [RouterLink],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {
  @Input() myUser!: IUser;
  usersService = inject(UsersService);
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();

  deleteUser(id: string) {
    toast(
      `Vas a borrar el usuario ${this.myUser.first_name} ${this.myUser.last_name}`,
      {
        action: {
          label: 'Aceptar',
          onClick: async () => {
            let response = await this.usersService.delete(id);

            this.deleteItemEmit.emit(true);
          },
        },
      }
    );
  }
}
