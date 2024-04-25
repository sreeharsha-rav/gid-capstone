import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { formatDate } from '../../../shared/util/formatDate';
import { Router } from '@angular/router';
import { AnswerService } from '../../data-access/answer.service';
import { AnswerResponse } from '../../data-access/answer-response.interface';
import { AnswerComponent } from '../../ui/answer/answer.component';
import { PostAnswerComponent } from '../post-answer/post-answer.component';

@Component({
  selector: 'app-answer-list',
  standalone: true,
  imports: [
    MatDivider,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    AnswerComponent,
    PostAnswerComponent
  ],
  template: `
    <!-- Selected Question -->
    @if (currentQuestion) {
    <div class="question-card">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ currentQuestion.title }}</mat-card-title>
          <!-- Question Edit/Delete Menu -->
          <!-- <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
            <mat-icon>more_vert</mat-icon>
          </button> -->
          <!-- Question Menu -->
          <!-- <mat-menu #menu="matMenu">
            <button mat-menu-item>
              <span>Edit</span>
            </button>
            <button mat-menu-item>
              <span>Delete</span>
            </button>
          </mat-menu> -->
        </mat-card-header>
        <mat-card-content>
          <p>{{ currentQuestion.body }}</p>
          <p class="user"><i>Posted by:</i> {{ currentQuestion.user.name }}</p>
          <mat-divider></mat-divider>
        </mat-card-content>
        <mat-card-footer>
          <div class="topics">
            @for (topicName of currentQuestion.topics; track topicName) {
              <p class="topic-badge">{{ topicName }}</p>
            }
          </div>
          <p class="date"><b>Date Posted:</b> {{ getFormattedDate(currentQuestion.datePosted) }}</p>
        </mat-card-footer>
      </mat-card>
    </div>
    }
    <!-- Answer List -->
    <div class="answer-container">
      <div>
        <h3>Answers</h3>
      </div>
      <mat-divider></mat-divider>
      <br>
      @if (answerList.length === 0) {
        <div class="answer-card">
          <h4>No answers found!</h4>
        </div>
      } @else {
        <app-answer [answerList]="answerList"></app-answer>
      }
    </div>
    <!-- Post Answer -->
    <app-post-answer [currentQuestion]="currentQuestion"></app-post-answer>
  `,
  styles: `
    .question-card {
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
      margin-left: 10px;
      margin-right: 10px;
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
    .answer-container {
      display: flex;
      flex-direction: column;
      padding: 20px;
      margin: 0 20px;
      background-color: #f0f0f0;
      border-radius: 5px;
    }
  `
})
/*
 * Answer List Component - this component is used to display a list of answers for a question
  * currentQuestion: any - the current question being answered
  * answerList: AnswerResponse[] - list of answers
  * answerService: AnswerService - service to handle all CRUD operations for answers
  * router: Router - Angular router service
  * getFormattedDate() - formats the date to a readable format
  * getAnswersByQuestionId() - retrieves all answers for a question
  */
export class AnswerListComponent {
  currentQuestion: any;
  answerList: AnswerResponse[] = [];

  private router = inject(Router);
  private answerService = inject(AnswerService);

  constructor() {
    this.currentQuestion = this.router.getCurrentNavigation()?.extras.state?.['question'];  // Get the current question from the router state
    // If there is no current question, navigate back to the questions page
  }

  ngOnInit() {
    if (this.currentQuestion) {
      this.getAnswersByQuestionId();
    } else {
      this.router.navigate(['/questions']);
    }
  }

  getFormattedDate(date: string): string {
    return formatDate(date);
  }

  getAnswersByQuestionId() {
    this.answerService.getQuestionAnswers(this.currentQuestion.id).subscribe({
      next: (answers) => {
        // Set the answer list
        this.answerList = answers;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

}
