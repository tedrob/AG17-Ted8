import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
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
import { ToastrModule, ToastrService } from 'ngx-toastr';

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
    ToastrModule,
  ],
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css'],
  providers: [ToastrService],
})
export class PlayerEditComponent implements OnInit {
  @ViewChild('playerForm') playerForm: NgForm | undefined;
  player: Player | undefined;
  user: User | null = null;

  id!: number;
  editMode = false;
  // playerForm: FormGroup = new FormGroup({
  //   name: new FormControl('', Validators.required),
  //   description: new FormControl('', Validators.required),
  // });

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private playerService: PlayersService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => (this.user = user),
    });
    /* this.playerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    }); */
    //this.playerForm = this.playerService.getPlayer(0);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log('in init ' + this.id + ' edit ' + this.editMode + ' params ' + params['id'].value)
      //this.initForm();
      this.loadPlayer();
    });
  }
  loadPlayer() {
    if (!this.user) return;
    const player = this.playerService.getPlayers();
    console.log('in loadmember count ' + player.length );
  }

  onSubmit() {
    console.log('onSubmit');
    if (this.playerForm) {
      console.log('in player edit mode ' + this.playerForm.value.Id);
      this.playerService.updatePlayer(this.id, this.playerForm.value);
    } else {
      console.log(
        'in add player ' + this.playerForm.value.name + ' desc',
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

  updatePlayer() {
    console.log(this.playerForm.value.name);
    this.toastr.success('Player updated successfully', '', {
      positionClass: 'toast-bottom-right',
    });
  }
  onDeletePlayer() {
    console.log('onDeletePlayer');
    this.playerService.deletePlayer(this.id);
    this.router.navigate(['/player', 'delete']);
  }

  initForm() {
    if (!this.user) return;

    console.log('in begging + ' + this.id+ ' edit ' + this.editMode);
    //const player = this.playerService.getPlayer(42);
    /* console.log(
      'in init desc is' + player.description + ' name = ' + player.name
    ); */

    if (this.editMode) {
      console.log('in edit mode');
      this.player = this.playerService.getPlayer(this.id);
      //console.log('in Editmode ' + player.playerName + ' this id ' + this.id);
      //playerName = player.playerName;
      //playerDescription = player.description;
    } else {
      console.log( 'in new mode');
      this.player = new Player('', '');
      console.log('in new mode ' + this.player.playerName);

      //const player = new Player('', '');
      //playerName = player.name;
      //playerDescription = player.desc;
    }

    /* this.playerForm = new FormGroup({
      name: new FormControl(this.player.playerName, Validators.required),
      description: new FormControl(
        this.player.description,
        Validators.required
      ),
    }); */
  }
}
