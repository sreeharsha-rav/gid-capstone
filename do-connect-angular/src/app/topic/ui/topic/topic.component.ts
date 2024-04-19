import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { TopicResponse } from '../../data-access/topic-response.interface';
import { Router } from '@angular/router';
import { TopicService } from '../../data-access/topic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditTopicComponent } from '../../feature/edit-topic/edit-topic.component';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    EditTopicComponent
  ],
  template: `
    <div class="grid-list">
    @for (topic of topicList; track topic.id) {
      <div class="grid-item">
        <div class="topic-card">
          <mat-card>
            <mat-card-header>
              <mat-card-title>
                <a class="link" (click)="navigateToQuestions(topic)">{{topic.name}}</a>
              </mat-card-title>
              <!-- Topic Edit/Delete Menu -->
              <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item (click)="openEditDialog(topic)">
                  <span>Edit</span>
                </button>
                <button mat-menu-item (click)="deleteTopic(topic.id)">
                  <span>Delete</span>
                </button>
              </mat-menu>
            </mat-card-header>
            <mat-card-content>
              <p>{{topic.description}}</p>
            </mat-card-content>
          </mat-card>
        </div>
    </div>
    }
  </div>
  `,
  styles: `
    .topic-card {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 10px;
    }
    .link {
      cursor: pointer;
      color: blue;
      font-size: 0.8rem;
      background-color: transparent;
    }
    .link:hover {
      text-decoration: underline;
      color: darkblue;
    }
    mat-card {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    mat-card-header {
      display: flex;
      justify-content: space-between;
    }
    mat-card-content {
      flex-grow: 1;
      font-size: 0.9rem;
    }
    .grid-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-gap: 10px;
    }
    .grid-item {
      display: flex;
      justify-content: center;
    }
  `
})
/*
 * Topic Component - this component is used to display a list of topics
 * topicList: TopicResponse[] - list of topics
 * navigateToQuestions(currentTopic: TopicResponse) - navigate to the questions page for the selected topic
 * openEditDialog(currentTopic: TopicResponse) - open the edit dialog for the selected topic
 * deleteTopic(id: number) - delete a topic by utilizing the topic service to make an API call
 */
export class TopicComponent {
  @Input() topicList: TopicResponse[] = [];

  private topicService = inject(TopicService);
  private router = inject(Router);

  constructor(
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog
  ) { }

  navigateToQuestions(currentTopic: TopicResponse) {
    this.router.navigateByUrl(`/topics/${currentTopic.id}/questions`, {
      state: { topic: currentTopic }
    });
  }

  openEditDialog(currentTopic: TopicResponse) {
    // Open the edit dialog
    const dialogRef = this.matDialog.open(EditTopicComponent, {
      data: { 
        id: currentTopic.id,
        name: currentTopic.name,
        description: currentTopic.description
      }
    });
  }

  deleteTopic(id: number) {
    this.topicService.deleteTopic(id).subscribe({
      next: () => {
        this.matSnackBar.open('Topic deleted successfully', 'Close', {
          duration: 2000
        });
        // Remove the deleted topic from the list
        this.topicList = this.topicList.filter(topic => topic.id !== id);
      },
      error: (error) => {
        this.matSnackBar.open('Error deleting topic', 'Close', {
          duration: 2000
        });
      }
    });
  }

}
