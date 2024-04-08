import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <div class="hero-section">
      <div class="hero-title">
        <h1>Welcome to DoConnect!</h1>
      </div>
      <div class="hero-text">
        <p>Your go-to Q&A platform for technical queries. Get expert answers and solutions in programming, software development, and more. Join the community, ask questions, and gain insights.</p>
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
export class HomeComponent {

}
