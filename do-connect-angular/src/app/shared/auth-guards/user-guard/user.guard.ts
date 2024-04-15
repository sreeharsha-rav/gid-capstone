import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { StorageService } from "../../../login_signup/service/storage.service";

@Injectable({
  providedIn: 'root'
})
/*
 * UserGuard - this guard is used to prevent a user from accessing pages that require authentication if they are not logged in
 * canActivate() - checks if the user is logged in and redirects them to the login page if they are not
 */
export class UserGuard {

  private router = inject(Router);

  constructor(private snackBar: MatSnackBar) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // If the token is not present, the user is not logged in, so redirect to the login page.
    const token = StorageService.getToken();
    if (token === null) {
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
