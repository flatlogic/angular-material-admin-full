import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users, UsersList } from '../models/users.model';
import { AutoCompleteItem } from '../models/common';

const baseUrl = '/api/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<UsersList> {
    return this.http.get<UsersList>(baseUrl);
  }

  getFilteredData(params: string): Observable<UsersList> {
    return this.http.get<UsersList>(baseUrl + params);
  }

  listAutocomplete(
    query: string,
    limit: number,
  ): Observable<AutoCompleteItem[]> {
    const params = {
      query,
      limit: limit.toString(),
    };
    return this.http.get<AutoCompleteItem[]>(`${baseUrl}/autocomplete`, {
      params,
    });
  }

  getById(id: string): Observable<Users> {
    return this.http.get<Users>(`${baseUrl}/${id}`);
  }

  create(data: Users): any {
    return this.http.post(`${baseUrl}`, { data });
  }

  update(data: any, id: string): any {
    return this.http.put(`${baseUrl}/${id}`, { data, id });
  }

  delete(id: string): any {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
