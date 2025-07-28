import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [FormsModule],
  templateUrl: './signup.html',
  standalone: true,

})

export class Signup {
  email: string = '';
  password: string = '';

  constructor(public auth: AuthService, private router: Router) {}

  onSignUp() {
    this.auth.signUp(this.email, this.password).subscribe({
      next: (data: any) => {
        alert('Sign up successful');
        this.router.navigate(['/login']);
      },
      error: err => {
  console.error('Sign up error:', err);
  alert('Sign up failed');
}
    });
  }

}