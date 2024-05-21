import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Player } from '../../players.model';
import { PlayersService } from 'src/app/_services/player.service';

@Component({
  selector: 'app-player-item',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.css'],
  providers: [PlayersService]
})
export class PlayerItemComponent implements OnInit {
  @Input() player: Player;
  @Input() index: number;

  ngOnInit() {}
}
