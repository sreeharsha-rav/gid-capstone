import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../login_signup/service/storage.service';
import { TopicRequest } from './topic-request.interface';
import { TopicResponse } from './topic-response.interface';
import { QuestionResponse } from '../../question/data-access/question-response.interface';

const TOPICS_URL = 'http://localhost:8080/api/topics'; // URL to web api

@Injectable({
  providedIn: 'root'
})
/*
 * Topic service to handle all CRUD operations for topics in the application
 * createAuthHeader() - creates an authorization header for the HTTP requests
 * addTopic() - adds a new topic to the database
 * getAllTopics() - retrieves all topics from the database
 * getTopicById() - retrieves a topic by its ID from the database
 * updateTopic() - updates a topic in the database
 * deleteTopic() - deletes a topic from the database
 * getQuestionsByTopicId() - retrieves all questions for a topic by its ID from the database
 */
export class TopicService {

  private http = inject(HttpClient);  // Inject HttpClient

  constructor() { }

  createAuthHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const jwtToken = StorageService.getToken();
    return authHeaders.set(
      "Authorization", "Bearer " + jwtToken
    );
  }

  addTopic(topicReq: TopicRequest): Observable<TopicResponse> {
    return this.http.post<TopicResponse>(TOPICS_URL, topicReq, {
      headers: this.createAuthHeader()
    });
  }

  getAllTopics(): Observable<TopicResponse[]> {
    return this.http.get<TopicResponse[]>(TOPICS_URL, {
      headers: this.createAuthHeader()
    });
  }

  getTopicById(id: number): Observable<TopicResponse> {
    return this.http.get<TopicResponse>(`${TOPICS_URL}/${id}`, {
      headers: this.createAuthHeader()
    });
  }

  updateTopic(id: number, topicReq: TopicRequest): Observable<TopicResponse> {
    return this.http.put<TopicResponse>(`${TOPICS_URL}/${id}`, topicReq, {
      headers: this.createAuthHeader()
    });
  }

  deleteTopic(id: number): Observable<any> {
    return this.http.delete(`${TOPICS_URL}/${id}`, {
      headers: this.createAuthHeader()
    });
  }

  // Get questions by topic ID
  getQuestionsByTopicId(id: number): Observable<QuestionResponse[]> {
    return this.http.get<QuestionResponse[]>(`${TOPICS_URL}/${id}/questions`, {
      headers: this.createAuthHeader()
    });
  }

}
