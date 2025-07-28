import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // Update with your actual backend URL

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, {
      email,
      password
    });
  }

 login(email: string, password: string): Observable<{ token: string }> {
  return this.http.post<{ token: string }>(`${this.baseUrl}/auth/login`, {
    email,
    password
  });
}

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
