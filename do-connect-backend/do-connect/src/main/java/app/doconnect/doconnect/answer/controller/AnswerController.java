package app.doconnect.doconnect.answer.controller;

import app.doconnect.doconnect.answer.dto.AnswerRequest;
import app.doconnect.doconnect.answer.dto.AnswerResponse;
import app.doconnect.doconnect.answer.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * Controller class to define the REST API endpoints for the Answer service
 * addAnswer - to add a new answer
 * getAllAnswers - to get all answers
 * getAnswer - to get an answer by its ID
 * updateAnswer - to update an answer by its ID
 * deleteAnswer - to delete an answer by its ID
 */
@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @PostMapping
    public ResponseEntity<?> addAnswer(@RequestBody AnswerRequest answerRequest) {
        AnswerResponse answerResponse = answerService.createAnswer(answerRequest);
        if (answerResponse == null) {
            return new ResponseEntity<>("Failed to post answer", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(answerResponse, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAllAnswers() {
        List<AnswerResponse> answerResponses = answerService.getAllAnswers();
        if (answerResponses.isEmpty()) {
            return new ResponseEntity<>("No answers found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(answerResponses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAnswer(@PathVariable Long id) {
        AnswerResponse answerResponse = answerService.getAnswer(id);
        if (answerResponse == null) {
            return new ResponseEntity<>("Answer not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(answerResponse, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAnswer(@PathVariable Long id, @RequestBody AnswerRequest answerRequest) {
        AnswerResponse answerResponse = answerService.updateAnswer(id, answerRequest);
        if (answerResponse == null) {
            return new ResponseEntity<>("Failed to update answer", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(answerResponse, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAnswer(@PathVariable Long id) {
        AnswerResponse answerResponse = answerService.deleteAnswer(id);
        if (answerResponse == null) {
            return new ResponseEntity<>("Failed to delete answer", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(answerResponse, HttpStatus.OK);
    }

}
