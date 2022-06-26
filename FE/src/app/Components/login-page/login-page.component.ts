import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private route:Router
    ) { }

  ngOnInit(): void {
  }

  login = () => {
    this.auth.loginWithRedirect({ appState:{target:'/pets'} })
  }

}
