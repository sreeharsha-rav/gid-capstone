import { inject, Injectable } from '@angular/core';
//import { StorageService } from './storage.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { throwError, catchError, Observable, tap, map, Subject } from 'rxjs';
import { User } from '../model/User.model';
import { StorageService } from './storage.service';

const LOGIN_URL = 'http://localhost:8080/authenticate'; // URL to web api
export const AUTH_HEADER = "authorization"; // Authorization header key

@Injectable({
  providedIn: 'root'
})
/*
 * The AuthLoginService class is used to authenticate a user by sending a POST request to the server with the login credentials.
 * The loginUser() method sends a POST request to the server with the login credentials.
 * The logoutUser() method removes the token and user information user subject.
 * The log() method logs a message to the console.
 * The handleCreateUser() method extracts the user ID, user name, and bearer token from the response and creates a new User object.
 * The handleError() method logs the error message to the console and returns an error message.
 */
export class AuthLoginService {

  http: HttpClient = inject(HttpClient);
  user = new Subject<User>();
  private storageService = inject(StorageService);

  constructor() { }

  // loginUser() method sends a POST request to the server with the login credentials.
  loginUser(loginRequest: any): Observable<any> {
    return this.http.post(LOGIN_URL, loginRequest, 
      { observe: 'response' }
    ).pipe(
        catchError(this.handleError),
        tap(__ => this.log("User Authentication")),
        map((res: HttpResponse<any>) => {
          this.handleCreateUser(res);
        }),
    );
  }

  // logoutUser() method removes the token and user information user subject.
  logoutUser() {
    const user = new User(0, '', '');
    this.user.next(user);
    StorageService.removeUser();
  }

  // log() method logs a message to the console.
  log(message: string) {
    console.log(`AuthLoginService: ${message}`);
  }

  // handleCreateUser() method extracts the user ID, user name, and bearer token from the response and creates a new User object.
  private handleCreateUser(res: HttpResponse<any>) {
    const userId = res.body.userId;
    const userName = res.body.name;
    const bearerToken = res.headers.get(AUTH_HEADER);
    const tokenSubstring = bearerToken ? bearerToken.substring(7) : '';

    // Create a new user object
    const user = new User(userId, userName, tokenSubstring);
    this.user.next(user); // Push the user to the subject

    // Save the user and token to local storage
    this.storageService.saveUser(user);
    this.storageService.saveToken(tokenSubstring);
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
