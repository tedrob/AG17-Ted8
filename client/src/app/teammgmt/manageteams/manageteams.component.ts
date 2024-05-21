import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeamItemComponent } from './team-item/team-item.component';
import { FootballTeams } from 'src/app/Footballish/football-teams.model';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manageteams',
  standalone: true,
  imports: [CommonModule, TeamItemComponent, RouterOutlet, RouterLinkActive, RouterModule],
  templateUrl: './manageteams.component.html',
  styleUrls: ['./manageteams.component.css'],
})
export class ManageteamsComponent implements OnInit, OnDestroy {
  footballTeams: FootballTeams[] = [];
  footballTeams2: FootballTeams[];

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() { }
}
