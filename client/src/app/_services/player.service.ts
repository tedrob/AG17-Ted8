import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject, take } from 'rxjs';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { Player } from '../player/players.model';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  baseUrl = environment.apiUrl;
  players: Player[] = [];
  playersCache = new Map();
  user: User | undefined;
  userParams: UserParams | undefined;

  playerChanged = new Subject<Player[]>();

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.userParams = new UserParams(user);
          this.user = user;
        }
      },
    });
  }

  playerlists: Player[] = [
    new Player('XoiOOiuH8iI', 'Tyla-Water'),
    new Player('YaxGNQE5ZLA', 'Star-Spangled Banner As Never Heard I'),
    new Player('LgPpowVNEfE', 'Musiq - So beautiful'),
    new Player('iXvy8ZeCs5M', 'John legend - Tonight'),
    new Player('NmCFY1oYDeM', 'John legend - Love Me Now'),
    new Player('6YNZlXfW6Ho', 'Ella mai - Boo`d up'),
    new Player('g5Z904AccvM', 'I bring me'),
    new Player('ttALzuU-JHw', 'If I ever fall in love'),
    new Player('H64QG4UsrGI', 'Mario - let me Love You'),
    new Player('PMivT7MJ41M', 'That`s What I Like-Bruno Mars'),
    new Player('oOfGGjr6Aq4', 'Kem - Share My Life'),
    new Player('62iOcrKHG6Q', 'River - Leon Bridges'),
    new Player('fV8vB1BB2qc', 'Boyz II Men - I`ll Make Love To You'),
    new Player('HhuGQUZJot8', 'Alicia Keys - Un-thinkable'),
    new Player('2aK-ciz7mGI', 'Alicia Keys & Jay-Z - New York'),
    new Player('2aK-ciz7mGI', 'BBC One Alicia Keys 2020/2021'),
    new Player('fPgf2meEX1w', 'Usher & Alicia Keys My Boo'),
    new Player('uJW69FjTu7o', 'Alicia Keys-Landmarks live'),
    new Player('XxGh4ruG33M', 'Fourplay-I`ll Still Be Loving You'),
    new Player('seZMOTGCDag', 'Jack Johnson - Better Togeher'),
    new Player('xpVfcZ0ZcFM', 'Drake - God`s Plan'),
    new Player('3NKeffFYWno', 'Jhene Aiko - Unreleased'),
    new Player('EtJy69cEOtQ', 'How to Learn Anything'),
    new Player('BxY_eJLBflk', 'Put God First - Denzel Washington'),
    new Player('g-jwWYX7Jlo', 'Dream Motivational'),
    new Player('TqyLnMa3DJw', 'CHOPIN - Nocture Op.9'),
    new Player('zM4En012IJo', 'Novel & Short Story'),
    new Player('LZ055ilIiN4', 'Amanda Gorman reads inauguration'),
    new Player('HCjNJDNzw8Y', 'HAVANA, Camila Cabello'),
    new Player('Qn25lL4a94o', 'Dr. SaxLove, Max Maxwell'),
    new Player('gSuQggW_iJA', 'Southern Blues Juke Joint Soul Jams'),
    new Player('lFsChbwsbmo', 'Insanity Gregory Porter'),
    new Player('p37iZ3o5k2Y', 'GIL Scott Heron'),
    new Player('5oSnLt20Wn4', 'Consequence of Love'),
    new Player('QUmxh7H8vok', 'Anthony Hamilton - Charlene'),
    new Player('kXIX5vHYjiM', 'Funky Uplifting'),
    new Player('coue17TmnrA', 'Funky Uplifting R&B Mix'),
    new Player('hifl-h1FXek', 'Teddy Love TKO'),
    new Player('SGqg_ZzThDU', 'Black Coffee Salle'),
    new Player('5ceVFLfGdAo', 'Superman is a DJ'),
    new Player('m_qewI-1cEs', 'Honey Dijon Boiler Room'),
    new Player('8WYHDfJDPDc', 'NellyVille'),
    new Player('J7HwVIGWBls', 'Backyard Southern Soul'),
    new Player('ICXNWceWRB0', 'Man in the Mirror'),
    new Player('HhSB53Nhj_8', 'Lila Where I"m Coming From'),
    new Player('1km-F2DVgjs', 'Moms Mabley'),
    new Player('QFUif6T5xiI', 'Witney Houston'),
    new Player('lOqSQgHUWW4', 'Trevor Noah'),
    new Player('aOrmjpToyMk', 'Smooth Jazz'),
    new Player('D0mgk0KgI0Q', 'Silent Night - Temptations'),
    new Player('79UWvR734wI', 'InfoOnDif-MVC-Net-Core'),
    new Player('fyGSyqEX2dw', 'Don"t imitate me JavaScript'),
    new Player('GjrFonwnqLE', 'Tyla-Butterflies'),
  ];

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  getPlayers() {
    return this.playerlists.slice();
  }

  getPlayer(index: number) {
    return this.playerlists[index];
  }

  addPlayer(player: Player) {
    console.log(
      'in player service add ' + player.name + this.playerlists.length
    );
    this.playerlists.push(player);
    console.log(
      'in player service after  add ' +
        player.name +
        ' ' +
        this.playerlists.length +
        ' ' +
        this.playerlists[this.playerlists.length - 1].name +
        ' DESC ' +
        this.playerlists[this.playerlists.length - 1].desc
    );
    this.playerChanged.next(this.playerlists.slice());
  }

  updatePlayer(index: number, newPlayer: Player) {
    this.playerlists[index] = newPlayer;
    this.playerChanged.next(this.playerlists.slice());
  }

  deletePlayer(index: number) {
    this.playerlists.splice(index, 1);
    this.playerChanged.next(this.playerlists.slice());
  }
}
