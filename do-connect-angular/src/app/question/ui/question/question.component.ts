import { Component, Input, inject } from '@angular/core';
import { Question } from '../../data-access/question.interface';
import { QuestionService } from '../../data-access/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [],
  template: `
    <div>
      <p>{{ question.title }}</p>
      <p>{{ question.body }}</p>
      <p>{{ question.topics }}</p>
      <p>{{ question.userId }}</p>
    </div>
  `,
  styles: ``
})
export class QuestionComponent {
  @Input() question: Question = {
    id: 0,
    title: '',
    body: '',
    topics: [],
    userId: 0
  };

  private questionService = inject(QuestionService);
  private router = inject(Router);

  constructor() {}



}

