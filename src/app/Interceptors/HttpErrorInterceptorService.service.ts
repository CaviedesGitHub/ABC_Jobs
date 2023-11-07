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
          let errorMessage = '';
          let errorType = '';
          let miError: any;
          miError=httpErrorResponse.error
          console.log("Interceptor")
          console.log(httpErrorResponse.error)
          console.log("Despues de error")
          console.log(httpErrorResponse.error.mensaje)
          console.log("Despues de error.mensaje")
          console.log(httpErrorResponse.error.error)
          console.log(httpErrorResponse.error.message)
          console.log(httpErrorResponse.status)
          console.log(httpErrorResponse.statusText)
          console.log(httpErrorResponse.message)
          console.log(httpErrorResponse.type)
          console.log(httpErrorResponse.name)
          console.log(httpErrorResponse.url)
          console.log(httpErrorResponse.ok)
          console.log(httpErrorResponse.headers)
          console.log("Interceptor Fin")
          //this.toastrService.error(httpErrorResponse.message, String(httpErrorResponse.status), { closeButton: true });

          errorMessage = miError.mensaje
          if (httpErrorResponse.error instanceof ErrorEvent) {
            errorType = "Client side error"
            errorMessage = miError.mensaje //httpErrorResponse.error.mensaje
          } 
          else {
            errorType = "Server side error"
            if (httpErrorResponse.status === 0) {
              errorMessage = "No hay conexión con el servidor"+httpErrorResponse.message;
            } 
            else if (httpErrorResponse.status >= 500){
              if (miError.mensaje){
                errorMessage = miError.mensaje
              }
              else if (miError.error) {
                errorMessage = miError.error
              }
              else {
                errorMessage = "Error del Lado del Servidor"
              }
            }
            else if (httpErrorResponse.status >= 400){
              if (miError.mensaje){
                errorMessage = miError.mensaje
              }
              else if (miError.error) {
                errorMessage = miError.error
              }
              else {
                errorMessage = "Error del Lado del cliente"
              }
            }
            else {
              errorMessage = `${httpErrorResponse.status}: ${httpErrorResponse.error.error}`;
            }
            this.toastrService.error(errorMessage, errorType, { closeButton: true });
          }
          return throwError(()=> new Error(errorMessage));
        })
      )
  }
}
 