import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';


@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  public nickname: string;
  public isGuest: boolean;
  public imageUrl: string;

  constructor(private Router : Router) { 
    this.imageUrl = '../../assets/user.svg';
    this.nickname = localStorage.getItem('nickname') ? localStorage.getItem('nickname') : 'Accedi o registrati per avere un nickname'; 
    this.isGuest = localStorage.getItem('guest') === 'true';
    /*
    axios.get('https://api.thecatapi.com/v1/images/search').then(res => {
      this.imageUrl = res.data[0].url;
    });
    */
  }

  ngOnInit() {
  }

  LogOut(){
    localStorage.clear();
    this.Router.navigateByUrl('register');
  }

}
