import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  eventsData: any;

  constructor(private router: Router) {

    this.getTendenze();

  }



  getTendenze() {

    let mese = 0;
    let giorno = 0;

    for (let i = 0; i < 2; i++) {

      mese = Math.floor(Math.random() * 12) + 1;
      giorno = Math.floor(Math.random() * 31) + 1;

      axios.get(`${environment.baseURL}/event/${giorno}`).then((res) => {
        this.eventsData = res.data['events'];
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    }


  }

  async dataPassi(eventData) {
    const navigationExtras: NavigationExtras = {
      state: {
        event_data: eventData,
      },
    };
    this.router.navigate(['evento-page'], navigationExtras);
  }
}
