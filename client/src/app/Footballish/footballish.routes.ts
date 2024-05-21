import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FootballishComponent } from './Footballish.component';
import { FootballScheduleComponent } from './football-schedule/football-schedule.component';
import { ShowscheduleDetailComponent } from './football-showschedule/showschedule-detail/showschedule-detail.component';
import { PicksStartComponent } from './football-picks/picks-start/picks-start.component';
import { PickedGamesComponent } from './football-picks/picked-games/picked-games.component';

export const footballishRoutes: Routes = [
  {
    path: '',
    component: FootballishComponent,
    children: [
      { path: '', component: FootballishComponent },
      { path: 'schedule', component: FootballScheduleComponent },
      { path: 'showschedule/:id', component: ShowscheduleDetailComponent },

      {
        path: 'pickteams',
        component: FootballishComponent,
        children: [
          { path: '', component: PicksStartComponent },
          { path: 'pickedgames', component: PickedGamesComponent },
          { path: ':id', component: PicksStartComponent },
        ],
      },
      { path: 'actualschedule', component: FootballScheduleComponent },
      { path: 'showschedule', component: FootballScheduleComponent },
      // { path: 'showschedule/:id', component: ShowscheduleDetailComponent}
      // { path: 'actualschedule', component: FootballActualComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(footballishRoutes)],
  exports: [RouterModule],
})
export class FootballishRoutingModule {}
