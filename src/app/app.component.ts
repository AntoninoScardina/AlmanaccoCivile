import { RegisterPage } from './auth/register/register.page';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from "@ionic/angular";
import { LoginPage } from './auth/login/login.page';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // public rootPage: any;
  login = 'login';
  register = 'register';

  constructor(private platform: Platform, private Router: Router) {
    platform.ready().then(async () => {
      if (localStorage.getItem('logged') === 'true') {
        this.Router.navigateByUrl('tabs');
      } else{
        this.Router.navigateByUrl('register');
      }
    });
  }
}
