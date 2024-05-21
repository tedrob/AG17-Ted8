import { ApplicationConfig } from "@angular/core";
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading, withViewTransitions } from "@angular/router";

import { playerRoutes} from './player.routes';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { PlayersService } from "../_services/player.service";
import { provideToastr } from "ngx-toastr";
import { provideAnimations } from "@angular/platform-browser/animations";
import { errorInterceptor } from "../_interceptors/error.interceptor";
import { JwtInterceptor } from "../_interceptors/jwt.interceptor";
import { loadingInterceptor } from "../_interceptors/loading.interceptor";
import { NgbDropdown } from "@ng-bootstrap/ng-bootstrap";

export const playerConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      playerRoutes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({scrollPositionRestoration: 'enabled'}),
      withViewTransitions()),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideHttpClient(withInterceptors([JwtInterceptor])),
    provideHttpClient(withInterceptors([loadingInterceptor]),),
    [PlayersService],
    NgbDropdown,
    provideAnimations(),
    provideToastr(),
  ],
};
