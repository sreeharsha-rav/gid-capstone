import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { QuestionService } from '../../data-access/question.service';
import { MatDivider } from '@angular/material/divider';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {StorageService} from '../../../login_signup/service/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionRequest } from '../../data-access/question-request.interface';


@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    MatDivider,
    AsyncPipe,
    MatInput
  ],
  templateUrl: './add-question.component.html',
  styles: `
    .add-question-dialog {
      display: flex;
      flex-direction: column;
    }
    form {
      display: flex;
      flex-direction: column;
    }
    .chip-list {
      width: 100%;
    }
  `
})
/*
 * Add Question Component - this component is used to add a new question
 */
export class AddQuestionComponent {
  addForm: any;

  private questionService = inject(QuestionService);
  announcer = inject(LiveAnnouncer);

  separatorKeysCodes: number[] = [ENTER, COMMA];  // Separator key codes
  topicCtrl = new FormControl();  // Topic control
  filteredTopics: Observable<string[]>; 
  topics: string[] = []; // Initial value
  allTopics: string[] = []; // All topics - TODO: Fetch from API

  constructor(private snackBar: MatSnackBar) {
    // Filter topics
    this.filteredTopics = this.topicCtrl.valueChanges.pipe(
      startWith(null),
      map((topic: string | null) => (topic ? this._filter(topic) : this.allTopics.slice())),
    );
  }

  // Initialize form
  ngOnInit(): void {
    this.addForm = new FormGroup({
      title: new FormControl(''),
      body: new FormControl(''),
      topics: new FormControl([])
    });
  }

  // Add topic
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

  // Remove topic
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

  // Filter topics
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTopics.filter(topic => topic.toLowerCase().includes(filterValue));
  }

  // Add question
  addQuestion(): void {
    // Prepare question request
    const questionReq: QuestionRequest = {
      title: this.addForm.get('title')?.value,
      body: this.addForm.get('body')?.value,
      topics: this.topics,
      userId: StorageService.getUserId() // Get user ID from local storage
    };
    // Make API call
    this.questionService.addQuestion(questionReq).subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          this.snackBar.open('Question added successfully', 'Close', {
            duration: 2000,
          });
        } else {
          this.snackBar.open('Failed to add question', 'Close', {
            duration: 2000,
          });
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
