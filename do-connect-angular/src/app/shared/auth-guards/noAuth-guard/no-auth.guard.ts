import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
/*
 * NoAuthGuard - this guard is used to prevent a user from accessing the login/signup page if they are already logged in
 * canActivate() - checks if the user is already logged in and redirects them to the questions page
*/
export class NoAuthGuard {

  private router = inject(Router);

  constructor() { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // If the token is present, the user is already logged in, so redirect to the questions page.
    if (localStorage.getItem('token')) {
      this.router.navigate(['/questions']);
      return false;
    }
    return true;
  }

}