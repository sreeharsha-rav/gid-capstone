import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  template: `
    <div class="hero-section">
      <div class="hero-title">
        <h1>404 Page Not Found</h1>
      </div>
      <div class="hero-text">
        <p>The page you are looking for does not exist. Please check the URL or go back to the homepage.</p>
      </div>
    </div>
  `,
  styles: `
  .hero-section {
    background-color: #f0f0f0;
    padding: 20px;
    margin: 20px;
    border-radius: 5px;
  }
  .hero-title {
    text-align: center;
  }
  .hero-text {
    text-align: center;
  }
  `
})
/*
 * Page Not Found Component - this component is used to display a 404 page not found message
 */
export class PageNotFoundComponent {

}
