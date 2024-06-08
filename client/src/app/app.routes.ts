import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { NgModule } from '@angular/core';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { PlayerComponent } from './player/player.component';
import { PlayerEditComponent } from './player/player-edit/player-edit.component';
import { playerRoutes } from './player/player.routes';
import { PlayerStartComponent } from './player/player-start/player-start.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';
import { ToyboxComponent } from './toybox/toybox.component';
import { TeammgmtComponent } from './teammgmt/teammgmt.component';
import { AboutComponent } from './about/about.component';
import { toyboxRoutes } from './toybox/toybox.routes';
import { FibonacciComponent } from './toybox/fibonacci/fibonacci.component';
import { ScheduleComponent } from './teammgmt/schedule/schedule.component';
import { PickteamsComponent } from './teammgmt/pickteams/pickteams.component';
import { ManageteamsComponent } from './teammgmt/manageteams/manageteams.component';
import { teammgmtRoutes } from './teammgmt/teammgmt.routes';
import { PalindromeComponent } from './toybox/palindrome/palindrome.component';
import { SimpleinterestComponent } from './toybox/simpleinterest/simpleinterest.component';
import { GamespartComponent } from './toybox/gamespart/gamespart.component';
import { ShowgamespickedComponent } from './teammgmt/pickteams/showgamespicked/showgamespicked.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', redirectTo: './', pathMatch: 'full' },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'about', title: 'about', component: AboutComponent },
      { path: 'members', title: 'members', component: MemberListComponent },
      { path: 'members/:username', component: MemberDetailComponent },
      {
        path: 'member/edit',
        title: 'edit',
        component: MemberEditComponent,
        canDeactivate: [preventUnsavedChangesGuard],
      },
      { path: 'lists', title: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
      //{ path: 'player', loadChildren: () => PlayersRoutingModule },
      { path: 'player/new', component: PlayerEditComponent, pathMatch: 'full' },
      {
        path: 'player/edit',
        component: PlayerEditComponent,
        pathMatch: 'full',
      },
      {
        path: 'player/:id',
        component: PlayerDetailComponent,
        pathMatch: 'full',
      },
      {
        path: 'toybox',
        title: 'Toybox',
        component: ToyboxComponent,
        children: [
          {
            path: 'fibonacci',
            title: 'fibonacci',
            component: FibonacciComponent,
            pathMatch: 'full',
          },
          {
            path: 'palindrome',
            title: 'palindrome',
            component: PalindromeComponent,
            pathMatch: 'full',
          },
          {
            path: 'simpleinterest',
            title: 'simpleinterest',
            component: SimpleinterestComponent,
            pathMatch: 'full',
          },
          {
            path: 'gamespart',
            title: 'gamespart',
            component: GamespartComponent,
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'teammgmt',
        title: 'TeamMgmt',
        component: TeammgmtComponent,
        children: [
          {
            path: 'manageteams',
            title: 'manageteams',
            component: ManageteamsComponent,
            pathMatch: 'full',
          },
          {
            path: 'schedule',
            title: 'scheduled',
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
    ],
  },
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
      { path: 'new', component: PlayerEditComponent, pathMatch: 'full' },
      {
        path: 'player/edit',
        component: PlayerEditComponent,
        pathMatch: 'full',
      },
      {
        path: 'player/:id',
        component: PlayerDetailComponent,
        pathMatch: 'full',
      },
    ],
  },
  { path: 'errors', title: 'Errors', component: TestErrorComponent },
  { path: 'not-found', title: 'Not-found', component: NotFoundComponent },
  {
    path: 'server-error',
    title: 'Server-error',
    component: ServerErrorComponent,
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    RouterModule.forChild(playerRoutes),
    RouterModule.forChild(teammgmtRoutes),
    RouterModule.forChild(toyboxRoutes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
