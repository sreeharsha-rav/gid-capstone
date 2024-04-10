import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';

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
            <mat-label>Topic Title</mat-label>
            <input matInput placeholder="Enter Topic Title" type="text" name="title" formControlName="title" required>
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
export class AddTopicComponent {
  addForm: any;

  constructor() {}

  ngOnInit() {
    this.addForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl('')
    });
  }

  addTopic() {
    // Add topic logic
  }

}
