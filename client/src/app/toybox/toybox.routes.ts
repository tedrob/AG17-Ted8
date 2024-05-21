import { RouterModule, Routes } from '@angular/router';
import { ToyboxComponent } from './toybox.component';
import { authGuard } from '../_guards/auth.guard';
import { NgModule } from '@angular/core';
import { FibonacciComponent } from './fibonacci/fibonacci.component';
import { SimpleinterestComponent } from './simpleinterest/simpleinterest.component';
import { PalindromeComponent } from './palindrome/palindrome.component';
import { GamespartComponent } from './gamespart/gamespart.component';

export const toyboxRoutes: Routes = [
  {
    path: 'toybox',
    title: 'toybox',
    component: ToyboxComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'fibonacci',
        title: 'fibonacci',
        component: FibonacciComponent,
        pathMatch: 'full',
      },
      {
        path: 'simpleinterest',
        title: 'simpleinterest',
        component: SimpleinterestComponent,
        pathMatch: 'full',
      },
      {
        path: 'palindrome',
        title: 'palindrome',
        component: PalindromeComponent,
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
];
@NgModule({
  imports: [RouterModule.forChild(toyboxRoutes)],
  exports: [RouterModule],
})
export class ToyboxRoutingModule {}
