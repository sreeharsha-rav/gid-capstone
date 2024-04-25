import { Component, ElementRef, Inject, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { QuestionResponse } from '../../data-access/question-response.interface';
import { QuestionRequest } from '../../data-access/question-request.interface';
import { QuestionService } from '../../data-access/question.service';
import { TopicService } from '../../../topic/data-access/topic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-edit-question',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDivider,
    MatInput,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    AsyncPipe
  ],
  template: `
    <div class="edit-question-dialog">
      <h2 mat-dialog-title>Edit Question</h2>
      <mat-divider></mat-divider>
      <mat-dialog-content>
        <form [formGroup]="editForm">
          <mat-form-field appearance="outline">
            <mat-label>Question Title</mat-label>
            <input matInput placeholder="Enter Question Title" type="text" name="title" formControlName="title" required>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Question Body</mat-label>
            <textarea matInput placeholder="Enter Question Body" name="body" formControlName="body" required></textarea>
          </mat-form-field>
          <!-- Topic chips -->
          <mat-form-field appearance="outline" class="chip-list">
            <mat-label>Topics</mat-label>
            <mat-chip-grid #chipGrid aria-label="Topic selection">
              @for (topic of topics; track topic) {
                <mat-chip-row (removed)="remove(topic)">
                  {{topic}}
                  <button matChipRemove [attr.aria-label]="'remove ' + topic">
                    <mat-icon>cancel</mat-icon>
                  </button>
                </mat-chip-row>
              }
            </mat-chip-grid>
            <input placeholder="New topic..." #topicInput [formControl]="topicCtrl"
              [matChipInputFor]="chipGrid" [matAutocomplete]="auto"
              [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
              (matChipInputTokenEnd)="add($event)" required>
            <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">
              @for (topic of filteredTopics | async; track topic) {
                <mat-option [value]="topic">{{topic}}</mat-option>
              }
            </mat-autocomplete>
          </mat-form-field>
        </form>
        <mat-dialog-actions align="end">
          <button mat-stroked-button color="secondary" mat-dialog-close>Cancel</button>
          <button mat-raised-button color="primary" [disabled]="editForm.invalid" (click)="editQuestion()" mat-dialog-close>Update</button>
        </mat-dialog-actions>
      </mat-dialog-content>
    </div>
  `,
  styles: `
    .edit-question-dialog {
      display: flex;
      flex-direction: column;
    }
    form {
      display: flex;
      flex-direction: column;
      min-width: 500px;
    }
    button {
      margin-left: 10px;
    }
  `
})
/*
 * Edit Question Component - this component is used to edit a question
 * editForm: any - form to edit a question
 * currentQuestion: QuestionResponse - current question
 * separatorKeysCodes: number[] - separator key codes
 * topicCtrl: FormControl - topic control
 * filteredTopics: Observable<string[]> - filtered topics
 * topics: string[] - topics
 * allTopics: string[] - all topics
 * constructor() - initialize the component
 * ngOnInit() - initialize the form
 * add(event: MatChipInputEvent) - add a topic
 * remove(topic: string) - remove a topic
 * selected(event: MatAutocompleteSelectedEvent) - select a topic
 * private _filter(value: string) - filter topics
 * editQuestion() - edit a question by utilizing the question service to make an API call
 */
export class EditQuestionComponent {
  editForm: any;
  currentQuestion!: QuestionResponse;

  private questionService = inject(QuestionService);
  private topicService = inject(TopicService);
  announcer = inject(LiveAnnouncer);

  separatorKeysCodes: number[] = [ENTER, COMMA];  // Separator key codes
  topicCtrl = new FormControl();  // Topic control
  filteredTopics: Observable<string[]>;
  topics: string[] = []; // Initial value
  allTopics: string[] = []; // All topics from the database

  constructor(
    private matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { 
      id: number,
      title: string,
      body: string,
      datePosted: string,
      topics: string[],
      user: any,
    },
    private dialogRef: MatDialogRef<EditQuestionComponent>
  ) {
    // Initialize the current question
    this.currentQuestion = {
      id: data.id,
      title: data.title,
      body: data.body,
      datePosted: data.datePosted,
      topics: data.topics,
      user: data.user
    };
    // Intialize the topics
    this.topics = data.topics;
    // filter topics
    this.filteredTopics = this.topicCtrl.valueChanges.pipe(
      startWith(null),
      map((topic: string | null) => topic ? this._filter(topic) : this.allTopics.slice())
    );
  }

  ngOnInit() {
    // get all topics
    this.topicService.getAllTopics().subscribe({
      next: (res) => {
        this.allTopics = res.map((topic) => topic.name);
      },
      error: (error) => {
        console.error(error);
      }
    });
    // Initialize form
    this.editForm = new FormGroup({
      title: new FormControl(this.currentQuestion.title),
      body: new FormControl(this.currentQuestion.body)
    });
  }

  // Add topic method
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add topic
    if (value) {
      this.topics.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.topicCtrl.setValue(null);
  }

  // Remove topic method
  remove(topic: string): void {
    const index = this.topics.indexOf(topic);
    if (index >= 0) {
      this.topics.splice(index, 1);
      this.announcer.announce(`Removed ${topic}`);
    }
  }

  // Select topic
  @ViewChild('topicInput') topicInput!: ElementRef<HTMLInputElement>;

  selected(event: MatAutocompleteSelectedEvent): void {
    this.topics.push(event.option.viewValue);
    if (this.topicInput) {
      this.topicInput.nativeElement.value = '';
    }
    this.topicCtrl.setValue(null);
  }

  // Filter topics method
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTopics.filter(topic => topic.toLowerCase().indexOf(filterValue) === 0);
  }

  // Edit question method
  editQuestion() {
    const questionRequest: QuestionRequest = {
      title: this.editForm.value.title,
      body: this.editForm.value.body,
      topics: this.currentQuestion.topics,
      userId: this.currentQuestion.user.id
    };
    const id = this.currentQuestion.id;

    let updatedQuestion: QuestionResponse;
    this.questionService.updateQuestion(id, questionRequest).subscribe({
      next: (res) => {
        if (res) {
          this.matSnackBar.open('Question updated successfully', 'Close', {
            duration: 2000,
          });
          updatedQuestion = res;
          this.dialogRef.close(updatedQuestion);
        } else {
          this.matSnackBar.open('Failed to update question', 'Close', {
            duration: 2000,
          });
        }
      },
      error: (error) => {
        console.error(error);
        this.matSnackBar.open('Error updating question', 'Close', {
          duration: 2000,
        });
      },
    });
  }
}