import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  private router = inject(Router);

  constructor(private snackBar: MatSnackBar) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // If the token is not present, the user is not logged in, so redirect to the login page.
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      this.snackBar.open(
        'You are not logged in, please login to access this page', 
        'Close', 
        {
          duration: 2000
        }
      );
      return false;
    }
    return true;
  }

}
