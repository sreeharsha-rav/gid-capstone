import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './question.interface';
import { StorageService } from '../../login_signup/service/storage.service';

const QUESTION_URL = 'http://localhost:8080/api/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private http = inject(HttpClient);

  constructor() { }

  createAuthHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const jwtToken = StorageService.getToken();
    return authHeaders.set(
      "Authorization", "Bearer " + jwtToken
    )
  }

  addQuestion(question: any): Observable<any> {
    return this.http.post<any>(QUESTION_URL, question, {
      headers: this.createAuthHeader()
    });
  }

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(QUESTION_URL, {
      headers: this.createAuthHeader()
    });
  }

  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${QUESTION_URL}/${id}`);
  }

  updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${QUESTION_URL}/${question.id}`, question);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${QUESTION_URL}/${id}`);
  }

}
