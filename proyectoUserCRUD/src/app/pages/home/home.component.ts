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
  totalPages: number = 1; // Se actualizará al obtener datos de la API
  perPage: number = 10; // Cantidad de usuarios por página

  constructor(private usersService: UsersService) {}

  async ngOnInit() {
    // this.userService.getAll().subscribe({
    //   next: (data) => {
    //     this.arrUsers = data.results;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });
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

  async loadUsers() {
    this.usersService
      .getAll(this.currentPage)
      .subscribe((response: IResponse) => {
        this.arrUsers = response.results; // Los datos de los usuarios
        this.totalPages = response.total_pages; // Total de páginas de la API
      });
  }
  catch(error: any) {
    console.log(error);
  }
}
