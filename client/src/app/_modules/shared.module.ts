import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PlayerComponent } from '../player/player.component';
import { ToastrModule } from 'ngx-toastr';
import { FootballishComponent } from '../Footballish/Footballish.component';
import { ToyboxComponent } from '../toybox/toybox.component';
import { TeammgmtComponent } from '../teammgmt/teammgmt.component';
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
    FootballishComponent,
    PlayerComponent,
    ToyboxComponent,
    TeammgmtComponent,
  ],
  exports: [
    BsDropdownModule,
    TabsModule,
    ToastrModule,
    NgxSpinnerModule,
    FootballishComponent,
    PlayerComponent,
    ToyboxComponent,
    TeammgmtComponent,
  ],
})
export class SharedModule {}
