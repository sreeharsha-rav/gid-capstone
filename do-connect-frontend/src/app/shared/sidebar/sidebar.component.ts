import { Component, Input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatDividerModule,
    RouterOutlet,
    RouterLink
  ],
  template: `
    <!-- Sidebar -->
    <mat-sidenav id="sidebar" #sidenav mode="side" [opened]="isSidebarOpen">
      <!-- Navigation links -->
      <div>
        <ul>
          <li>
            <a routerLink="/home" routerLinkActive="active">Home</a>
          </li>
          <li>
            <a routerLink="/about" routerLinkActive="active">About</a>
          </li>
          <li>
            <a routerLink="/contact" routerLinkActive="active">Contact</a>
          </li>
        </ul>
      </div>
      <mat-divider></mat-divider>
    </mat-sidenav>
  `,
  styles: ``
})
export class SidebarComponent {
  @Input() isSidebarOpen = false;

}
