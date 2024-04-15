import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 400:
          if (error.error.errors) {
            const modelStateErrors = [];
            for (const key in error.error.errors) {
              if (error.error.errors[key]) {
                modelStateErrors.push(error.error.errors[key]);
              }
            }
            toastr.error(modelStateErrors.flat().toString(), '', {
              positionClass: 'toast-bottom-right',
            });
          } else {
            toastr.error(error.error, error.status.toString(), {
              positionClass: 'toast-bottom-right',
            });
          }
          break;
        case 401:
          toastr.error('Unauthorised', error.status.toString(), {
            positionClass: 'toast-bottom-right',
          });
          break;
        case 404:
          router.navigateByUrl('/not-found');
          break;
        case 500:
          const navigationExtras: NavigationExtras = {
            state: { error: error.error },
          };
          router.navigateByUrl('/server-error', navigationExtras);
          break;
        default:
          toastr.error('Something unexpected went wrong', error.status.toString(), {
            positionClass: 'toast-bottom-right',
          });
          console.log(error);
          break;
      }
      //throw error;
      toastr.error('Something unexpected went wrong','',{positionClass: 'toast-bottom-right'});
      throw throwError(()=>error);
    })
  );
};
