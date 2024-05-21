import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FootballSchedule } from '../football-schedule.model';
import { FootballTeams } from '../football-teams.model';

@Component({
  selector: 'app-football-schedule',
  standalone: true,
  imports: [],
  templateUrl: './football-schedule.component.html',
  styleUrls: ['./football-schedule.component.css']
})
export class FootballScheduleComponent implements OnInit {
  footballteamlists: FootballTeams[];
  model: NgbDateStruct;
  date: {year: number, month: number};
  footballschedule: FootballSchedule[] = [];
  footballschedule2: FootballSchedule;
  week: number;

  constructor() { }

  ngOnInit(){ }

}
