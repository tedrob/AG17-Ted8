import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FootballService } from 'src/app/Footballish/football.service';
import { WeeklyGame } from 'src/app/Footballish/football-teams.model';
import { ShowgamespickedComponent } from './showgamespicked/showgamespicked.component';

@Component({
  selector: 'app-pickteams',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink, RouterModule, ShowgamespickedComponent],
  templateUrl: './pickteams.component.html',
  styleUrls: ['./pickteams.component.css'],
  providers: [FootballService, DatePipe]

})
export class PickteamsComponent implements OnInit, OnChanges {
  weekForm: FormGroup;
  gameForm: FormGroup;
  submitted = false;
  weeklyGames: WeeklyGame[];
  weekGame: FormGroup = this.formBuilder.group(this.initModelFormGroup());

  week = 1;
  weeksGames = [];

  teams: any[] = [];
  teamsA: any[] = [];
  teamsH: any[] = [];

  public GAME_WEEK_TYPE = {
    'AWAY': 'away',
    'HOME': 'home',
  };

  constructor(
    private formBuilder: FormBuilder,
    private fs: FootballService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.teamsA = this.fs.getAFCteams();
    this.teamsH = this.fs.getNFCteams();

    this.weekForm = this.formBuilder.group({
      week: [1],
      gameMethod: this.initWeekFormArray(),
    });
  }

  initWeekFormArray() {
    const arrayForm = this.formBuilder.array([]);
    for (let i = 0; i < 8; i++) {
      const group: any = this.initWeekFormGroup();
      group.patchValue({
        away: {
          'type': '',
          'teamNo': this.teamsA[i].teamnumber,
          'teamName': this.teamsA[i].name,
        },
        home: {
          'type': '',
          'teamNo': this.teamsH[i].teamnumber,
          'teamName': this.teamsH[i].name,
        },


      });
      arrayForm.push(group);
    }
    return arrayForm;
  }

  initWeekFormGroup() {
    const groupForm = this.formBuilder.group({
      'type': ['', Validators.required],
      'away': this.formBuilder.group(this.initAModel()),
      'home': this.formBuilder.group(this.initHModel()),
    });
    return groupForm;
  }

  initAModel () {
    const model = {
      'type': new FormControl('AWAY'), // 'AWAY',
      'teamNo': new FormControl(null), // '',
      'teamName': new FormControl(null) // ''
    };
    return model;
  }

  initHModel () {
    const model = {
      'type': new FormControl('HOME'), // 'HOME',
      'teamNo': new FormControl(null), // '',
      'teamName': new FormControl(null) // ''
    };
    return model;
  }

  setGameMethodType(i, type1) {
    const ctrl: FormGroup = (<any>this.weekForm).controls.gameMethod;
    ctrl.controls[i].patchValue({type: type1});
    ctrl.controls[i].get('type').markAsTouched();
  }

  initModelFormGroup() {
    const model = this.formBuilder.group({
      week: new FormControl(null), // 0,
      type: new FormControl(null), // '',
      teamNo: new FormControl(null), // '',
      teamName: new FormControl(null), // ''
    });
    return model;
  }

  onSubmit() {
    this.submitted = true;
    console.log('onSubmit games length ' + this.weekForm.controls['gameMethod']['controls'].length)
    const lnth = this.weekForm.controls['gameMethod']['controls'].length;
    const week = this.weekForm.controls['week'].value;
    const arrayForm = this.formBuilder.array([]);

    let team;
    let wktype;
    let wkteam;
    this.weeksGames.splice(0, this.weeksGames.length);

    console.log('controls lnth ' + lnth);
    for (let i = 0; i < lnth; i++) {
      wktype = this.weekForm.controls['gameMethod']['controls'][i].get('type').value;
      console.log('wktype ' + wktype);
      const group:any = this.initModelFormGroup();
      if (wktype === 'home') {
        team = this.weekForm.controls['gameMethod']['controls'][i];
        wkteam = team.controls.home['controls'].teamName.value;
        group.patchValue({
          'week': week,
          'teamNo': i + 1,
          'type': wktype,
          'teamName': wkteam
        });
        arrayForm.push(group);
      } else {
        team = this.weekForm.controls['gameMethod']['controls'][i];
        wkteam = team.controls.away['controls'].teamName.value;
        group.patchValue({
          'week': week,
          'teamNo': i + 1,
          'type': wktype,
          'teamName': wkteam
        });
        arrayForm.push(group);
      }
    }
    this.fs.addArrayFormGames(arrayForm);
    //var list = this.fs.getArrayFromGames();
    //console.log(' list returned '+ list.controls['gameMethod']['controls']);
    console.log(' list arrayForm '+ arrayForm.length);

    this.weekForm.reset();
    this.createForm();
    this.router.navigate(['../showgames'], {relativeTo: this.route});
  }

}
