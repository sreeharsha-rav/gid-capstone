package app.doconnect.doconnect.question.service;

import app.doconnect.doconnect.question.dto.QuestionDTO;
import app.doconnect.doconnect.question.dto.QuestionRequest;

import java.util.List;

public interface QuestionService {
    QuestionDTO addQuestion(QuestionRequest questionRequest);
    List<QuestionDTO> getAllQuestions();
    QuestionDTO getQuestionById(Long id);
    QuestionDTO updateQuestion(Long id, QuestionRequest questionRequest);
    QuestionDTO deleteQuestion(Long id);

}
