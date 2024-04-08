import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    SidebarComponent
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
      <span>DoConnect</span>
      <span class="spacer"></span>
      <!-- User profile or login/signup -->
      @if (isUserLoggedIn) {
        <button mat-icon-button>
          <mat-icon>account_circle</mat-icon>
          <span>Profile</span>
        </button>
      } @else {
        <button mat-icon-button>
          <mat-icon>login</mat-icon>
          <span>Login</span>
        </button>
        <button mat-icon-button>
          <mat-icon>person_add</mat-icon>
          <span>Sign Up</span>
        </button>
      }
    </mat-toolbar>
    <!-- Sidebar -->
    <!-- <app-sidebar [isSidebarOpen]="isSidebarOpen"]></app-sidebar> -->
  `,
  styles: ``
})
export class HeaderComponent {
  isUserLoggedIn = false;
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
