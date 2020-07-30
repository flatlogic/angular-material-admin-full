import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {UserDetails} from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public getUsers(): Observable<UserDetails[]> {
    return of([
      {
        id: '1',
        name: 'Jane Hew',
        role: 'admin',
        companyName: 'Flatlogic',
        email: 'admin@flatlogic.com',
        status: 'active',
        createdAt: '2020-06-07'
      },
      {
        id: '2',
        name: 'Axel Pittman',
        role: 'admin',
        companyName: 'Flatlogic',
        email: 'admin@flatlogic.com',
        status: 'inactive',
        createdAt: '2020-06-07'
      },
      {
        id: '3',
        name: 'Sophia Fernandez',
        role: 'admin',
        companyName: 'Flatlogic',
        email: 'admin@flatlogic.com',
        status: 'active',
        createdAt: '2020-06-07'
      },
      {
        id: '4',
        name: 'Bob Nilson',
        role: 'admin',
        companyName: 'Flatlogic',
        email: 'admin@flatlogic.com',
        status: 'inactive',
        createdAt: '2020-06-07'
      },
      {
        id: '5',
        name: 'Jessica Nilson',
        role: 'admin',
        companyName: 'Flatlogic',
        email: 'admin@flatlogic.com',
        status: 'active',
        createdAt: '2020-06-07'
      }
    ]);
  }
}
