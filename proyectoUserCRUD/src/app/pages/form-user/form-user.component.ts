import { Component, inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-form-user',
  imports: [ReactiveFormsModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css',
})
export class FormUserComponent {
  @Input() idUser: string = '';
  userForm: FormGroup = new FormGroup({}, []);
  user!: IUser;
  userService = inject(UsersService);
  title: string = 'Registrar nuevo';

  async ngOnInit() {
    if (this.idUser) {
      try {
        this.user = await this.userService.getById(this.idUser);
        this.title = 'Actualizar';
      } catch (msg: any) {
        toast.error(msg.error);
      }
    }
    this.userForm = new FormGroup(
      {
        _id: new FormControl(this.idUser || null, []),
        first_name: new FormControl(this.user?.first_name || null, [
          Validators.required,
        ]),
        last_name: new FormControl(this.user?.last_name || null, [
          Validators.required,
        ]),
        email: new FormControl(this.user?.email || null, [Validators.required]),
        image: new FormControl(this.user?.image || null, [Validators.required]),
      },
      []
    );
  }

  getDataForm() {
    if (this.userForm.value._id) {
      let response = this.userService.update(this.userForm.value);
    } else {
    }
  }
}
