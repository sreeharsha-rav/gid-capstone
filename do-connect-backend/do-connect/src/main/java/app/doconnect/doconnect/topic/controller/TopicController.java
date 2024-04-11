package app.doconnect.doconnect.topic.controller;

import app.doconnect.doconnect.topic.dto.TopicRequest;
import app.doconnect.doconnect.topic.dto.TopicResponse;
import app.doconnect.doconnect.topic.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

/*
 * Controller class to define the REST API endpoints for the Topic service
 * getAllTopics - to get all topics
 * getTopicById - to get a topic by its ID
 * getTopicByName - to get a topic by its name
 * addNewTopic - to add a new topic
 * updateTopicById - to update a topic by its ID
 * deleteTopicById - to delete a topic by its ID
 */
@RestController
@RequestMapping("/api/topics")
public class TopicController {

    @Autowired
    private TopicService topicService;

    @GetMapping
    public ResponseEntity<?> getAllTopics() {
        List<TopicResponse> topicResponses = topicService.getAllTopics();
        if (topicResponses.isEmpty()) {
            return new ResponseEntity<>("No topics found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(topicResponses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTopicById(@PathVariable Long id) {
        TopicResponse topicResponse = topicService.getTopicById(id);
        if (topicResponse == null) {
            return new ResponseEntity<>("Topic not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(topicResponse, HttpStatus.OK);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<?> getTopicByName(@PathVariable String name) {
        TopicResponse topicResponse = topicService.getTopicByName(name);
        if (topicResponse == null) {
            return new ResponseEntity<>("Topic not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(topicResponse, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addNewTopic(@RequestBody TopicRequest topicRequest) {
        TopicResponse topicResponse = topicService.addNewTopic(topicRequest);
        if (topicResponse == null) {
            return new ResponseEntity<>("Topic not added", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(topicResponse, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTopicById(@PathVariable Long id, @RequestBody TopicRequest topicRequest) {
        TopicResponse topicResponse = topicService.updateTopicById(id, topicRequest);
        if (topicResponse == null) {
            return new ResponseEntity<>("Topic not updated", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(topicResponse, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTopicById(@PathVariable Long id) {
        TopicResponse topicResponse = topicService.deleteTopicById(id);
        if (topicResponse == null) {
            return new ResponseEntity<>("Topic not deleted", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(topicResponse, HttpStatus.OK);
    }

}
