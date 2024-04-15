import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthLoginService } from '../service/auth-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="signup-container">
      <mat-card class="signup-card">
        <mat-card-header>
          <h2>Log in</h2>
        </mat-card-header>
        <br>
        <mat-card-content>
          <form [formGroup]="loginForm">
            <mat-form-field appearance="outline">
              <mat-label>Name</mat-label>
              <input matInput placeholder="Name" type="name" name="name" required formControlName="name">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput placeholder="Password" name="password" type="password" required formControlName="password">
            </mat-form-field>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" [disabled]="loginForm.invalid" (click)="login()">Login</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: `
  .signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  h2 {
    width: 100%;
  }
  .signup-card {
    max-width: 400px;
    width: 90%;
    padding: 20px;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  button {
    width: 100%;
    margin: 20px;
  }
  `
})
/*
 * Login Component - this component is used to log in a user
 * loginForm: FormGroup - form to log in a user
 * constructor() - initialize the component
 * ngOnInit() - initialize the component
 * login() - log in a user
 */
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder, 
    private authLoginService: AuthLoginService, 
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

    ngOnInit() {
      this.loginForm = this.fb.group({
        name: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

    login() {
      this.authLoginService.loginUser(this.loginForm.value).subscribe(
        (response) => {
          this.snackBar.open('Login successful', 'Close', {
            duration: 2000
          });
          this.router.navigate(['/questions']);
        },
        (error) => {
          console.error(error);
          this.snackBar.open('Login failed', 'Close', {
            duration: 2000
          });
        }
      );
    }

}
