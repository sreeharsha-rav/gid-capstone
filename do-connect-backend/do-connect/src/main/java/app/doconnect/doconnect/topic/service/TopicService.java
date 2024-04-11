package app.doconnect.doconnect.topic.service;

import app.doconnect.doconnect.topic.dto.TopicRequest;
import app.doconnect.doconnect.topic.dto.TopicResponse;
import app.doconnect.doconnect.topic.entity.Topic;

import java.util.List;

/*
 * TopicService interface to define the methods for the TopicService implementation
 * addNewTopic - to add a new topic
 * getAllTopics - to get all topics
 * getTopicById - to get a topic by its ID
 * getTopicByName - to get a topic by its name
 * updateTopicById - to update a topic by its ID
 * deleteTopicById - to delete a topic by its ID
 */
public interface TopicService {
    TopicResponse addNewTopic(TopicRequest topicRequest);
    List<Topic> addTopicList(List<String> topicList);
    List<TopicResponse> getAllTopics();
    TopicResponse getTopicById(Long id);
    TopicResponse getTopicByName(String name);
    TopicResponse updateTopicById(Long id, TopicRequest topicRequest);
    TopicResponse deleteTopicById(Long id);
}
