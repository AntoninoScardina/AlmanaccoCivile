import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public isGuest: boolean;

  constructor(private router: Router) {
    this.isGuest = localStorage.getItem('guest') === 'true';
  }

  infoPage() {
    this.router.navigateByUrl('info');
  }
}
// DNO