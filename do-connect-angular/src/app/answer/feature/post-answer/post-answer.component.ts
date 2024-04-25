import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AnswerService } from '../../data-access/answer.service';
import { AnswerRequest } from '../../data-access/answer-request.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../../login_signup/service/storage.service';

@Component({
  selector: 'app-post-answer',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  template: `
  <div class="post-answer">
    <mat-card>
      <mat-card-header>
        <mat-card-title>Your Answer</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-form-field appearance="outline">
          <textarea matInput placeholder="Enter your answer" [formControl]="answerText"></textarea>
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions>
        <button mat-mini-fab color="accent">
          <mat-icon>attach_file</mat-icon>
        </button>
        <button mat-flat-button color="primary" (click)="onSubmit()">Submit</button>
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
/*
 * Post Answer Component - this component is used to post an answer to a question
 * currentQuestion: any - the current question being answered
 * answerText: FormControl - form control for the answer text
 * answerService: AnswerService - service to handle all CRUD operations for answers
 * matSnackBar: MatSnackBar - snack bar service to display messages
 * getCurrentUserId() - retrieves the current user's ID
 * getCurrentQuestionId() - retrieves the current question's ID
 * onSubmit() - submits the answer
 */
export class PostAnswerComponent {
  @Input() currentQuestion: any;

  answerText = new FormControl('');

  private answerService = inject(AnswerService);

  constructor( private matSnackBar: MatSnackBar) {}

  getCurrentUserId() {
    return StorageService.getUserId();
  }

  getCurrentQuestionId() {
    if (this.currentQuestion) {
      return this.currentQuestion.id;
    }
  }

  onSubmit() {
    if (this.answerText.invalid) {
      this.matSnackBar.open('Please enter an answer', 'Dismiss', {
        duration: 2000,
      });
    } else {
      const userId = this.getCurrentUserId();
      const questionId = this.getCurrentQuestionId();
      // check if the user and question are valid
      if (userId && questionId) {
        const answerRequest: AnswerRequest = {
          answer: this.answerText.value!,
          userId: userId,
          questionId: questionId
        };
        // make the API call to add the answer
        this.answerService.addAnswer(answerRequest).subscribe({
          next: (res) => {
            if (res) {
              // Display a success message
              this.matSnackBar.open('Answer posted successfully', 'Close', {
                duration: 2000
              });
              this.answerText.reset();
            } else {
              this.matSnackBar.open('Failed to post answer', 'Close', {
                duration: 2000
              });
            }
          }
        });
      } else {
        this.matSnackBar.open('Invalid user or question', 'Close', {
          duration: 2000
        });
      }
    }
  }
}
