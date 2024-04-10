import { Component, Input, inject } from '@angular/core';
import { QuestionService } from '../../data-access/question.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { QuestionResponse } from '../../data-access/question-response.interface';
import { formatDate } from '../../util/formatDate';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDivider
  ],
  template: `
    @for (question of questionList; track question.id) {
    <div class="question-card">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ question.title }}</mat-card-title>
          <!-- Question Edit/Delete Menu -->
          <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item>
              <span>Edit</span>
            </button>
            <button mat-menu-item (click)="deleteQuestion(question.id)">
              <span>Delete</span>
            </button>
          </mat-menu>
        </mat-card-header>
        <mat-card-content>
          <p>{{ question.body }}</p>
          <p class="user"><i>Posted by:</i> {{ question.userId }}</p>
          <mat-divider></mat-divider>
        </mat-card-content>
        <mat-card-footer>
          <div class="topics">
            @for (topic of question.topics; track topic) {
              <p class="topic-badge">{{ topic }}</p>
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
export class QuestionComponent {
  @Input() questionList!: QuestionResponse[];

  private questionService = inject(QuestionService);
  private router = inject(Router);

  constructor(private snackBar: MatSnackBar) {}

  getFormattedDate(date: string): string {
    return formatDate(date);
  }

  deleteQuestion(id: number) {
    console.log("Deleting question with id: ", id);
    this.questionService.deleteQuestion(id).subscribe({
      next: (res) => {
        if (res) {
          this.snackBar.open("Question deleted successfully!", "Close", {
            duration: 2000,
          });
          this.router.navigate(['/questions']);
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

