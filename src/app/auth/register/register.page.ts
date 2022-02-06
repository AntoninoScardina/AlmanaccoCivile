import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import axios from "axios";
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

  constructor(private Router:Router) {  
  }

  ngOnInit() {
  }

  GuestAccess(){
    this.Router.navigateByUrl('tabs');
  }
  

  homepagescreen(){
    this.Router.navigateByUrl('login');
    localStorage.clear();
    localStorage.setItem("Guest", "True");
  }

  registrati(){
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
        
        localStorage.setItem('logged', "true");

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

  validateNick(targetValue) {
    console.log(targetValue);
  }
}
