import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-post-answer',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  template: `
  <div class="post-answer">
    <mat-card>
      <mat-card-header>
        <mat-card-title>Your Answer</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-form-field appearance="outline">
          <textarea matInput placeholder="Enter your answer"></textarea>
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions>
        <button mat-mini-fab color="accent">
          <mat-icon>attach_file</mat-icon>
        </button>
        <button mat-flat-button color="primary">Submit</button>
      </mat-card-actions>
    </mat-card>
  </div>
  `,
  styles: `
  .post-answer {
    display: flex;
    justify-content: center;
    margin: 20px;
  }
  mat-card {
    width: 100%;
    padding: 10px;
  }
  mat-form-field {
    width: 100%;
    margin-top: 10px;
  }
  textarea {
    width: 100%;
    height: 100px;
  }
  mat-card-actions {
    display: flex;
    justify-content: flex-end;
  }
  button {
    margin-right: 20px;
    display: flex;
  }
  `
})
export class PostAnswerComponent {

}
