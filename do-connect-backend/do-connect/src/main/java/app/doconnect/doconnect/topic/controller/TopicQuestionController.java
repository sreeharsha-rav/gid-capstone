package app.doconnect.doconnect.topic.controller;

import app.doconnect.doconnect.question.dto.QuestionResponse;
import app.doconnect.doconnect.question.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/*
 * Controller class to define the REST API endpoints for the Topic service interacting with the Question service
 * getQuestionsByTopicId - to get all questions by topic ID
 */
@RestController
@RequestMapping("/api/topics")
public class TopicQuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/{id}/questions")
    public ResponseEntity<?> getQuestionsByTopicId(@PathVariable Long id) {
        List<QuestionResponse> questionList = questionService.getQuestionsByTopicId(id);
        if (questionList.isEmpty()) {
            return new ResponseEntity<>("No questions found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(questionList, HttpStatus.OK);
    }

}
