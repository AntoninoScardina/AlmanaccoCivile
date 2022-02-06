import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  public nickname: string;

  constructor(private Router : Router) { 
    this.nickname = localStorage.getItem('nickname') ? localStorage.getItem('nickname') : 'Rocco'; 
  }

  ngOnInit() {
  }

  LogOut(){
    localStorage.clear();
    this.Router.navigateByUrl('register');
  }

}
