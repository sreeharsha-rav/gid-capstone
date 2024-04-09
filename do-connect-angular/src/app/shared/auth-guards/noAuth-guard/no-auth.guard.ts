import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  private router = inject(Router);

  constructor() { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // If the token is present, the user is already logged in, so redirect to the home page.
    if (localStorage.getItem('token')) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

}