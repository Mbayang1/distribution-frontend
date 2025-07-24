import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [FormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
  standalone: true,

})

export class Signin {

  onSignIn() {
    // TODO: Implement sign-in logic here
    console.log('Sign in clicked');
  }
  username: string = '';
  password: string = '';


}