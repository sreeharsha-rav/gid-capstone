import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, catchError, Observable } from 'rxjs';

const SIGNUP_URL = 'http://localhost:8080/signup';

@Injectable({
  providedIn: 'root'
})
/*
 * The AuthSignupService class is used to sign up a user by sending a POST request to the server with the signup credentials.
 * The signupUser() method sends a POST request to the server with the signup credentials.
 * The handleError() method logs the error message to the console and returns an error message.
 */
export class AuthSignupService {

  http: HttpClient = inject(HttpClient);

  constructor() { }

  // signupUser() method sends a POST request to the server with the signup credentials.
  signupUser(signupRequest: any): Observable<any> {
    return this.http.post(SIGNUP_URL, signupRequest).pipe(
      catchError(this.handleError)
    );
  }

  // handleError() method logs the error message to the console and returns an error message.
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
