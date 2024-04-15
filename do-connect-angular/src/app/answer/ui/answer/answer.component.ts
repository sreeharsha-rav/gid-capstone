import { Component, Input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AnswerResponse } from '../../data-access/answer-response.interface';
import { formatDate } from '../../../shared/util/formatDate';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [
    MatDivider
  ],
  template: `
  @for (answer of answerList; track answer.id) {
    <div class="answer-tile">
      <div class="answer-content">
        <p>{{ answer.answer }}</p>
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
      flex-direction: column;
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
export class AnswerComponent {
  @Input() answerList: AnswerResponse[];

  constructor() {
    this.answerList = [];
  }

  getFormattedDate(date: string): string {
    return formatDate(date);
  }

}
