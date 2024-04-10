package app.doconnect.doconnect.question.service;

import app.doconnect.doconnect.question.dto.QuestionRequest;
import app.doconnect.doconnect.question.dto.QuestionResponse;

import java.util.List;

public interface QuestionService {
    QuestionResponse addQuestion(QuestionRequest questionRequest);
    List<QuestionResponse> getAllQuestions();
    QuestionResponse getQuestionById(Long id);
    QuestionResponse updateQuestion(Long id, QuestionRequest questionRequest);
    QuestionResponse deleteQuestion(Long id);

}
