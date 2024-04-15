import { Component, EventEmitter, inject, Output } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../login_signup/service/storage.service';
import { AuthLoginService } from '../../login_signup/service/auth-login.service';
import { User } from '../../login_signup/model/User.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    SidebarComponent,
    RouterLink
  ],
  template: `
    <!-- Header -->
    <mat-toolbar>
      <button mat-icon-button id="sidebarToggle" (click)="toggleSidebar()">
        @if (isSidebarOpen) {
          <mat-icon>close</mat-icon>
        } @else {
          <mat-icon>menu</mat-icon>
        }
      </button>
      <!-- Title -->
      <span class="title">DoConnect</span>
      <span class="spacer"></span>
      <!-- User profile or login/signup -->
      @if (!isUserLoggedIn) {
        <button mat-stroked-button color="primary" routerLink="/login">
          <span>Login</span>
        </button>
        <button mat-flat-button color="primary" routerLink="/signup">
          <span>Sign Up</span>
        </button>
      }
      @if (isUserLoggedIn) {
        <button mat-icon-button>
          <mat-icon>account_circle</mat-icon>
        </button>
        <button mat-stroked-button color="warn" (click)="logout()">
          <span>Logout</span>
        </button>
      }
    </mat-toolbar>
    <!-- Sidebar -->
    <app-sidebar [isSidebarOpen]="isSidebarOpen" [isUserLoggedIn]="isUserLoggedIn"></app-sidebar>
  `,
  styles: `
    mat-toolbar {
      background-color: #FEFEFE;
      border-bottom: 1px solid #ddd;
      color: #333;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 5;
    }
    button {
      margin-right: 10px;
    }
    .title {
      font-size: 1.2em;
    }
    .spacer {
      flex: 1 1 auto;
    }
  `
})
/*
 * Header Component - this component is used to display the header of the application
 * isUserLoggedIn: boolean - flag to check if the user is logged in
 * isSidebarOpen: boolean - flag to check if the sidebar is open
 * userSubject: Subscription - subscription to the user
 * authLogin: AuthLoginService - service to handle all login and logout operations
 * toggleSidebar() - toggles the sidebar
 * logout() - logs out the user
 * ngOnDestroy() - lifecycle hook that is called when the component is destroyed
 */
export class HeaderComponent {
  isUserLoggedIn = false;
  isSidebarOpen = false;

  private userSubject: Subscription = new Subscription();
  private authLogin: AuthLoginService = inject(AuthLoginService);

  constructor(private router: Router) {}

  ngOnInit() {
    // ALTERNATIVE IMPLEMENTATION for isUserLoggedIn
    // this.userSubject = this.authLogin.user.subscribe((user: User) => {
    //   this.isUserLoggedIn = user ? true : false;
    // });
    this.isUserLoggedIn = StorageService.isUserLoggedIn();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.authLogin.logoutUser();
    this.isUserLoggedIn = false;
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.userSubject.unsubscribe();
  }

}
