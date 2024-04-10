import { Component, inject } from '@angular/core';
import { QuestionComponent } from '../../ui/question/question.component';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { Question } from '../../data-access/question.interface';
import { QuestionService } from '../../data-access/question.service';

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
        <button mat-raised-button color="primary" (click)="openAddDialog()">Add Question</button>
      </div>
      <mat-divider></mat-divider>
      @for (question of questionList; track question.id) {
        <app-question [question]="question"></app-question>
      }
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
export class QuestionListComponent {
  questionList: Question[];

  private questionService = inject(QuestionService);

  constructor(private matDialog: MatDialog) {
    this.questionList = [];
  }

  ngOnInit() {
    this.getAllQuestions();
  }

  openAddDialog() {
    this.matDialog.open(AddQuestionComponent);
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