import { ApplicationConfig, DEFAULT_CURRENCY_CODE, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { jwtInterceptor } from './app-reusables/account/interceptors/jwt.interceptor';
import { errorInterceptor } from './app-reusables/error/error.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { initializeApp } from "firebase/app";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
initializeApp(environment.firebase);
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideAnimations(),
              importProvidersFrom(MatDialogModule),
              importProvidersFrom(MatNativeDateModule),
              provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor])),
              importProvidersFrom(MatSnackBarModule),
              {provide: DEFAULT_CURRENCY_CODE, useValue: 'SYP'},
              {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
            ]
};
