import {  CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { PlayerItemComponent } from './player-list/player-item/player-item.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerStartComponent } from './player-start/player-start.component';
import { SharedModule } from '../_modules/shared.module';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayersService } from '../_services/player.service';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Player } from './players.model';
import { PlayerEditComponent } from './player-edit/player-edit.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    CommonModule,
    PlayerStartComponent,
    PlayerListComponent,
    PlayerItemComponent,
    PlayerDetailComponent,
    PlayerEditComponent,
    PlayerItemComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SharedModule,
    [NgIf]
  ],
  templateUrl: './player.component.html',
  providers: [PlayersService],
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  playerlists: Player[];


  constructor(private accountService: AccountService, private playerService: PlayersService ) {}

  ngOnInit() {
    this.setCurrentUser();
    this.playerlists = this.playerService.getPlayers();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
