import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PlayerComponent } from '../player/player.component';
import { PlayerEditComponent } from '../player/player-edit/player-edit.component';
import { ToyboxComponent } from '../toybox/toybox.component';
import { PlayerDetailComponent } from '../player/player-detail/player-detail.component';
import { TeammgmtComponent } from '../teammgmt/teammgmt.component';
import { PlayerItemComponent } from '../player/player-list/player-item/player-item.component';
import { ServerErrorComponent } from '../errors/server-error/server-error.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    NgbDropdown,
    NgbDropdownModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ToastrModule,
    ToyboxComponent,
    TeammgmtComponent,
    PlayerItemComponent,
    PlayerEditComponent,
    PlayerDetailComponent,
    PlayerComponent,
    ServerErrorComponent
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: (_) => {
        this.router.navigateByUrl('/members');
        this.model = {};
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
