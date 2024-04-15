import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../login_signup/service/storage.service';
import { QuestionRequest } from './question-request.interface';
import { QuestionResponse } from './question-response.interface';

const QUESTION_URL = 'http://localhost:8080/api/questions'; // URL to web api

@Injectable({
  providedIn: 'root'
})
/*
 * Question service to handle all CRUD operations for questions in the application
 * createAuthHeader() - creates an authorization header for the HTTP requests
 * addQuestion() - adds a new question to the database
 * getAllQuestions() - retrieves all questions from the database
 * getQuestionById() - retrieves a question by its ID from the database
 * updateQuestion() - updates a question in the database
 * deleteQuestion() - deletes a question from the database 
 */  
export class QuestionService {

  private http = inject(HttpClient);  // Inject HttpClient

  constructor() { }

  createAuthHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const jwtToken = StorageService.getToken();
    return authHeaders.set(
      "Authorization", "Bearer " + jwtToken
    )
  }

  addQuestion(questionReq: QuestionRequest): Observable<QuestionResponse> {
    return this.http.post<QuestionResponse>(QUESTION_URL, questionReq, {
      headers: this.createAuthHeader()
    });
  }

  getAllQuestions(): Observable<QuestionResponse[]> {
    return this.http.get<QuestionResponse[]>(QUESTION_URL, {
      headers: this.createAuthHeader()
    });
  }

  getQuestionById(id: number): Observable<QuestionResponse> {
    return this.http.get<QuestionResponse>(`${QUESTION_URL}/${id}`, {
      headers: this.createAuthHeader()
    });
  }

  updateQuestion(id: number, questionReq: QuestionRequest): Observable<QuestionResponse> {
    return this.http.put<QuestionResponse>(`${QUESTION_URL}/${id}`, questionReq, {
      headers: this.createAuthHeader()
    });
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${QUESTION_URL}/${id}`, {
      headers: this.createAuthHeader()
    });
  }

}
