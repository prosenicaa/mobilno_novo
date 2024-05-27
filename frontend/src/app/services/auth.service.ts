import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role: string;

  constructor(private router: Router, private http: HttpClient) { 
    this.role = localStorage.getItem('role') || 'user';
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>('http://localhost:3001/users/login', credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.isAdmin ? 'admin' : 'user');
        this.role = response.isAdmin ? 'admin' : 'user';
      })
    );
  }

  getRole() {
    return this.role;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
