import { Component, inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-user',
  imports: [ReactiveFormsModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css',
})
export class FormUserComponent {
  @Input() idUser: string = '';
  userForm: FormGroup = new FormGroup(
    {
      _id: new FormControl(''),
      first_name: new FormControl('', []),
      last_name: new FormControl('', []),
      email: new FormControl('', []),
      image: new FormControl('', []),
    },
    []
  );
  user!: IUser;
  userService = inject(UsersService);
  title: string = 'Registrar nuevo';
  router = inject(Router);

  async ngOnInit() {
    if (this.idUser) {
      try {
        this.user = await this.userService.getById(this.idUser);
        this.title = 'Actualizar';
      } catch (error: any) {
        console.error('Error', error);
      }
    }
    this.userForm = new FormGroup(
      {
        _id: new FormControl(this.idUser || null, []),
        first_name: new FormControl(this.user?.first_name || null, [
          Validators.required,
          Validators.minLength(3),
        ]),
        last_name: new FormControl(this.user?.last_name || null, [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl(this.user?.email || null, [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ]),
        image: new FormControl(this.user?.image || null, [
          Validators.required,
          Validators.pattern(
            /^(https?:\/\/(?:.*\.pravatar\.cc\/.*|.*\.(?:png|jpg|jpeg|gif|webp|bmp|svg)(?:\?.*)?))$/
          ),
        ]),
      },
      []
    );
  }

  getDataForm() {
    let response: IUser | any;
    try {
      if (this.userForm.value._id) {
        let response = this.userService.update(this.userForm.value);
      } else {
        let response = this.userService.insert(this.userForm.value);
      }
    } catch (error: any) {
      console.error('Error', error);
    }
    this.router.navigate(['/home']);
  }
  checkControl(controlName: string, errorName: string): boolean | undefined {
    return (
      this.userForm.get(controlName)?.hasError(errorName) &&
      this.userForm.get(controlName)?.touched
    );
  }
}
