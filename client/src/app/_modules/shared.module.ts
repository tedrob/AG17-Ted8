import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PlayerComponent } from '../player/player.component';
import { ToastrModule } from 'ngx-toastr';
import { FootballishComponent } from '../Footballish/Footballish.component';
import { ToyboxComponent } from '../toybox/toybox.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    NgxSpinnerModule.forRoot({
      type: 'line-scale-party',
    }),
    PlayerComponent,
    FootballishComponent,
    ToyboxComponent,
  ],
  exports: [
    TabsModule,
    NgxSpinnerModule,
    PlayerComponent,
    ToastrModule,
    BsDropdownModule,
    FootballishComponent,
    ToyboxComponent,
  ],
})
export class SharedModule {}
