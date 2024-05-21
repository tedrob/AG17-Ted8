import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-palindrome',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    RouterLinkActive,
  ],
  templateUrl: './palindrome.component.html',
  styleUrls: ['./palindrome.component.css'],
})
export class PalindromeComponent implements OnInit {


  constructor() {}

  ngOnInit() {}
}
