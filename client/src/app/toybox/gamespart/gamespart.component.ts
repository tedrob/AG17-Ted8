import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { BoardComponent } from './presentation/board/board.component';
import { CellComponent } from './presentation/cell/cell.component';

@Component({
  selector: 'app-gamespart',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, RouterLinkActive, BoardComponent, CellComponent],
  templateUrl: './gamespart.component.html',
  styleUrls: ['./gamespart.component.css'],
})
export class GamespartComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
