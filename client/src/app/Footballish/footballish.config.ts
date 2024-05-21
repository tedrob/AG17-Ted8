import { ApplicationConfig } from "@angular/core";
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading, withViewTransitions } from "@angular/router";
import { footballishRoutes } from "./footballish.routes";

export const footballishConfig: ApplicationConfig = {
  providers: [
    provideRouter(
       footballishRoutes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withViewTransitions()
    ),
  ]
}
