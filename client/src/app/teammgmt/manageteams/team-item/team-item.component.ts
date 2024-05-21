import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FootballTeams } from 'src/app/Footballish/football-teams.model';


@Component({
  selector: 'app-team-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.css'],
})
export class TeamItemComponent implements OnInit {
  @Input() team!: FootballTeams;
  @Input() index?: number;


  constructor() {}

  ngOnInit() {}
}
