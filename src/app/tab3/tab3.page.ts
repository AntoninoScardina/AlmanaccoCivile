import { FavsSingletonService } from './../favs-singleton.service';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from "@angular/router";
import axios from "axios";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public favs: [];

  constructor(private router: Router, public favsService: FavsSingletonService) { 
    favsService.getFavs().then((res) => {
      this.favs = res; 
    });
  } 

  doRefresh(event) {
    setTimeout(async () => {
      this.favs = await this.favsService.getFavs();
      console.log(this.favs);
      event.target.complete();
    }, 2000);
  }
  
  async dataPassi(eventData) {
    const navigationExtras: NavigationExtras = {
      state: {
        event_data: eventData,
        skipLocationChange: true
      },
    };
    this.router.navigate(['evento-page'], navigationExtras);
  }
}
