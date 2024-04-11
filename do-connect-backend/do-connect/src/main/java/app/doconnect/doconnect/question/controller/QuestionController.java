package app.doconnect.doconnect.question.controller;

import app.doconnect.doconnect.question.dto.QuestionRequest;
import app.doconnect.doconnect.question.dto.QuestionResponse;
import app.doconnect.doconnect.question.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * Controller class to define the REST API endpoints for the Question service
 * addQuestion - to add a new question
 * getQuestionById - to get a question by its ID
 * getAllQuestions - to get all questions
 * updateQuestion - to update a question
 * deleteQuestion - to delete a question
 */
@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping
    public ResponseEntity<?> addQuestion(@RequestBody QuestionRequest questionRequest) {
        QuestionResponse createdQuestion = questionService.addQuestion(questionRequest);
        if (createdQuestion == null) {
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAllQuestions() {
        List<QuestionResponse> questionList = questionService.getAllQuestions();
        if (questionList == null) {
            return new ResponseEntity<>("No questions found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(questionList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getQuestionById(@PathVariable Long id) {
        QuestionResponse questionResponse = questionService.getQuestionById(id);
        if (questionResponse == null) {
            return new ResponseEntity<>("Question not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(questionResponse, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateQuestion(@PathVariable Long id, @RequestBody QuestionRequest questionRequest) {
        QuestionResponse updatedQuestion = questionService.updateQuestion(id, questionRequest);
        if (updatedQuestion == null) {
            return new ResponseEntity<>("Question not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        QuestionResponse deletedQuestion = questionService.deleteQuestion(id);
        if (deletedQuestion == null) {
            return new ResponseEntity<>("Question not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(deletedQuestion, HttpStatus.OK);
    }

}
