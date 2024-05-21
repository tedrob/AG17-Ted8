import { ApplicationConfig } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions,
} from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from '../_interceptors/error.interceptor';
import { JwtInterceptor } from '../_interceptors/jwt.interceptor';
import { loadingInterceptor } from '../_interceptors/loading.interceptor';
import { toyboxRoutes } from './toybox.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const toyboxConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      toyboxRoutes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withViewTransitions()
    ),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideHttpClient(withInterceptors([JwtInterceptor])),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideAnimations(),
    provideToastr(),
  ],
};
