import { Component, OnInit } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,

} from '@angular/router';
import { TeamItemComponent } from './manageteams/team-item/team-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teammgmt',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    RouterOutlet,
    RouterLinkActive,
    TeamItemComponent,
  ],

  templateUrl: './teammgmt.component.html',
  styleUrls: ['./teammgmt.component.css'],
})
export class TeammgmtComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
