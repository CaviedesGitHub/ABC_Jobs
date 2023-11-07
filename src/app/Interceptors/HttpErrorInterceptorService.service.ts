import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
 } from '@angular/common/http';
 import { Observable, throwError } from 'rxjs';
 import { catchError } from 'rxjs/operators';
 import { ToastrService } from 'ngx-toastr';
 import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptorServiceService extends HttpErrorResponse {
  constructor(private toastrService: ToastrService) { super(toastrService) }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
          let errorMesagge = '';
          let errorType = '';
          console.log(httpErrorResponse.error)
          console.log(httpErrorResponse.error.error)
          console.log(httpErrorResponse.status)
          console.log(httpErrorResponse.statusText)
          console.log(httpErrorResponse.message)
          console.log(httpErrorResponse.type)
          console.log(httpErrorResponse.name)
          console.log(httpErrorResponse.url)
          console.log(httpErrorResponse.ok)
          console.log(httpErrorResponse.headers)
          this.toastrService.error(httpErrorResponse.message, String(httpErrorResponse.status), { closeButton: true });

          if (httpErrorResponse.error instanceof ErrorEvent) {
            errorType = "Client side error"
            errorMesagge = httpErrorResponse.error.error;
          } else {
            errorType = "Server side error"
            if (httpErrorResponse.status === 0) {
              errorMesagge = "No hay conexión con el servidorXXX"+httpErrorResponse.message;
            } else {
              errorMesagge = `${httpErrorResponse.status}: ${httpErrorResponse.error.error}`;
            }
            this.toastrService.error(errorMesagge, errorType, { closeButton: true });
          }
          return throwError(()=> new Error(errorMesagge));
        })
      )
  }
}
 