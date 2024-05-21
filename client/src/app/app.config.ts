import { ApplicationConfig } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { playerRoutes } from './player/player.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { errorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { loadingInterceptor } from './_interceptors/loading.interceptor';
import { MembersService } from './_services/members.service';
import { PlayersService } from './_services/player.service';
import { teammgmtRoutes } from './teammgmt/teammgmt.routes';
import { toyboxRoutes } from './toybox/toybox.routes';
import { FootballService } from './Footballish/football.service';
import { footballishRoutes } from './Footballish/footballish.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withViewTransitions()
    ),
    provideRouter(
      playerRoutes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withViewTransitions()
    ),
    provideRouter(
      teammgmtRoutes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withViewTransitions()
    ),
    provideRouter(
      toyboxRoutes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withViewTransitions()
    ),
    provideRouter(
      footballishRoutes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withViewTransitions()
    ),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideHttpClient(withInterceptors([JwtInterceptor])),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    [MembersService],
    [PlayersService],
    [FootballService],
    NgbDropdown,
    provideAnimations(),
    provideToastr(),
  ],
};
