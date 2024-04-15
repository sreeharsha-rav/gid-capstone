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
        <p>Your go-to Q&A platform for technical queries.</p>
        <p>Get expert answers and solutions in programming, software development, and more.</p>
        <p>Join the community, ask questions, and gain insights.</p>
        <br>
        <p><b>Start by logging in or signing up!</b></p>
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
 * Home Component - this component is used to display the home page
 */
export class HomeComponent {

}
