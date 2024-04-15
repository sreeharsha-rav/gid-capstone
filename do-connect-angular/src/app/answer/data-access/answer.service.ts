import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../login_signup/service/storage.service';
import { AnswerRequest } from './answer-request.interface';
import { AnswerResponse } from './answer-response.interface';
import { Observable } from 'rxjs';

const ANSWER_URL = 'http://localhost:8080/api/answers';

@Injectable({
  providedIn: 'root'
})
/*
 * Answer service to handle all CRUD operations for answers in the application
 * createAuthHeader() - creates an authorization header for the HTTP requests
 * addAnswer() - adds a new answer to the database
 * getAnswerById() - retrieves an answer by its ID from the database
 * getQuestionAnswers() - retrieves all answers for a question by its ID from the database
 * updateAnswer() - updates an answer in the database
 * deleteAnswer() - deletes an answer from the database
 */
export class AnswerService {

  private http = inject(HttpClient);  // Inject HttpClient

  constructor() { }

  createAuthHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const jwtToken = StorageService.getToken();
    return authHeaders.set(
      "Authorization", "Bearer " + jwtToken
    );
  }

  addAnswer(answerReq: AnswerRequest): Observable<AnswerResponse> {
    return this.http.post<AnswerResponse>(ANSWER_URL, answerReq, {
      headers: this.createAuthHeader()
    });
  }

  getAnswerById(id: number): Observable<AnswerResponse> {
    return this.http.get<AnswerResponse>(`${ANSWER_URL}/${id}`, {
      headers: this.createAuthHeader()
    });
  }

  getQuestionAnswers(questionId: number): Observable<AnswerResponse[]> {
    return this.http.get<AnswerResponse[]>(`${ANSWER_URL}/question/${questionId}`, {
      headers: this.createAuthHeader()
    });
  }

  updateAnswer(id: number, answerReq: AnswerRequest): Observable<AnswerResponse> {
    return this.http.put<AnswerResponse>(`${ANSWER_URL}/${id}`, answerReq, {
      headers: this.createAuthHeader()
    });
  }

  deleteAnswer(id: number): Observable<AnswerResponse> {
    return this.http.delete<AnswerResponse>(`${ANSWER_URL}/${id}`, {
      headers: this.createAuthHeader()
    });
  }

}
