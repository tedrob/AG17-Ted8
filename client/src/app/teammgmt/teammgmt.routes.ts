import { NgModule } from '@angular/core';
import { TeammgmtComponent } from './teammgmt.component';
import { ManageteamsComponent } from './manageteams/manageteams.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PickteamsComponent } from './pickteams/pickteams.component';
import { ShowgamespickedComponent } from './pickteams/showgamespicked/showgamespicked.component';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../_guards/auth.guard';

export const teammgmtRoutes: Routes = [
  {
    path: 'teammgmt',
    title: 'teammgmt',
    component: TeammgmtComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'manageteams',
        title: 'manageteams',
        component: ManageteamsComponent,
        pathMatch: 'full',
      },
      {
        path: 'schedule',
        title: 'schedule',
        component: ScheduleComponent,
        pathMatch: 'full',
      },
      {
        path: 'pickteams',
        title: 'pickteams',
        component: PickteamsComponent,
        pathMatch: 'full',
      },
      {
        path: 'showgames',
        title: 'showgames',
        component: ShowgamespickedComponent,
        pathMatch: 'full',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(teammgmtRoutes)],
  exports: [RouterModule],
})
export class TeammgmtRoutingModule {}
