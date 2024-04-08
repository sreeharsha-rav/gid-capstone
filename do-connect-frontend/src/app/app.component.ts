import { Component } from '@angular/core';
import { HeaderComponent } from './shared/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  template: `
    <app-header></app-header>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'do-connect-frontend';
}
