import { Injectable } from '@angular/core';

const TOKEN = 'c_token';
const USER = 'c_user';

/*
* StorageService is a service class that provides methods to store and retrieve user information and token in local storage.
* The saveUser() method saves the user information in local storage.
* The saveToken() method saves the token in local storage.
* The getToken() method retrieves the token from local storage.
* The isUserLoggedIn() method checks if the user is logged in.
* The removeUser() method removes the token and user information from local storage.
*/
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveUser(user: any) {
    localStorage.removeItem(USER);
    localStorage.setItem(USER, JSON.stringify(user));
  }

  public saveToken(token: string) {
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN, token);
  }

  static isUserLoggedIn(): boolean {
    if (localStorage && localStorage.getItem(USER) && localStorage.getItem(TOKEN)) {
      return true;
    }
    return false;
  }

  static getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  static getUserId(): any {
    const user = JSON.parse(localStorage.getItem(USER) || '{}');
    return user.id;
  }

  static removeUser() {
    localStorage.removeItem(USER);
    localStorage.removeItem(TOKEN);
  }

}
