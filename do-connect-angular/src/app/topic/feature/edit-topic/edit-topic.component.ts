import { Component, Inject, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { TopicService } from '../../data-access/topic.service';
import { TopicRequest } from '../../data-access/topic-request.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TopicResponse } from '../../data-access/topic-response.interface';

@Component({
  selector: 'app-edit-topic',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDivider,
    MatInput
  ],
  template: `
    <div class="edit-topic-dialog">
      <h2 mat-dialog-title>Edit Topic</h2>
      <mat-divider></mat-divider>
      <mat-dialog-content>
        <form [formGroup]="editForm">
          <mat-form-field appearance="outline">
            <mat-label>Topic Name</mat-label>
            <input matInput placeholder="Enter Topic Name" type="text" name="name" formControlName="name" required>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Topic Description</mat-label>
            <textarea matInput placeholder="Enter Topic Description" name="description" formControlName="description" required></textarea>
          </mat-form-field>
        </form>
        <mat-dialog-actions align="end">
          <button mat-stroked-button color="secondary" mat-dialog-close>Cancel</button>
          <button mat-raised-button color="primary" [disabled]="editForm.invalid" (click)="editTopic()" mat-dialog-close>Update</button>
        </mat-dialog-actions>
      </mat-dialog-content>
    </div>
  `,
  styles: `
    .edit-topic-dialog {
      display: flex;
      flex-direction: column;
    }
    form {
      display: flex;
      flex-direction: column;
    }
    button {
      margin-left: 10px;
    }
  `
})
export class EditTopicComponent {
  editForm: any;
  currentTopic!: TopicResponse;

  private topicService = inject(TopicService);

  constructor(
    private matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { 
      id: number,
      name: string,
      description: string
    }
  ) {
    this.currentTopic = {
      id: data.id,
      name: data.name,
      description: data.description
    };
  }

  ngOnInit() {
    this.editForm = new FormGroup({
      name: new FormControl(this.currentTopic.name),
      description: new FormControl(this.currentTopic.description)
    });
  }

  editTopic() {
    // create a topic request object
    const topicRequest: TopicRequest = {
      name: this.editForm.value.name,
      description: this.editForm.value.description
    };
    const id = this.data.id; // get the id from the data
    // call the topic service to update the topic
    this.topicService.updateTopic(id, topicRequest).subscribe({
      next: (res) => {
        if (res) {
          // show a success message
          this.matSnackBar.open('Topic updated successfully, refresh to see changes', 'Close', {
            duration: 2000
          });
        } else {
          // show an error message
          this.matSnackBar.open('Failed to update topic', 'Close', {
            duration: 2000
          });
        }
      },
      error: (error) => {
        // show an error message
        this.matSnackBar.open('Error updating topic', 'Close', {
          duration: 2000
        });
      }
    });
  }

}
