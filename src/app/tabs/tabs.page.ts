import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private Router: Router) {

  }

  InfoPage(){
    this.Router.navigateByUrl('info')
  }

}
