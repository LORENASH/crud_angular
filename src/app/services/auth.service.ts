import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/usuarios';
  private currentUser: Usuario | null = null;

  constructor(private http: HttpClient) {}

  login(usuario: string, password: string): Observable<boolean> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?usuario=${usuario}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          this.currentUser = users[0];
          return true;
        }
        return false;
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  logout() {
    this.currentUser = null;
  }
}
