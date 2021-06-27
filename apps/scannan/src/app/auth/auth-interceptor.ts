import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getToken();
    req = this.addContentTypeJson(req);
    if (accessToken) {
      req = this.addAccessToken(req, accessToken)
    }
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return;
        } else {
          return throwError(error);
        }
      })
    );
  }

  addContentTypeJson(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      },
    });
  }

  addAccessToken(request: HttpRequest<any>, accessToken: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
