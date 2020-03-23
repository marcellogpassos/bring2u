import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
})
export class LoginPage implements OnInit {

  email: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  login() {
    this.authService.authenticate(this.email)
      .then(() => console.log('>>> Email de autenticação enviado.'));
  }

}
