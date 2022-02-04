import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventoPagePage } from './evento-page.page';

const routes: Routes = [
  {
    path: '',
    component: EventoPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventoPagePageRoutingModule {}
