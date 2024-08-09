import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../../interfaces/login-request';
import { map, Observable } from 'rxjs';
import { AuthResponse } from '../../interfaces/auth-response';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../../interfaces/register-request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = environment.API_URL;
  private tokenKey = 'token';
  constructor(private http: HttpClient) {}

  // Metodos para el inicio de sesion
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}Usuarios/login`, data)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            localStorage.setItem(this.tokenKey, response.token);
          }
          return response;
        })
      );
  }

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  };

  private isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if (isTokenExpired) this.logout();
    return isTokenExpired;
  }

  refreshToken = (data: {
    email: string;
    token: string;
    refreshToken: string;
  }): Observable<AuthResponse> =>
    this.http.post<AuthResponse>(`${this.apiUrl}Usuarios/refresh-token`, data);
  getToken = (): string | null => localStorage.getItem(this.tokenKey) || '';

  logout = (): void => {
    localStorage.removeItem(this.tokenKey);
  };

  // Metodo para registrar clientes en la base de datos
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}Usuarios/register`, data);
  }

  getUserDetail() {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.nameid,
      fullName: decodedToken.name,
      email: decodedToken.email,
      roles: decodedToken.role || [],
    };
    
    return userDetail;
  };
}
