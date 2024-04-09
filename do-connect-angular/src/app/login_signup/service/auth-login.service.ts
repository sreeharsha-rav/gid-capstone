import { inject, Injectable } from '@angular/core';
//import { StorageService } from './storage.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { throwError, catchError, Observable, tap, map, Subject } from 'rxjs';
import { User } from '../model/User.model';

const LOGIN_URL = 'http://localhost:8080/authenticate';
export const AUTH_HEADER = "authorization";

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  http: HttpClient = inject(HttpClient);
  user = new Subject<User>();

  constructor(
    //private storageService: StorageService
  ) { }

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
  }

  log(message: string) {
    console.log(`AuthLoginService: ${message}`);
  }

  private handleCreateUser(res: HttpResponse<any>) {
    const userId = res.body.userId;
    const userName = res.body.name;
    const bearerToken = res.headers.get(AUTH_HEADER);
    const tokenSubstring = bearerToken ? bearerToken.substring(7) : '';
    const user = new User(userId, userName, tokenSubstring);
    this.user.next(user);
    // this.storageService.saveUser({ userId, userName });
    // this.storageService.saveToken(bearerToken ?? '');
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
