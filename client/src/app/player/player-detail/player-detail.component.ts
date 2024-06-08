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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerItemComponent } from '../player-list/player-item/player-item.component';
import { Player } from 'src/app/_models/player';

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
  host: { click: 'onEditPlayer()' },
})
export class PlayerDetailComponent implements OnInit {
  @Input() player: Player | undefined;
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
    for (var i = 0; i < this.playerlists.length; i++) {
      const names = this.playerlists[i].playerName;
      this.playerlist.push(names);
    }
  }

  getEmbedURL(item) {
    let z: number;
    const playerlist = [];

    if (!item) {
      item = this.playerService.getPlayer(0);
    }

    for (let i = 0; i < this.playerlists.length; i++) {
      if (this.playerlists[i].playerName === item.playerName) {
        z = i + 1;
        break;
      }
    }

    for (let i = 0; i < this.playerlists.length - 1; i++) {
      item.name = this.playerlists[i].playerName;
      const names2 = this.playerlist[i].playerName;
      playerlist.push(names2);
      playerlist.slice(0, 1);
    }

    if (z <= this.playerlist.length) {
      this.playerlist.slice(z - 1);
    }

    console.log(
      'after first slice pl = ' +
        playerlist.length +
        ' z = ' +
        z +
        ' pls = ' +
        this.playerlists.length
    );

    for (let i = 0; i < z; i++) {
      if (i === z) {
        z++;
        //break;
      }
      item.name = this.playerlists[i].playerName;
      const names2 = this.playerlists[i].playerName;
      playerlist.push(names2);
      this.playerlists.slice(1);
    }

    let url = this.urlCache.get(item.name);

    const lnk1 = item.name;
    const lnk2 =
      '?rel=0?version=3&amp;autoplay=1&amp;controls=1&loop=1&playlist=' +
      playerlist;

    if (!url) {
      url = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' +
          lnk1 +
          '?enablejasapi1=1' +
          lnk2
      );
      this.urlCache.set(item, url);
    }
    return url;
  }

  onEditPlayer() {
    console.log('OnEditPlayer ' + this.id + ' ' + this.player.playerName);
    this.router.navigate(['edit']); //, { relativeTo: this.route });
    this.router.navigate(['../player/', 'edit']); //, { relativeTo: this.route });
  }

  onDeletePlayer() {
    console.log('onDeletePlayer');
    this.playerService.deletePlayer(this.id);
    this.router.navigate(['/player', 'delete'], { relativeTo: this.route });
  }
}
