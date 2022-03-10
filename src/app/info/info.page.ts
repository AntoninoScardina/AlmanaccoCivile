import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  public nickname: string;
  public isGuest: boolean;

  constructor(private Router : Router) { 
    this.nickname = localStorage.getItem('nickname') ? localStorage.getItem('nickname') : 'Accedi o registrati per avere un nickname'; 
    this.isGuest = localStorage.getItem('guest') === 'true';
  }

  ngOnInit() {
  }

  LogOut(){
    localStorage.clear();
    this.Router.navigateByUrl('register');
  }

}
