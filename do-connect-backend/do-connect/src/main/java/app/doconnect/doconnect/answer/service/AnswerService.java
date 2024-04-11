package app.doconnect.doconnect.answer.service;

import app.doconnect.doconnect.answer.dto.AnswerRequest;
import app.doconnect.doconnect.answer.dto.AnswerResponse;

import java.util.List;

public interface AnswerService {
    AnswerResponse createAnswer(AnswerRequest answerRequest);
    AnswerResponse getAnswer(Long id);
    List<AnswerResponse> getAllAnswers();
    List<AnswerResponse> getAnswersByQuestionId(Long questionId);
    AnswerResponse updateAnswer(Long id, AnswerRequest answerRequest);
    AnswerResponse deleteAnswer(Long id);
}
