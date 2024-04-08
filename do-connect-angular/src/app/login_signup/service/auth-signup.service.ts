import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, catchError, Observable } from 'rxjs';

const SIGNUP_URL = 'http://localhost:8080/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthSignupService {

  constructor(private http: HttpClient) { }

  signupUser(signupRequest: any): Observable<any> {
    return this.http.post(SIGNUP_URL, signupRequest).pipe(
      catchError(this.handleError)
    );
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
