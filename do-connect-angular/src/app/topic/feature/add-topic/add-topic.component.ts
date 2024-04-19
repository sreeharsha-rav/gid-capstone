import { Component, inject, Output, EventEmitter } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { TopicService } from '../../data-access/topic.service';
import { TopicRequest } from '../../data-access/topic-request.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-topic',
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
    <div class="add-topic-dialog">
      <h2 mat-dialog-title>Add Topic</h2>
      <mat-divider></mat-divider>
      <mat-dialog-content>
        <form [formGroup]="addForm">
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
          <button mat-raised-button color="primary" [disabled]="addForm.invalid" (click)="addTopic()" mat-dialog-close>Add</button>
        </mat-dialog-actions>
      </mat-dialog-content>
    </div>
  `,
  styles: `
    .add-topic-dialog {
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
/*
 * Add Topic Component - this component is used to add a new topic
 * addForm: any - form to add a topic
 * constructor() - initialize the component
 * addTopic() - add a new topic
 * topicService: TopicService - service to add a topic
 * matSnackBar: MatSnackBar - material snack bar to show messages
 */
export class AddTopicComponent {

  addForm: any;

  constructor(private matSnackBar: MatSnackBar) {}

  private topicService = inject(TopicService);

  ngOnInit() {
    this.addForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl('')
    });
  }

  /*
   * addTopic: add a new topic
   * @returns void
   * @sideEffects resets the form
   * @sideEffects shows a message on success or failure
   * @sideEffects calls the service to add the topic
   */
  addTopic() {
    // convert form values to TopicRequest object
    const topicRequest: TopicRequest = {
      name: this.addForm.value.name,
      description: this.addForm.value.description
    }
    // call the service to add the topic
    this.topicService.addTopic(topicRequest).subscribe({
      next: (res) => {
        if (res) {
          this.addForm.reset(); // reset the form
          this.matSnackBar.open('Topic added successfully', 'Close', {
            duration: 2000
          });
        } else {
          this.matSnackBar.open('Failed to add topic', 'Close', {
            duration: 2000
          });
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
