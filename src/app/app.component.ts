import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'webim-oath-vk-assignment';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
