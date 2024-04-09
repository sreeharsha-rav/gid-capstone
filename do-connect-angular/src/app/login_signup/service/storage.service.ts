import { Injectable } from '@angular/core';

const TOKEN = 'c_token';
const USER = 'c_user';

/*
* StorageService is a service class that provides methods to store and retrieve user information and token in local storage.
* The saveUser() method saves the user information in local storage.
* The saveToken() method saves the token in local storage.
* The getToken() method retrieves the token from local storage.
* The isUserLoggedIn() method checks if the user is logged in.
* The logoutUser() method removes the token and user information from local storage.
*/
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveUser(user: any) {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  public saveToken(token: string) {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    }
  }

  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(TOKEN) || null;
    } 
    return null;
  }

  static isUserLoggedIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    return true;
  }

  static logoutUser() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }

}
