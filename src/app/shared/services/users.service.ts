import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Users, UsersList } from '../models/users.model';
import { AutoCompleteItem } from '../models/common';
import { APP_RUNTIME_CONFIG, AppRuntimeConfig } from '../../app.config';

const baseUrl = '/api/users';
const MOCK_USERS_STORAGE_KEY = 'mock-users-crud-list';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private config: AppRuntimeConfig;

  private readonly mockUsersSeed: Users[] = [
    {
      id: '1',
      firstName: 'Jane',
      lastName: 'Hew',
      phoneNumber: '+1 (555) 010-1001',
      email: 'jane.hew@flatlogic.com',
      role: 'admin',
      disabled: false,
      password: '',
      emailVerified: true,
      emailVerificationToken: '',
      emailVerificationTokenExpiresAt: null,
      passwordResetToken: '',
      passwordResetTokenExpiresAt: null,
      provider: 'local',
      avatar: [{ publicUrl: 'assets/user/list/1.png' }],
      createdBy: null,
      updatedBy: null,
    },
    {
      id: '2',
      firstName: 'Alex',
      lastName: 'Pittman',
      phoneNumber: '+1 (555) 010-1002',
      email: 'alex.pittman@flatlogic.com',
      role: 'admin',
      disabled: false,
      password: '',
      emailVerified: true,
      emailVerificationToken: '',
      emailVerificationTokenExpiresAt: null,
      passwordResetToken: '',
      passwordResetTokenExpiresAt: null,
      provider: 'local',
      avatar: [{ publicUrl: 'assets/user/list/2.png' }],
      createdBy: null,
      updatedBy: null,
    },
    {
      id: '3',
      firstName: 'Sophia',
      lastName: 'Fernandez',
      phoneNumber: '+1 (555) 010-1003',
      email: 'sophia.fernandez@flatlogic.com',
      role: 'user',
      disabled: false,
      password: '',
      emailVerified: true,
      emailVerificationToken: '',
      emailVerificationTokenExpiresAt: null,
      passwordResetToken: '',
      passwordResetTokenExpiresAt: null,
      provider: 'local',
      avatar: [{ publicUrl: 'assets/user/list/3.png' }],
      createdBy: null,
      updatedBy: null,
    },
    {
      id: '4',
      firstName: 'Bob',
      lastName: 'Nilson',
      phoneNumber: '+1 (555) 010-1004',
      email: 'bob.nilson@flatlogic.com',
      role: 'user',
      disabled: true,
      password: '',
      emailVerified: true,
      emailVerificationToken: '',
      emailVerificationTokenExpiresAt: null,
      passwordResetToken: '',
      passwordResetTokenExpiresAt: null,
      provider: 'local',
      avatar: [{ publicUrl: 'assets/user/list/4.png' }],
      createdBy: null,
      updatedBy: null,
    },
    {
      id: '5',
      firstName: 'Jessica',
      lastName: 'Nilson',
      phoneNumber: '+1 (555) 010-1005',
      email: 'jessica.nilson@flatlogic.com',
      role: 'user',
      disabled: false,
      password: '',
      emailVerified: true,
      emailVerificationToken: '',
      emailVerificationTokenExpiresAt: null,
      passwordResetToken: '',
      passwordResetTokenExpiresAt: null,
      provider: 'local',
      avatar: [{ publicUrl: 'assets/user/list/5.png' }],
      createdBy: null,
      updatedBy: null,
    },
  ];

  constructor(
    @Inject(APP_RUNTIME_CONFIG) appConfig: AppRuntimeConfig,
    private http: HttpClient,
  ) {
    this.config = appConfig;

    if (!this.config.isBackend) {
      this.ensureMockUsers();
    }
  }

  getAll(): Observable<UsersList> {
    if (!this.config.isBackend) {
      return of(this.toUsersList(this.getMockUsers()));
    }

    return this.http.get<UsersList>(baseUrl);
  }

  getFilteredData(params: string): Observable<UsersList> {
    if (!this.config.isBackend) {
      return of(this.getFilteredMockUsers(params));
    }

    return this.http.get<UsersList>(baseUrl + params);
  }

  listAutocomplete(
    query: string,
    limit: number,
  ): Observable<AutoCompleteItem[]> {
    if (!this.config.isBackend) {
      const normalizedQuery = (query || '').toLowerCase().trim();
      const options = this.getMockUsers()
        .filter((user) => {
          const fullName = `${user.firstName || ''} ${user.lastName || ''}`
            .trim()
            .toLowerCase();
          return (
            fullName.includes(normalizedQuery) ||
            (user.email || '').toLowerCase().includes(normalizedQuery)
          );
        })
        .slice(0, limit)
        .map((user) => ({
          id: user.id,
          label: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        }));

      return of(options);
    }

    const params = {
      query,
      limit: limit.toString(),
    };
    return this.http.get<AutoCompleteItem[]>(`${baseUrl}/autocomplete`, {
      params,
    });
  }

  getById(id: string): Observable<Users | null> {
    if (!this.config.isBackend) {
      const user = this.getMockUsers().find((item) => item.id === id);
      return of(user ? this.normalizeUser(user) : null);
    }

    return this.http.get<Users>(`${baseUrl}/${id}`);
  }

  create(data: Partial<Users>): Observable<Users | Record<string, unknown>> {
    if (!this.config.isBackend) {
      const users = this.getMockUsers();
      const newUser = this.normalizeUser({
        ...data,
        id: String(Date.now()),
      });
      users.unshift(newUser);
      this.setMockUsers(users);
      return of(newUser);
    }

    return this.http.post<Record<string, unknown>>(`${baseUrl}`, { data });
  }

  update(
    data: Partial<Users>,
    id: string,
  ): Observable<Users | Record<string, unknown>> {
    if (!this.config.isBackend) {
      const users = this.getMockUsers();
      const nextUsers = users.map((item) =>
        item.id === id ? this.normalizeUser({ ...item, ...data, id }) : item,
      );
      this.setMockUsers(nextUsers);
      return of(this.normalizeUser({ ...data, id }));
    }

    return this.http.put<Record<string, unknown>>(`${baseUrl}/${id}`, {
      data,
      id,
    });
  }

  delete(id: string): Observable<{ id: string } | Record<string, unknown>> {
    if (!this.config.isBackend) {
      const users = this.getMockUsers().filter((item) => item.id !== id);
      this.setMockUsers(users);
      return of({ id });
    }

    return this.http.delete<Record<string, unknown>>(`${baseUrl}/${id}`);
  }

  private ensureMockUsers(): void {
    const storedUsers = localStorage.getItem(MOCK_USERS_STORAGE_KEY);
    if (!storedUsers) {
      this.setMockUsers(this.mockUsersSeed);
    }
  }

  private getMockUsers(): Users[] {
    try {
      const storedUsers = localStorage.getItem(MOCK_USERS_STORAGE_KEY);
      const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
      if (!Array.isArray(parsedUsers)) {
        return [];
      }
      return parsedUsers.map((user) => this.normalizeUser(user));
    } catch {
      return [];
    }
  }

  private setMockUsers(users: Users[]): void {
    localStorage.setItem(
      MOCK_USERS_STORAGE_KEY,
      JSON.stringify(users.map((user) => this.normalizeUser(user))),
    );
  }

  private normalizeUser(data: Partial<Users>): Users {
    return {
      id: data?.id || '',
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      phoneNumber: data?.phoneNumber || '',
      email: data?.email || '',
      role: data?.role || 'user',
      disabled: Boolean(data?.disabled),
      password: data?.password || '',
      emailVerified: Boolean(data?.emailVerified),
      emailVerificationToken: data?.emailVerificationToken || '',
      emailVerificationTokenExpiresAt:
        data?.emailVerificationTokenExpiresAt || null,
      passwordResetToken: data?.passwordResetToken || '',
      passwordResetTokenExpiresAt: data?.passwordResetTokenExpiresAt || null,
      provider: data?.provider || 'local',
      avatar: Array.isArray(data?.avatar) ? data.avatar : [],
      createdBy: data?.createdBy || null,
      updatedBy: data?.updatedBy || null,
    };
  }

  private toUsersList(rows: Users[]): UsersList {
    return {
      count: rows.length,
      rows,
    };
  }

  private getFilteredMockUsers(params: string): UsersList {
    const query = new URLSearchParams((params || '').replace('?', ''));
    let rows = [...this.getMockUsers()];

    query.forEach((value: string, key: string) => {
      if (!value || ['field', 'sort', 'limit'].includes(key)) {
        return;
      }

      rows = rows.filter((user) => {
        const source = this.getUserFieldValue(user, key);
        return source.includes(value.toLowerCase());
      });
    });

    const field = query.get('field');
    const sort = query.get('sort');
    if (field && sort) {
      rows.sort((a, b) => {
        const aValue = this.getUserFieldValue(a, field);
        const bValue = this.getUserFieldValue(b, field);
        if (aValue === bValue) {
          return 0;
        }
        return aValue > bValue ? 1 : -1;
      });
      if (sort === 'desc') {
        rows.reverse();
      }
    }

    const limit = Number(query.get('limit'));
    if (!Number.isNaN(limit) && limit > 0) {
      rows = rows.slice(0, limit);
    }

    return this.toUsersList(rows);
  }

  private getUserFieldValue(user: Users, field: string): string {
    const record = user as unknown as Record<string, unknown>;
    return String(record[field] ?? '').toLowerCase();
  }
}
