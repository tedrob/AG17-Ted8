import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { PlayersService } from 'src/app/_services/player.service';
import { Observable, Subscription } from 'rxjs';
import { HomeComponent } from 'src/app/home/home.component';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { PlayerStartComponent } from '../player-start/player-start.component';
import { PlayerItemComponent } from './player-item/player-item.component';
import { Player } from '../players.model';
import { PlayerDetailComponent } from '../player-detail/player-detail.component';
import { PlayerEditComponent } from '../player-edit/player-edit.component';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    PlayerStartComponent,
    PlayerListComponent,
    PlayerDetailComponent,
    PlayerItemComponent,
    PlayerEditComponent,
  ],
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
  providers: [PlayersService],
})
export class PlayerListComponent implements OnInit, OnDestroy {
  players$: Observable<Player[]> | undefined;
  playerlists: Player[] = [];
  subscription: Subscription;

  constructor(
    private playerService: PlayersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.playerService.playerChanged
      .subscribe(
        (players: Player[]) => {
          this.playerlists = players;
        }
      );
    this.playerlists = this.playerService.getPlayers();
  }

  onNewplayer() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
