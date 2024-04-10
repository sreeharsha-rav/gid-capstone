import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, EventEmitter, Output, ViewChild, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-topic-chips',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  template: `
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
        (matChipInputTokenEnd)="add($event)">
      <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">
        @for (topic of filteredTopics | async; track topic) {
          <mat-option [value]="topic">{{topic}}</mat-option>
        }
      </mat-autocomplete>
    </mat-form-field>
  `,
  styles: `
    .chip-list {
      width: 100%;
    }
  `
})
export class TopicChipsComponent {

  @Output() topicsChange = new EventEmitter<string[]>();  // Topics change event

  separatorKeysCodes: number[] = [ENTER, COMMA];  // Separator key codes
  topicCtrl = new FormControl();  // Topic control
  filteredTopics: Observable<string[]>; 
  topics: string[] = []; // Initial value
  allTopics: string[] = []; // All topics - TODO: Fetch from API

  announcer = inject(LiveAnnouncer);

  constructor() {
    // Filter topics
    this.filteredTopics = this.topicCtrl.valueChanges.pipe(
      startWith(null),
      map((topic: string | null) => (topic ? this._filter(topic) : this.allTopics.slice())),
    );
  }
  
  // Add topic
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add topic
    if (value) {
      this.topics.push(value);
      this.topicsChange.emit(this.topics); // Emit topics change event
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
      this.topicsChange.emit(this.topics); // Emit topics change event
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

}
