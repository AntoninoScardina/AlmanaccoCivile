import { Injectable } from '@angular/core';
import axios from "axios";

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
      `http://185.25.207.172:3000/favs/${localStorage.getItem('nickname')}`
      )
    .then((res) => {
      this.favs = res.data['favs'];
    })
    .catch((err) => {
      console.log(err);
    });  
  }

  public async getFavs() {
    let favs = (await axios.get(`http://185.25.207.172:3000/favs/${localStorage.getItem('nickname')}`)).data['favs'];
    
    return favs;  
  }
}
