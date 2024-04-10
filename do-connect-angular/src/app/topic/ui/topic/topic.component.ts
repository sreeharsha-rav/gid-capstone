import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule
  ],
  template: `
    <mat-grid-list cols="4" rowHeight="3:1">
    <!-- @for (topic of topicList; track topic.id) {} -->
      <mat-grid-tile>
        <div class="topic-card">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Topic Title</mat-card-title>
              <!-- Topic Edit/Delete Menu -->
              <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item>
                  <span>Edit</span>
                </button>
                <button mat-menu-item>
                  <span>Delete</span>
                </button>
              </mat-menu>
            </mat-card-header>
            <mat-card-content>
              <p>Topic Description</p>
            </mat-card-content>
          </mat-card>
        </div>
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styles: `
    .topic-card {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 10px;
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
    }
  `
})
export class TopicComponent {
  @Input() topicList: any;
}
