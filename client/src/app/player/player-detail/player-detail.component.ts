import { Component, OnInit, Input } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PlayersService } from 'src/app/_services/player.service';
import { Player } from '../players.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerItemComponent } from '../player-list/player-item/player-item.component';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterLinkActive,
    RouterOutlet,
    PlayerItemComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css'],
  providers: [PlayersService],
})
export class PlayerDetailComponent implements OnInit {
  @Input() player;
  id!: number;
  urlCache = new Map<string, SafeResourceUrl>();

  playerlists: Player[];
  playerlist = [];

  constructor(
    private sanitizer: DomSanitizer,
    private playerService: PlayersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.player = this.playerService.getPlayer(this.id);
    });

    this.playerlists = this.playerService.getPlayers();
    for (var i = 0; i < this.playerlists.length - 1; i++) {
      let names = this.playerlists[i].name;
      this.playerlist.push(names);
    }
    console.log('in onInit detail plist = ' + this.playerlist.length);
  }

  getEmbedURL(item) {
    let z: number = 0;
    const playerlist = [];

    if (!item) {
      item = this.playerlists[0];
    }

    for (let i = 0; i < this.playerlists.length; i++) {
      if (this.playerlists[i].playerName === item.playerName) {
        z = i + 1;
        break;
      }
    }


    if (z > 2) {
      z++;
    }

    for (let i = z; i < this.playerlists.length - 1; i++) {
      item.name = this.playerlist[i].playerName;
      const names2 = this.playerlist[i].playerName;
      playerlist.push(names2);
    }
    z += 6;
    if (z >= playerlist.length) {
      playerlist.slice(z-1);
    }

    for (let i = 0; i < z; i++) {
      if (i === z - 1) {
        z++;
        break;
      }

      const names2 = this.playerlists[i].playerName;
      playerlist.push(names2);
      playerlist.slice(0, 1);
      console.log('in playerlist length = ' + playerlist.length + ' z ' + z);
    }
    z++;
    playerlist.slice(1);
    console.log('pl-list after splice = ' + playerlist.length);
    let url = this.urlCache.get(item.name);

    const lnk1 = item.name;
    const lnk2 =
      '?rel=0?version=3&amp;autoplay=1&amp;controls=1&loop=1&playlist=' +
      playerlist;

    if (!url) {
      url = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' + lnk1 + '?enablejasapi1=1' + lnk2
      );
      this.urlCache.set(item.name, url);
    }
    return url;
  }

  onEditPlayer() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeletePlayer() {
    this.playerService.deletePlayer(this.id);
    this.router.navigate(['/player']);
  }
}
