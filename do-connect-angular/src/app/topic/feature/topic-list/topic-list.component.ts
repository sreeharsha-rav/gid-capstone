import { Component, inject } from '@angular/core';
import { TopicComponent } from '../../ui/topic/topic.component';
import { TopicResponse } from '../../data-access/topic-response.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddTopicComponent } from '../add-topic/add-topic.component';
import { TopicService } from '../../data-access/topic.service';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-topic-list',
  standalone: true,
  imports: [
    TopicComponent,
    AddTopicComponent,
    MatButtonModule,
    MatDivider
  ],
  template: `
    <div class="topic-container">
      <div class="topic-header">
        <h2>Topics</h2>
        <!-- TODO: Add OUTPUT event emitter to update topic list after adding a new topic -->
        <button mat-raised-button color="primary" (click)="openTopicDialog()" >Add Topic</button>
      </div>
      <mat-divider></mat-divider>
      <br>
      <app-topic [topicList]="topicList" class="topic-card"></app-topic>
    </div>
  `,
  styles: `
    .topic-container {
      display: flex;
      flex-direction: column;
      padding: 20px;
      margin-left: 10px;
    }
    .topic-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .topic-card {
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
  `
})
/*
 * Topic List Component - this component is used to display a list of topics
 * topicList: TopicResponse[] - list of topics
 * topicService: TopicService - service to get topics
 * matDialog: MatDialog - dialog to add a new topic
 * getAllTopics(): void - get all topics
 * openTopicDialog(): void - open dialog to add a new topic
 * ngOnInit(): void - lifecycle hook to get all topics
 */
export class TopicListComponent {
  topicList: TopicResponse[];

  private topicService = inject(TopicService);

  constructor(private matDialog: MatDialog) {
    this.topicList = [];
  }

  ngOnInit() {
    this.getAllTopics();
  }

  openTopicDialog() {
    this.matDialog.open(AddTopicComponent);
  }

  getAllTopics() {
    this.topicService.getAllTopics().subscribe(
      (data) => {
        this.topicList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
