import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username!:string | null;



  constructor(private authService: AuthService) {
    this.username = this.authService.getUser(); // Obtener el nombre de usuario
  }

  onLogout() {
    this.authService.logout(); // Cerrar sesión y redirigir al login
  }
}
