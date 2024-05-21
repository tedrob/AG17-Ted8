import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/_services/player.service';

@Component({
  selector: 'app-player-start',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-start.component.html',
  styleUrls: ['./player-start.component.css'],
  providers: [PlayersService]
})
export class PlayerStartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
