import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { take } from 'rxjs';
//import { Player } from 'src/app/_models/player';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { PlayersService } from 'src/app/_services/player.service';
import { PlayerItemComponent } from '../player-list/player-item/player-item.component';
import { Player } from '../players.model';

@Component({
  selector: 'app-player-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterOutlet,
    RouterLinkActive,
    PlayerItemComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css'],
})
export class PlayerEditComponent implements OnInit {
  player!: Player;
  user: User | null = null;

  id!: number;
  editMode = false;
  playerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private playerService: PlayersService,
    private router: Router
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => (this.user = user),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    console.log('onSubmit');
    if (this.editMode) {
      console.log('in edit mode ' + this.playerForm.value.Id);
      this.playerService.updatePlayer(this.id, this.playerForm.value);
    } else {
      console.log(
        'in add mode name ' + this.playerForm.value.name + ' desc',
        this.playerForm.value.description
      );
      this.player = new Player(
        this.playerForm.value.name,
        this.playerForm.value.description
      );
      this.playerService.addPlayer(this.player);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let playerName = '';
    let playerDescription = '';

    if (this.editMode) {
      const player = this.playerService.getPlayer(this.id);
      playerName = player.name;
      playerDescription = player.description;
    }

    this.playerForm = new FormGroup({
      name: new FormControl(playerName, Validators.required),
      description: new FormControl(playerDescription, Validators.required),
    });
  }
}
