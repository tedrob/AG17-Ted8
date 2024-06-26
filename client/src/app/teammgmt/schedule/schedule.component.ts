import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TeamItemComponent } from '../manageteams/team-item/team-item.component';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, TeamItemComponent],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [DatePipe],
})
export class ScheduleComponent implements OnInit {
  date;
  enddate;
  customFormat = 'MMM dd, yyyy';

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.date = this.datePipe.transform(Date.now(), this.customFormat);
    const dd = new Date();

    dd.setDate(dd.getDate() - (dd.getDay() + 2));

    this.enddate = this.datePipe.transform(dd, this.customFormat);
  }
}
