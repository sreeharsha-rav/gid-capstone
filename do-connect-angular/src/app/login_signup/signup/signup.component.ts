import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthSignupService } from '../service/auth-signup.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="signup-container">
      <mat-card class="signup-card">
        <mat-card-header>
          <h2>Sign Up</h2>
        </mat-card-header>
        <br>
        <mat-card-content>
          <form [formGroup]="signupForm">
            <mat-form-field appearance="outline">
              <mat-label>Name</mat-label>
              <input matInput placeholder="Enter your name" name="name" type="name" required formControlName="name">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput placeholder="Enter your email" name="email" type="email" required formControlName="email">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput placeholder="Enter your password" name="password" type="password" required formControlName="password">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Confirm Password</mat-label>
              <input matInput placeholder="Confirm your password" name="confirmPassword" type="password" required formControlName="confirmPassword">
            </mat-form-field>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="registerNewUser()" [disabled]="signupForm.invalid">Sign Up</button>
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
 * The SignupComponent class is used to create a new user account by sending a POST request to the server with the signup credentials.
 * signupForm: FormGroup - form to sign up a user
 * constructor() - initialize the component
 * ngOnInit() - initialize the component
 * confirmationValidator() - validate the password and confirm password fields
 * registerNewUser() - sign up a user
 */
export class SignupComponent {

  signupForm: FormGroup = this.formBuilder.group({});

  private authSignupService: AuthSignupService = inject(AuthSignupService);

  constructor(
  private formBuilder: FormBuilder,
  private snackBar: MatSnackBar,
  private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.confirmationValidator
    });
  }

  private confirmationValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true});
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  registerNewUser() {
    this.authSignupService.signupUser(this.signupForm.value).subscribe({
      next: response => {
        if (response.id !== null) {
          this.snackBar.open('User registered successfully', 'Close', {
            duration: 2000
          });
          this.router.navigate(['/login']);
        }
      },
      error: error => {
        console.error("There was an error during the signup process: ", error);
        this.snackBar.open('Registration failed, please try again', 'Close', {
          duration: 2000
        });
      }
    });
  }

}
