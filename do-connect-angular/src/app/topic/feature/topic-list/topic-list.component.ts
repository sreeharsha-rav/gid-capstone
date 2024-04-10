import { Component } from '@angular/core';
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
        <button mat-raised-button color="primary" (click)="openTopicDialog()">Add Topic</button>
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
export class TopicListComponent {
  topicList: TopicResponse[];

  constructor(private matDialog: MatDialog) {
    this.topicList = [];
  }

  openTopicDialog() {
    this.matDialog.open(AddTopicComponent);
  }

  getAllTopics() {
    // this.topicList = this.topicService.getAllTopics();
  }

}
