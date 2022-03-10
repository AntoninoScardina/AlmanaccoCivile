import { StorageServiceService } from './../../storage-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nickname: string;
  password: string;
  

  constructor(private Router: Router, public toastController: ToastController, private storageServiceService: StorageServiceService) {
  }

  ngOnInit() {
  }

  Registrati() {
    this.Router.navigateByUrl("register")
  }

  validInput() {
    return this.nickname && this.password;
  }

  async Accedi() {
    if (!this.validInput()) {
      const toast = await this.toastController.create({
        message: 'I campi di input non sono stati immessi correttamente. ',
        duration: 2000
      });
      toast.present();
      return;
    }

    axios
    .post(`${environment.baseURL}/login`, {
      nickname: this.nickname,
      password: this.password,
    })
    .then(async (res) => {
      console.log(res.data.data)
      if (res.data.data === 'ok') {
        console.log('login...');

        localStorage.setItem('logged', "true");
        localStorage.setItem('nickname', this.nickname);
        localStorage.setItem('password', this.password);

        this.Router.navigateByUrl('tabs');
      } else {
        const toast = await this.toastController.create({
          message: 'Username o Password non corretti. ',
          duration: 2000
        });
        toast.present();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  

}
