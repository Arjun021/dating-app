import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import {Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterService implements HttpInterceptor{

  constructor(
    private commonservice: CommonService,

  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((result) => {
        return result;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        let message = error.error.message ? error.error.message : error.message;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${message}`;
          return throwError(errorMsg);
        }
        switch (error.status) {
          case 400:
            /// Bad Request
            errorMsg = message;
            break;

          case 401:
            /// Not Authorized
            this.commonservice.showErrorToaster(`Error`, `${message}`);
            // return EMPTY; //we are handling for the login btn animation so hide this
            break;
          case 402:
            //ReAuthenticate User
          case 403:
            /// Access Denied
            this.commonservice.showErrorToaster(`Error`, `${message}`);
           break;

          case 500:
            /// Internal server error
            errorMsg = error.message;
            break;

          case 404:
            this.commonservice.showErrorToaster(`Error`, `${message}`);
            break;
        }
        return throwError(errorMsg);
      })
    );
  }

  addTokenHandler(request: HttpRequest<any>, token:string){
    return request.clone({headers:request.headers.set('Authorization', `Bearer ${token}`)})
  }
}
