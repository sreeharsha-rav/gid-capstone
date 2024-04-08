import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../login_signup/service/storage.service';

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
      @if (isUserLoggedIn) {
        <button mat-icon-button>
          <mat-icon>account_circle</mat-icon>
        </button>
        <button mat-stroked-button color="warn">
          <span>Logout</span>
        </button>
      } @else {
        <button mat-stroked-button color="primary" routerLink="/login" (click)="logout()">
          <span>Login</span>
        </button>
        <button mat-flat-button color="primary" routerLink="/signup">
          <span>Sign Up</span>
        </button>
      }
    </mat-toolbar>
    <!-- Sidebar -->
    <app-sidebar [isSidebarOpen]="isSidebarOpen"></app-sidebar>
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
export class HeaderComponent {
  isUserLoggedIn: boolean = false;
  isSidebarOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateLoginStatus();
  }

  private updateLoginStatus() {
    this.isUserLoggedIn = StorageService.isUserLoggedIn();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    StorageService.logoutUser();
    this.updateLoginStatus();
    this.router.navigate(['/login']);
  }

}
