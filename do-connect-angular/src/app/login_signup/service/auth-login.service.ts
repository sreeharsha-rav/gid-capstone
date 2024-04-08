import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { throwError, catchError, Observable, tap, map } from 'rxjs';

const LOGIN_URL = 'http://localhost:8080/authenticate';
export const AUTH_HEADER = "authorization";

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  loginUser(loginRequest: any): Observable<any> {
    return this.http.post(LOGIN_URL, loginRequest, 
      { observe: 'response' }
    ).pipe(
        tap(__ => this.log("User Authentication")),
        map((res: HttpResponse<any>) => {
          this.storageService.saveUser(res.body);
          const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7);
          this.storageService.saveToken(bearerToken ?? ''); // Fix: Add nullish coalescing operator
          return res;
        }),
        catchError(this.handleError)
    );
  }

  log(message: string) {
    console.log(`AuthLoginService: ${message}`);
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }

}
