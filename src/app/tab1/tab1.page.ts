import { NavigationExtras, Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import axios from 'axios';
import * as bubble from './bubble.js';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public eventsData = [];
  public months = {
    Gennaio: 1,
    Febbraio: 2,
    Marzo: 3,
    Aprile: 4,
    Maggio: 5,
    Giugno: 6,
    Luglio: 7,
    Agosto: 8,
    Settembre: 9,
    Ottobre: 10,
    Novembre: 11,
    Dicembre: 12,
  };

  ngOnInit(): void {
   
    bubble();
    this.getEvents();
  }

  constructor(private router: Router) { 
  }

  getEvents() {
    const giornoMeseAnno =
      (document.querySelector('#clicked') ? document.querySelector('#clicked') : document.querySelector('.curr-date')).textContent.trim() +
      ' ' +
      document.querySelector('#month-picker').textContent +
      ' ' +
      document.querySelector('#year').textContent;
    axios
      .get(
        `${environment.baseURL}/event/${giornoMeseAnno.split(' ')[0]}?month=${this.months[giornoMeseAnno.split(' ')[1]]}`
      )
      .then((res) => {
        this.eventsData = res.data['events'];
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  
  

  resetEvents() {
    this.eventsData = [];
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
