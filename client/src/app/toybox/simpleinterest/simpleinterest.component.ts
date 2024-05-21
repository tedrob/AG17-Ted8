import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-simpleinterest',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    RouterLinkActive,
    RouterModule,
  ],
  templateUrl: './simpleinterest.component.html',
  styleUrl: './simpleinterest.component.css',
})
export class SimpleinterestComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
