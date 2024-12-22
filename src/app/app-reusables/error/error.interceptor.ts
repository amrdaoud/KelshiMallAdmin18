import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ErrorService } from './error.service';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.toLowerCase().includes('extendmembership')) {
    return next(req);
  }
  return next(req).pipe(
    catchError((error) => {
        if(error.status === 0) {
          inject(ErrorService).open(error.status, 'Please check your connection!');
        }
        else if(error.status === 401 || error.status === 403) {
          //this.errorService.open(error.status, 'Your are not authorized to perform this action!');
          inject(ErrorService).open(error.status, 'You are not authorized to perform this action!');
        }
        else if(error.status === 500) {
          inject(ErrorService).open(error.status, 'Something went wrong please report the error to developers!');
        }
        else if(error && error.error && error.error.message) {
          // const m = this.languageService.currentLanguage === 'ar' && error.error.messageArabic ? error.error.messageArabic : error.error.message;
          const m = error.error.message;
          inject(ErrorService).open(error.status, m);
        } else if(error && error.message) {
          inject(ErrorService).open(error.status, error.message);
        } else {
          inject(ErrorService).open(error.status, JSON.stringify(error));
        }
      throw error;

    })
  )
};
