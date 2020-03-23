import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserData } from '../shared/model/user-data.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: UserData;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserData()
      .subscribe(user => this.user = user);
  }

}
