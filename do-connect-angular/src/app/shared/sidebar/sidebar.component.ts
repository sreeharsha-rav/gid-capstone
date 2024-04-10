import { Component, Input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterLink } from '@angular/router';
import { StorageService } from '../../login_signup/service/storage.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink
  ],
  template: `
    <!-- Sidebar -->
    <mat-sidenav-container class="sidenav-container">
    <mat-sidenav mode="side" [opened]="isSidebarOpen">
      <br>
      <!-- Navigation links -->
      <div class="nav-links">
        @if (isUserLoggedIn === false) {
          <button mat-button routerLink="/home">Home</button>
        }

        @if (isUserLoggedIn === true) {
          <button mat-button routerLink="/questions">Questions</button>
          <button mat-button routerLink="/topics">Topics</button>
          <button mat-button routerLink="/messages">Messages</button>
        }
      </div>
      <br>
      <mat-divider></mat-divider>
      <br>
    </mat-sidenav>
    <mat-sidenav-content>
      <router-outlet></router-outlet>
    </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: 
  `
    .sidenav-container {
      margin-top: 60px;
      height: calc(100vh - 60px);
      position: relative;
    }
    mat-sidenav {
      padding: 10px;
      width: auto;
    }
    .nav-links {
      display: flex;
      flex-direction: column;
    }
    button {
      margin-bottom: 10px;
    }

  `
})
export class SidebarComponent {
  @Input() isSidebarOpen = false;
  @Input() isUserLoggedIn = false;

}
