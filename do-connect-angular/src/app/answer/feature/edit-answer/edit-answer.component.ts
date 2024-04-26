import { Component, Inject, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../../data-access/answer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDivider } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnswerRequest } from '../../data-access/answer-request.interface';

@Component({
  selector: 'app-edit-answer',
  standalone: true,
  imports: [
    MatDivider,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="edit-answer-dialog">
      <h2 mat-dialog-title>Edit Answer</h2>
      <mat-divider></mat-divider>
      <mat-dialog-content>
        <form [formGroup]="editForm">
          <mat-form-field appearance="outline">
            <mat-label>Answer</mat-label>
            <textarea matInput placeholder="Enter Answer" type="text" name="answer" formControlName="answer" required></textarea>
          </mat-form-field>
        </form>
        <mat-dialog-actions align="end">
          <button mat-stroked-button color="secondary" mat-dialog-close>Cancel</button>
          <button mat-raised-button color="primary" [disabled]="editForm.invalid" (click)="editAnswer()" mat-dialog-close>Update</button>
        </mat-dialog-actions>
      </mat-dialog-content>
    </div>
  `,
  styles: `
    .edit-answer-dialog {
      display: flex;
      flex-direction: column;
    }
    form {
      display: flex;
      flex-direction: column;
      min-width: 500px;
    }
    button {
      margin-left: 10px;
    }
  `
})
/*
 * EditAnswerComponent is a dialog component that allows users to edit an answer.
 * editForm: FormGroup - form group for the edit answer form
 * currentAnswer: any - current answer object
 * answerService: AnswerService - service to interact with the answer API
 * snackBar: MatSnackBar - service to show snack bar messages
 * data: any - data passed to the dialog
 * ngOnInit() - lifecycle hook that initializes the edit form
 * editAnswer() - method to edit the answer
 */
export class EditAnswerComponent {
  editForm: any;
  currentAnswer: any;

  private answerService = inject(AnswerService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      id: number,
      answer: string,
      datePosted: string,
      questionId: number,
      userId: number
    },
    private snackBar: MatSnackBar
  ) {
    // Initialize current answer
    this.currentAnswer = {
      id: data.id,
      answer: data.answer,
      datePosted: data.datePosted,
      questionId: data.questionId,
      userId: data.userId
    };
  }

  ngOnInit() {
    this.editForm = new FormGroup({
      answer: new FormControl(this.currentAnswer.answer)
    });
  }

  editAnswer() {
    // create an answer request object
    const id = this.data.id;
    const answerRequest: AnswerRequest = {
      answer: this.editForm.value.answer,
      questionId: this.currentAnswer.questionId,
      userId: this.currentAnswer.userId
    };
    // call the answer service to update the answer
    this.answerService.updateAnswer(id, answerRequest).subscribe({
      next: (res) => {
        if (res) {
          // show a success message
          this.snackBar.open('Answer updated successfully', 'Close', {
            duration: 2000
          });
        } else {
          // show an error message
          this.snackBar.open('Failed to update answer', 'Close', {
            duration: 2000
          });
        }
      },
      error: (error) => {
        // show an error message
        this.snackBar.open('Error updating answer', 'Close', {
          duration: 2000
        });
      }
    });
  }

}
