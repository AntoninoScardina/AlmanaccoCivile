import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private nickname: string;
  private nome: string;
  private cognome: string;
  private password: string;
  private userExists: boolean;

  constructor(private Router:Router, public toastController: ToastController) {  
  }

  ngOnInit() {
  }

  guestAccess(){
    this.Router.navigateByUrl('tabs');
    localStorage.setItem('guest', 'true');
  }

  homepagescreen(){
    this.Router.navigateByUrl('login');
    localStorage.clear();
  }

  validInput() {
    return this.nickname && this.nome && this.cognome && this.password;
  }

  async registrati() {
    if (!this.validInput()) {
      const toast = await this.toastController.create({
        message: 'I campi di input non sono stati immessi correttamente. ',
        duration: 2000
      });
      toast.present();
      return;
    }

    axios
    .post(`${environment.baseURL}/register`, {
      nickname: this.nickname,
      nome: this.nome,
      cognome: this.cognome,
      password: this.password
    })
    .then((res) => {
      if (res.data.res === 'ok') {
        const navigationExtras: NavigationExtras = {
          state: {
            user_data: {
              nickname: this.nickname,
              nome: this.nome,
              cognome: this.cognome,
            },
          },
        };
        localStorage.setItem('logged', 'true');

        // SECURITY LEVEL: MASTER
        localStorage.setItem('nickname', this.nickname);
        localStorage.setItem('password', this.password);

        this.Router.navigate(['tabs', navigationExtras]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  async validateNick(targetValue) {
    try {
      const user = (await axios.get(`${environment.baseURL}/user/${targetValue}`)).data;
      this.userExists = Boolean(user.data);
    } catch (_) { console.log(_); }
  }
}
