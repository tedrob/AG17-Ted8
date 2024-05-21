import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerStartComponent } from './player-start/player-start.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayerComponent } from './player.component';
import { authGuard } from '../_guards/auth.guard';

export const playerRoutes: Routes = [
  {
    path: 'player',
    component: PlayerComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'start',
        component: PlayerStartComponent,
        pathMatch: 'full',
      },
      {
        path: 'player/new',
        title: 'new',
        component: PlayerEditComponent,
        pathMatch: 'full',
      },
      {
        path: 'player/:id',
        title: 'id',
        component: PlayerDetailComponent,
        pathMatch: 'full',
      },
      {
        path: 'player/:id/edit',
        title: 'edit',
        component: PlayerEditComponent,
        pathMatch: 'full',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(playerRoutes)],
  exports: [RouterModule],
})
export class PlayersRoutingModule {}
