import { Component, inject } from '@angular/core';
import { QuestionComponent } from '../../ui/question/question.component';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { QuestionService } from '../../data-access/question.service';
import { QuestionResponse } from '../../data-access/question-response.interface';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [
    QuestionComponent,
    AddQuestionComponent,
    MatButtonModule,
    MatDialogModule,
    MatDivider
  ],
  template: `
    <div class="question-container">
      <div class="question-header">
        <h2>Questions</h2>
        <!-- TODO: Add OUTPUT event emitter to update question list after adding a new question -->
        <button mat-raised-button color="primary" (click)="openAddDialog()">Add Question</button>
      </div>
      <mat-divider></mat-divider>
      <br>
      <app-question [questionList]="questionList"></app-question>
    </div>
  `,
  styles: `
    .question-container {
      display: flex;
      flex-direction: column;
      padding: 20px;
      margin-left: 10px;
    }
    .question-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `
})
/*
 * Question List Component - this component is used to display a list of questions
 * questionList: QuestionResponse[] - list of questions
 * questionService: QuestionService - service to handle all CRUD operations for questions
 * matDialog: MatDialog - dialog service to open dialogs
 * openAddDialog() - opens the add question dialog
 * getAllQuestions() - retrieves all questions from the database
 * ngOnInit() - lifecycle hook that is called after Angular has initialized all data-bound properties of a directive
 */
export class QuestionListComponent {
  questionList: QuestionResponse[];

  private questionService = inject(QuestionService);

  constructor(private matDialog: MatDialog) {
    this.questionList = [];
  }

  ngOnInit() {
    this.getAllQuestions();
  }

  openAddDialog() {
    const dialogRef = this.matDialog.open(AddQuestionComponent);
    // refresh the question list after the dialog is closed
    dialogRef.afterClosed().subscribe((newQuestion) => {
      if (newQuestion) {
        this.questionList = [...this.questionList, newQuestion];
      }
    });
  }

  getAllQuestions() {
    this.questionService.getAllQuestions().subscribe({
      next: (questions) => {
        this.questionList = questions;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
