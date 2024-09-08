import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { RefreshTokenService } from '../services/refresh-token.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.toLowerCase().endsWith('/login') || req.url.toLowerCase().endsWith('/refresh-token')|| req.url.toLowerCase().includes('customer-bill')) {
    return next(req);
  }
  return inject(RefreshTokenService).handleRequest(req, next);
};
