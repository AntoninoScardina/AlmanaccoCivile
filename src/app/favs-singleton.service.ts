import { Injectable } from '@angular/core';
import axios from "axios";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavsSingletonService {
  public favs: [] = [];

  constructor() {
    this.reload_load();
  }

  public reload_load() {
    axios
    .get(
      `${environment.baseURL}/favs/${localStorage.getItem('nickname')}`
      )
    .then((res) => {
      this.favs = res.data['favs'];
    })
    .catch((err) => {
      console.log(err);
    });  
  }

  public async getFavs() {
    let favs = (await axios.get(`${environment.baseURL}/favs/${localStorage.getItem('nickname')}`)).data['favs'];
    
    return favs;  
  }
}
