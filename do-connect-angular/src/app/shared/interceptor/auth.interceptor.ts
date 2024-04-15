import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { StorageService } from "../../login_signup/service/storage.service";

@Injectable()
/*
 * Auth Interceptor - this interceptor is used to add the JWT token to the HTTP requests
 */
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = StorageService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        });
        return next.handle(authRequest);
    }
    
}
