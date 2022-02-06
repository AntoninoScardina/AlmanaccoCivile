import { StorageServiceService } from './../../storage-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nickname: string;
  password: string;
  

  constructor(private Router: Router,private storageServiceService: StorageServiceService) {
  }

  ngOnInit() {
  }

  Registrati() {
    this.Router.navigateByUrl("register")
  }

  Accedi() {
    axios
    .post(`${environment.baseURL}/login`, {
      nickname: this.nickname,
      password: this.password,
    })
    .then((res) => {
      if (res.data.data === 'ok') {
        console.log('login...');

        localStorage.setItem('logged', "true");
        localStorage.setItem('nickname', this.nickname);
        localStorage.setItem('password', this.password);

        this.Router.navigateByUrl('tabs');
      } else {
        console.log('login non riuscito...');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  

}
