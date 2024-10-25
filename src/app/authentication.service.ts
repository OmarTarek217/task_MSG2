import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private tokenKey = 'authToken';
  private userRoleKey = 'userRole'; 

  constructor(private http: HttpClient) {}

  login(loginData: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/login', loginData).pipe(
      tap((response: any) => {
        if (response.access_token) {
          this.saveToken(response.access_token); 
        }
        if (response.role) {
          this.saveUserRole(response.role);
        }
      })
    );
  }

  register(registerData: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/register', registerData);
    
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  saveUserRole(role: string): void {
    localStorage.setItem(this.userRoleKey, role);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.userRoleKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userRoleKey);
  }
}
