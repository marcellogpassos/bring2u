import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-finish-login',
  templateUrl: './finish-login.page.html',
})
export class FinishLoginPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('>>> url', window.location.href);
    this.authService.validateEmailLink(window.location.href)
      .then(userCredential => console.log('>>> userCredential', userCredential),
        error => console.error('>>> error', error));
  }

}
