import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';

import { EventoPagePageRoutingModule } from './evento-page-routing.module';

import { EventoPagePage } from './evento-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    EventoPagePageRoutingModule
  ],
  declarations: [EventoPagePage]
})
export class EventoPagePageModule {}
