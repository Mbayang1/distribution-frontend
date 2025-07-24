import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {}

  onLogin() {
    this.http.post<any>('http://localhost:3000/auth/login', { email: this.email, password: this.password })
      .subscribe({
        next: res => {
          this.auth.login(res.token);
          this.router.navigate(['/dashboard']);
        },
        error: err => alert('Login failed')
      });
  }
}
