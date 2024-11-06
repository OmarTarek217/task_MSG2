import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  updateProfile(profileData: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put('http://127.0.0.1:8000/api/user/update', profileData, { headers });
  }

  getCurrentUser(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found. User is not authenticated.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get('http://127.0.0.1:8000/api/user', { headers });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userRoleKey);
  }
}
