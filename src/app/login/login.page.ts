import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username!: string ;
  password!: string;
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.authService.login(this.username, this.password)) {
      // Redirigir a la página de inicio con el nombre de usuario
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
    }
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}