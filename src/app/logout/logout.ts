import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-logout',
  template: `<p>Logging out...</p>`
})
export class LogoutComponent {
  constructor(private auth: AuthService, private router: Router) {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
