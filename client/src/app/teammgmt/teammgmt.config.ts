import { ApplicationConfig } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions,
} from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { loadingInterceptor } from '../_interceptors/loading.interceptor';
import { JwtInterceptor } from '../_interceptors/jwt.interceptor';
import { teammgmtRoutes } from './teammgmt.routes';
import { errorInterceptor } from '../_interceptors/error.interceptor';


export const teammgmtConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      teammgmtRoutes,
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
