import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 👈 IMPORTANTE
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
   imports: [
    CommonModule,
    FormsModule, // 👈 AÑADE ESTO
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = '';
  clave = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  login() {
    this.http.get<any[]>('http://localhost:3000/usuarios').subscribe(usuarios => {
      const usuarioValido = usuarios.find(u => u.usuario === this.usuario && u.clave === this.clave);
      if (usuarioValido) {
        localStorage.setItem('usuario', JSON.stringify(usuarioValido));
        this.router.navigate(['/productos']);
      } else {
        this.snack.open('Usuario o clave incorrectos', 'Cerrar', { duration: 2000 });
      }
    });
  }
}
