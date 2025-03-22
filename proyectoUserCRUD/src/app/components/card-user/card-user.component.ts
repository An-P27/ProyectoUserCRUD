import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { ButtonsComponent } from '../../shared/buttons/buttons.component';

@Component({
  selector: 'app-card-user',
  imports: [ButtonsComponent],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css',
})
export class CardUserComponent {
  @Input() myUser!: IUser;
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();

  deleteUser(event: Boolean) {
    this.deleteItemEmit.emit(event);
  }
}
