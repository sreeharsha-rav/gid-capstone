import { Component, inject, Input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AnswerResponse } from '../../data-access/answer-response.interface';
import { formatDate } from '../../../shared/util/formatDate';
import { AnswerService } from '../../data-access/answer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { EditAnswerComponent } from '../../feature/edit-answer/edit-answer.component';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [
    MatDivider,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    EditAnswerComponent
  ],
  template: `
  @for (answer of answerList; track answer.id) {
    <div class="answer-tile">
      <div class="answer-content">
        <div>
          <p>{{ answer.answer }}</p>
        </div>
        <!-- Answer Edit/Delete Menu -->
        <div class="edit-delete">
          <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
              <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="openEditDialog(answer)">
              <span>Edit</span>
            </button>
            <button mat-menu-item (click)="deleteAnswer(answer.id)">
              <span>Delete</span>
            </button>
          </mat-menu>
        </div>
      </div>
      <div class="answer-footer">
        <p class="user"><i>Posted by:</i> {{ answer.user.name }}</p>
        <p class="date"><b>Date Posted:</b> {{ getFormattedDate(answer.datePosted) }}</p>
      </div>
    </div>
    <mat-divider></mat-divider>
  }
  `,
  styles: `
    .answer-tile {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 10px;
    }
    .answer-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .edit-delete {
      align: right;
    }
    .answer-footer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-right: 10px;
      font-size: 0.8rem;
    }
  `
})
/*
 * Answer Component - this component is used to display a list of answers
 * answerList: AnswerResponse[] - list of answers
 * answerService: AnswerService - service to handle all CRUD operations for answers
 * matSnackBar: MatSnackBar - snack bar service to display messages
 * matDialog: MatDialog - dialog service to open dialogs
 * getFormattedDate() - formats the date to be displayed
 * openEditDialog() - opens the edit answer dialog
 * deleteAnswer() - deletes an answer
 */
export class AnswerComponent {
  @Input() answerList: AnswerResponse[];

  private answerService = inject(AnswerService);

  constructor( 
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {
    this.answerList = [];
  }

  getFormattedDate(date: string): string {
    return formatDate(date);
  }

  openEditDialog(answer: AnswerResponse) {
    // Open dialog to edit the answer
    const dialogRef = this.matDialog.open(EditAnswerComponent, {
      data: {
        id: answer.id,
        answer: answer.answer,
        datePosted: answer.datePosted,
        questionId: answer.questionId,
        userId: answer.user.id
      }
    });
    // refresh the answer list after the dialog is closed
    dialogRef.afterClosed().subscribe((editedAnswer) => {
      if (editedAnswer) {
        this.answerList = this.answerList.map((answer) => {
          if (answer.id === editedAnswer.id) {
            return editedAnswer;
          }
          return answer;
        });
        this.answerList = [...this.answerList];
      }
    });
  }

  deleteAnswer(answerId: number) {
    this.answerService.deleteAnswer(answerId).subscribe({
      next: (res) => {
        if (res) {
          this.matSnackBar.open('Answer deleted successfully', 'Close', {
            duration: 2000
          });
          this.answerList = this.answerList.filter((answer) => answer.id !== answerId);
          this.answerList = [...this.answerList];
        } else {
          this.matSnackBar.open('Failed to delete answer', 'Close', {
            duration: 2000
          });
        }
      },
      error: (error) => {
        console.error(error);
        this.matSnackBar.open('An error occurred while deleting the answer', 'Close', {
          duration: 2000
        });
      }
    });
  }

}
