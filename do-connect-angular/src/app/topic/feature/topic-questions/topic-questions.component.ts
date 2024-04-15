import { Component, inject } from '@angular/core';
import { QuestionComponent } from '../../../question/ui/question/question.component';
import { MatDivider } from '@angular/material/divider';
import { TopicService } from '../../data-access/topic.service';
import { Router } from '@angular/router';
import { QuestionResponse } from '../../../question/data-access/question-response.interface';

@Component({
  selector: 'app-topic-questions',
  standalone: true,
  imports: [
    QuestionComponent,
    MatDivider
  ],
  template: `
    <div class="topic-question-container">
      <div class="topic-question-header">
        <h2>{{currentTopic.name}} - Questions</h2>
      </div>
      <mat-divider></mat-divider>
      <br>
      <app-question [questionList]="questionList"></app-question>
    </div>
  `,
  styles: `
    .topic-question-container {
      display: flex;
      flex-direction: column;
      padding: 20px;
      margin-left: 10px;
    }
    .topic-question-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `
})
export class TopicQuestionsComponent {
  questionList: QuestionResponse[];
  currentTopic: any;

  private topicService = inject(TopicService);
  private router = inject(Router);

  constructor() {
    this.questionList = [];
    this.currentTopic = this.router.getCurrentNavigation()?.extras.state?.['topic'];  // Get the current topic from the router state
    // If there is no current topic, navigate back to the topics page
    if (!this.currentTopic) {
      this.router.navigate(['/topics']);
    }
  }

  ngOnInit() {
    this.getAllQuestionsByTopic();
  }

  getAllQuestionsByTopic() {
    this.topicService.getQuestionsByTopicId(this.currentTopic.id).subscribe({
      next: (questions) => {
        this.questionList = questions;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

}
