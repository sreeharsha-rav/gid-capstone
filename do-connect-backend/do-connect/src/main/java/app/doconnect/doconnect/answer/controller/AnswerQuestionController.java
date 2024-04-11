package app.doconnect.doconnect.answer.controller;

import app.doconnect.doconnect.answer.dto.AnswerResponse;
import app.doconnect.doconnect.answer.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/*
 * Controller class to define the REST API endpoints for the Answer service
 * getAnswersByQuestionId - to get all answers by question ID
 */
@RestController
@RequestMapping("/api/answers")
public class AnswerQuestionController {

    @Autowired
    private AnswerService answerService;

    @GetMapping("/question/{questionId}")
    public ResponseEntity<?> getAnswersByQuestionId(@PathVariable Long questionId) {
        List<AnswerResponse> answerResponses = answerService.getAnswersByQuestionId(questionId);
        if (answerResponses.isEmpty()) {
            return new ResponseEntity<>("No answers found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(answerResponses, HttpStatus.OK);
    }

}
