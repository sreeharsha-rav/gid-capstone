package app.doconnect.doconnect.question.service;

import app.doconnect.doconnect.question.dto.QuestionRequest;
import app.doconnect.doconnect.question.dto.QuestionResponse;

import java.util.List;

/*
 * Service interface to define the methods for the Question service
 * addQuestion - to create a new question
 * getQuestionById - to get a question by its ID
 * getAllQuestions - to get all questions
 * updateQuestion - to update a question
 * deleteQuestion - to delete a question
 * getQuestionsByTopicId - to get all questions by a topic ID
 */
public interface QuestionService {
    QuestionResponse addQuestion(QuestionRequest questionRequest);
    List <QuestionResponse> getQuestionsByTopicId(Long topicId);

    List<QuestionResponse> getAllQuestions();
    QuestionResponse getQuestionById(Long id);
    QuestionResponse updateQuestion(Long id, QuestionRequest questionRequest);
    QuestionResponse deleteQuestion(Long id);

}
