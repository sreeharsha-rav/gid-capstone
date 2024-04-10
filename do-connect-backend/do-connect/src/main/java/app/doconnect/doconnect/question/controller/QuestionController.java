package app.doconnect.doconnect.question.controller;

import app.doconnect.doconnect.question.dto.QuestionDTO;
import app.doconnect.doconnect.question.dto.QuestionRequest;
import app.doconnect.doconnect.question.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/questions")
    public ResponseEntity<?> addQuestion(@RequestBody QuestionRequest questionRequest) {
        QuestionDTO createdQuestion = questionService.addQuestion(questionRequest);
        if (createdQuestion == null) {
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }

    @GetMapping("/questions")
    public ResponseEntity<?> getAllQuestions() {
        List<QuestionDTO> questionList = questionService.getAllQuestions();
        if (questionList == null) {
            return new ResponseEntity<>("No questions found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(questionList, HttpStatus.OK);
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<?> getQuestionById(@PathVariable Long id) {
        QuestionDTO questionDTO = questionService.getQuestionById(id);
        if (questionDTO == null) {
            return new ResponseEntity<>("Question not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(questionDTO, HttpStatus.OK);
    }

    @PutMapping("/questions/{id}")
    public ResponseEntity<?> updateQuestion(@PathVariable Long id, @RequestBody QuestionRequest questionRequest) {
        QuestionDTO updatedQuestion = questionService.updateQuestion(id, questionRequest);
        if (updatedQuestion == null) {
            return new ResponseEntity<>("Question not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        QuestionDTO deletedQuestion = questionService.deleteQuestion(id);
        if (deletedQuestion == null) {
            return new ResponseEntity<>("Question not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(deletedQuestion, HttpStatus.OK);
    }

}