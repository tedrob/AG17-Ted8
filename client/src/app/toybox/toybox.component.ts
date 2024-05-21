import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-toybox',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    RouterLinkActive,
  ],
  templateUrl: './toybox.component.html',
  styleUrls: ['./toybox.component.css'],
})
export class ToyboxComponent implements OnInit {
  fibnumber: any;

  constructor() {}

  ngOnInit() {}
}
