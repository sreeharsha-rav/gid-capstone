package app.doconnect.doconnect.topic.service;

import app.doconnect.doconnect.topic.dto.TopicRequest;
import app.doconnect.doconnect.topic.dto.TopicResponse;
import app.doconnect.doconnect.topic.entity.Topic;
import app.doconnect.doconnect.topic.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/*
 * This class implements the TopicService interface and provides the implementation for the methods.
 * getAllTopics - to get all topics
 * getTopicById - to get a topic by its ID
 * getTopicByName - to get a topic by its name
 * addNewTopic - to add a new topic
 * updateTopicById - to update a topic by its ID
 * deleteTopicById - to delete a topic by its ID
 */
@Service
public class TopicServiceImpl implements TopicService {

    @Autowired
    private TopicRepository topicRepository;

    @Override
    public List<TopicResponse> getAllTopics() {
        List<Topic> topics = topicRepository.findAll();
        if (topics != null) {
            // Create a list of response objects
            List<TopicResponse> topicResponses = new ArrayList<>();
            for (Topic topic : topics) {
                TopicResponse topicResponse = new TopicResponse();
                topicResponse.setId(topic.getId());
                topicResponse.setName(topic.getName());
                topicResponse.setDescription(topic.getDescription());
                topicResponses.add(topicResponse);
            }
            return topicResponses;
        }
        return null;
    }

    /*
     * This method adds a list of topics to the database, if the topic does not already exist.
     * If the topic already exists, it is added to the list of topics.
     * @param topicList - the list of topics to be added, stored as strings
     * @return the list of topics that were added, stored as Topic objects
     */
    @Override
    public List<Topic> addTopicList(List<String> topicList) {
        List<Topic> topics = new ArrayList<>();
        for (String topicName : topicList) {
            topicName = topicName.toLowerCase();    // Convert the topic name to lowercase
            Optional<Topic> optionalTopic = topicRepository.findByName(topicName);
            if (optionalTopic.isPresent()) {
                topics.add(optionalTopic.get());
            } else {
                Topic topic = new Topic();
                topic.setName(topicName);
                Topic savedTopic = topicRepository.save(topic);
                topics.add(savedTopic);
            }
        }
        return topics;
    }

    @Override
    public TopicResponse getTopicById(Long id) {
        Topic topic = topicRepository.findById(id).orElse(null);
        if (topic != null) {
            // Create a response object
            TopicResponse topicResponse = new TopicResponse();
            topicResponse.setId(topic.getId());
            topicResponse.setName(topic.getName());
            topicResponse.setDescription(topic.getDescription());
            return topicResponse;
        }
        return null;
    }

    @Override
    public TopicResponse getTopicByName(String name) {
        Optional<Topic> optionalTopic = topicRepository.findByName(name);
        if (optionalTopic.isPresent()) {
            Topic topic = optionalTopic.get();

            // Create a response object
            TopicResponse topicResponse = new TopicResponse();
            topicResponse.setId(topic.getId());
            topicResponse.setName(topic.getName());
            topicResponse.setDescription(topic.getDescription());
            return topicResponse;
        }
        return null;
    }

    @Override
    public TopicResponse addNewTopic(TopicRequest topicRequest) {
        Topic topic = new Topic();
        String topicName = topicRequest.getName().toLowerCase();    // Convert the topic name to lowercase

        // Check if the topic already exists
        Optional<Topic> optionalTopic = topicRepository.findByName(topicName);
        if (optionalTopic.isPresent()) {
            return null;
        }

        topic.setName(topicName);
        topic.setDescription(topicRequest.getDescription());
        Topic savedTopic = topicRepository.save(topic);

        // Create a response object
        TopicResponse topicResponse = new TopicResponse();
        topicResponse.setId(savedTopic.getId());
        topicResponse.setName(savedTopic.getName());
        topicResponse.setDescription(savedTopic.getDescription());
        return topicResponse;
    }

    @Override
    public TopicResponse updateTopicById(Long id, TopicRequest topicRequest) {
        Topic existingTopic = topicRepository.findById(id).orElse(null);
        if (existingTopic != null) {
            // Update the topic
            existingTopic.setName(topicRequest.getName());
            existingTopic.setDescription(topicRequest.getDescription());
            Topic updatedTopic = topicRepository.save(existingTopic);

            // Create a response object
            TopicResponse topicResponse = new TopicResponse();
            topicResponse.setId(updatedTopic.getId());
            topicResponse.setName(updatedTopic.getName());
            topicResponse.setDescription(updatedTopic.getDescription());

            return topicResponse;
        }
        return null;
    }

    @Override
    public TopicResponse deleteTopicById(Long id) {
        Topic existingTopic = topicRepository.findById(id).orElse(null);
        if (existingTopic != null) {
            topicRepository.delete(existingTopic);
            // Create a response object
            TopicResponse topicResponse = new TopicResponse();
            topicResponse.setId(existingTopic.getId());
            topicResponse.setName(existingTopic.getName());
            topicResponse.setDescription(existingTopic.getDescription());
            return topicResponse;
        }
        return null;
    }

}
