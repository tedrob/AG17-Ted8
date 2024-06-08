import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Player } from '../../players.model';
import { PlayersService } from 'src/app/_services/player.service';
import { HomeComponent } from 'src/app/home/home.component';

@Component({
  selector: 'app-player-item',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    RouterModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.css'],
  providers: [PlayersService],
})
export class PlayerItemComponent implements OnInit {
  @Input() player: Player;
  @Input() index: number;

  ngOnInit() {}
}
