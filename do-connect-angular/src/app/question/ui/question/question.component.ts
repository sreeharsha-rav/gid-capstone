import { Component, Input, inject } from '@angular/core';
import { QuestionService } from '../../data-access/question.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { QuestionResponse } from '../../data-access/question-response.interface';
import { formatDate } from '../../../shared/util/formatDate';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditQuestionComponent } from '../../feature/edit-question/edit-question.component';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDivider,
    EditQuestionComponent
  ],
  template: `
   @if (questionList.length === 0) {
    <div class="question-card">
      <h3>No questions found!</h3>
    </div>
    }

    @for (question of questionList; track question.id) {
    <div class="question-card">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <a class="link" (click)="navigateToAnswers(question)">{{ question.title }}</a>
          </mat-card-title>
          <!-- Question Edit/Delete Menu -->
          <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="openEditDialog(question)">
              <span>Edit</span>
            </button>
            <button mat-menu-item (click)="deleteQuestion(question.id)">
              <span>Delete</span>
            </button>
          </mat-menu>
        </mat-card-header>
        <mat-card-content>
          <p>{{ question.body }}</p>
          <p class="user"><i>Posted by:</i> {{ question.user.name }}</p>
          <mat-divider></mat-divider>
        </mat-card-content>
        <mat-card-footer>
          <div class="topics">
            @for (topicName of question.topics; track topicName) {
              <p class="topic-badge">{{ topicName }}</p>
            }
          </div>
          <p class="date"><b>Date Posted:</b> {{ getFormattedDate(question.datePosted) }}</p>
        </mat-card-footer>
      </mat-card>
    </div>
    }

  `,
  styles: `
    .question-card {
      margin-bottom: 5px;
      padding: 20px;
    }
    mat-card-title {
      cursor: pointer;
      color: blue;
      font-size: 1.3rem;
      background-color: transparent;
    }
    mat-card-title:hover {
      text-decoration: underline;
      color: darkblue;
    }
    mat-card {
      width: 100%;
    }
    mat-card-header {
      display: flex;
      justify-content: space-between;
    }
    mat-card-content {
      margin-left: 10px;
    }
    mat-card-footer {
      display: flex;
      margin: 0 20px;
      justify-content: space-between;
    }
    .topics {
      display: flex;
      flex-wrap: wrap;
    }
    .topic-badge {
      background-color: #f0f0f0;
      border-radius: 5px;
      padding: 5px;
      text-align: center;
      margin-right: 5px;
      font-weight: bold;
      font-size: 0.8rem;
      color: #333;
    }
    .user {
      text-align: right;
      color: #333;
      font-size: 0.8rem;
    }
    .date {
      color: #333;
      font-size: 0.8rem;
    }
    `
})
/*
  * Question Component - this component is used to display a single question
  * questionList: QuestionResponse[] - list of questions
  * questionService: QuestionService - service to handle all CRUD operations for questions
  * router: Router - Angular router service
  * snackBar: MatSnackBar - Angular material snack bar service
  * getFormattedDate(date: string) - formats the date in a readable format
  * navigateToAnswers(question: QuestionResponse) - navigates to the answers page for a question
  * openEditDialog(currentQuestion: QuestionResponse) - opens the edit dialog for a question
  * deleteQuestion(id: number) - deletes a question from the database
  */
export class QuestionComponent {
  @Input() questionList!: QuestionResponse[];

  private questionService = inject(QuestionService);
  private router = inject(Router);

  constructor(
    private snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {}

  getFormattedDate(date: string): string {
    return formatDate(date);
  }

  navigateToAnswers(question: QuestionResponse) {
    this.router.navigateByUrl(`/answers/question/${question.id}`, {
      state: { 
        question: question 
      }     
    });
  }

  openEditDialog(currentQuestion: QuestionResponse) {
    // Open the edit dialog
    const dialogRef = this.matDialog.open(EditQuestionComponent, {
      data: { 
        id: currentQuestion.id,
        title: currentQuestion.title,
        body: currentQuestion.body,
        datePosted: currentQuestion.datePosted,
        topics: currentQuestion.topics,
        user: currentQuestion.user
      }
    });
  }

  deleteQuestion(id: number) {
    console.log("Deleting question with id: ", id);
    this.questionService.deleteQuestion(id).subscribe({
      next: (res) => {
        if (res) {
          this.snackBar.open("Question deleted successfully!", "Close", {
            duration: 2000,
          });
          // Remove the deleted question from the list
          this.questionList = this.questionList.filter((question) => question.id !== id);
        } else {
          this.snackBar.open("Failed to delete question!", "Close", {
            duration: 2000,
          });
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}

