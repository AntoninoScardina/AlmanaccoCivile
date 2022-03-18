/* eslint-disable @typescript-eslint/dot-notation */
import { FavsSingletonService } from './../favs-singleton.service';
import { Tab3Page } from './../tab3/tab3.page';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-evento-page',
  templateUrl: './evento-page.page.html',
  styleUrls: ['./evento-page.page.scss'],
})
export class EventoPagePage implements OnInit {
  public eventData = [];
  public nickname: string;
  public eventId: number;
  public iconName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private favsService: FavsSingletonService,
    public toastController: ToastController
  ) {
    this.route.queryParams.subscribe(async (params) => {
      const state = this.router.getCurrentNavigation().extras.state;
      if (state) {
        this.eventData = state.event_data;
      }
      this.eventId = this.eventData['idevento'];
      if (this.eventData['path_immagine'].startsWith('http://')) {
        this.eventData['path_immagine'] = this.eventData['path_immagine'].replace('http://', 'https://'); 
      }
      this.iconName = await this.isFavorite() ? 'star' : 'star-outline';
      await this.increateViews(this.eventId);
    });
  }

  ngOnInit() { }

  async increateViews(eventId) {
    try {
      await axios.post(`${environment.baseURL}/increase_v/`, {
        id: eventId,
      });
    } catch (_) { console.error(_); }
  }

  async isFavorite() {
    const nick = localStorage.getItem('nickname');
    //
    let exists: boolean;
    try {
      const result = await axios.get(`${environment.baseURL}/favs/${nick}`);
      exists = result.data.favs.some((fav: any) => this.eventData['titolo'] === fav['titolo']);
    } catch (_) { console.error(_); }
    //
    return exists;
  }

  aggiungiPreferiti(){
    axios
    .post(`${environment.baseURL}/add_fav`, {
      nickname: localStorage.getItem('nickname'),
      id: this.eventId,
    })
    .then((res) => {
      if (res.data.res === 'ok') {
        console.log('aggiunto ai preferiti');
      } else {
        console.log('errore del cazzo pt 1');
      }
    })
    .catch((err) => {
      console.log(err);
    });
    this.iconName = 'star';
  }

  rimuoviPreferiti() {
    axios
    .post(`${environment.baseURL}/rem_fav`, {
      nickname: localStorage.getItem('nickname'),
      id: this.eventId,
    })
    .then((res) => {
      if (res.data.res === 'ok') {
        console.log('rimosso dai preferiti');
      } else {
        console.log('errore del cazzo pt 2');
      }
    })
    .catch((err) => {
      console.log(err);
    });
    this.iconName = 'star-outline';
  }

  info(){
    this.router.navigate(['info']);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  async AORFavorite() {
    if (!localStorage.getItem('guest')) {
      if (await this.isFavorite()) {
        this.rimuoviPreferiti();
      } else {
        this.aggiungiPreferiti();
      }
      this.favsService.reload_load();
    } else {
      const toast = await this.toastController.create({
        message: 'Devi essere registrato per poter salvare gli eventi nei preferiti.',
        duration: 2000
      });
      toast.present();
    }
  }
}
