import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FootballService } from 'src/app/Footballish/football.service';
import { PickteamsComponent } from '../pickteams.component';

@Component({
  selector: 'app-showgamespicked',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, PickteamsComponent],
  templateUrl: './showgamespicked.component.html',
  styleUrl: './showgamespicked.component.css',
  providers: [FootballService, DatePipe],
})
export class ShowgamespickedComponent implements OnInit {
  gameForm: FormGroup;
  arrayForm = this.formBuilder.array([]);
  arrayForm1;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private fs: FootballService) {
    this.arrayForm1 = this.fs.getArrayFromGames();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.gameForm = this.formBuilder.group({
      arrayGame: this.initGameFormArray()
    });
  }

  initGameFormArray() {
    const arrayForm2 = this.formBuilder.array([]);
    const ctrl = this.arrayForm1.controls[0] as FormArray;
    if (ctrl === undefined) {
      this.submitted = true;
    } else {
      console.log('test has ')
      for (let i = 0; i < 8; i++) {
        const group: any = this.initModelFormGroup();
        const wkctrl = ctrl['controls'][i].get('week').value;
        const typectrl = ctrl['controls'][i].get('type').value;
        const teamNoCtrl = ctrl['controls'][i].get('teamNo').value;
        const teamNameCtrl = ctrl['controls'][i].get('teamName').value;
        group.patchValue({
          week: wkctrl,
          type: typectrl,
          teamNo: teamNoCtrl,
          teamName: teamNameCtrl,
        });
        arrayForm2.push(group);
      }
      return arrayForm2;
    }
    return arrayForm2;
  }
  initModelFormGroup() {
    var model = this.formBuilder.group({
      week: new FormControl(null), // 0,
      type: new FormControl(null), // '',
      teamNo: new FormControl(null), // '',
      teamName: new FormControl(null), // ''
    });
    return model;
  }

  get arrayGame(): FormArray {
    return this.arrayGame.get('arrayGame') as FormArray;
  }
}
