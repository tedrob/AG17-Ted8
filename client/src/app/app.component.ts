import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToyboxComponent } from './toybox/toybox.component';
import { TeammgmtComponent } from './teammgmt/teammgmt.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';
import { FooterComponent } from './footer/footer.component';
import { FibonacciComponent } from './toybox/fibonacci/fibonacci.component';
import { PalindromeComponent } from './toybox/palindrome/palindrome.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    NavComponent,
    HomeComponent,
    HttpClientModule,
    NgxSpinnerModule,
    ToyboxComponent,
    FibonacciComponent,
    TeammgmtComponent,
    PlayerDetailComponent,
    FooterComponent,
    PalindromeComponent,
  ],
})
export class AppComponent implements OnInit {
  title = 'TedsDev app';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
