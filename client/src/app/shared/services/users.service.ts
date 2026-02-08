import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUser } from '../../auth/models/auth-user.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = `${this.resolveApiUrl()}/users`;

  private resolveApiUrl(): string {
    const base = environment.apiUrl?.trim();
    if (!environment.production && typeof window !== 'undefined') {
      if (!base || base === window.location.origin) {
        return 'http://localhost:3000';
      }
    }
    return base || 'http://localhost:3000';
  }

  getUsers(): Observable<AuthUser[]> {
    return this.http.get<AuthUser[]>(this.API_URL);
  }

  getUser(id: string): Observable<AuthUser> {
    return this.http.get<AuthUser>(`${this.API_URL}/${id}`);
  }

  updateUser(id: string, user: Partial<AuthUser>): Observable<AuthUser> {
    return this.http.put<AuthUser>(`${this.API_URL}/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
