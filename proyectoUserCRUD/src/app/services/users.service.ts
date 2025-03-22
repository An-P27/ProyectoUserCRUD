import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IResponse } from '../interfaces/iresponse.interface';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private baseUrl: string = ' https://peticiones.online/api/users';

  getAll(page: number = 1): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.baseUrl}?page=${page}`);
  }

  getById(id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`));
  }

  delete(id: string): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.delete<IUser>(`${this.baseUrl}/${id}`)
    );
  }
}
