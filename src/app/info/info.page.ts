import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(private Router : Router) { }

  ngOnInit() {
  }

  LogOut(){
    localStorage.clear();
    this.Router.navigateByUrl("home-screen");
  }

}
