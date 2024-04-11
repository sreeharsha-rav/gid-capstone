package app.doconnect.doconnect.question.service;

import app.doconnect.doconnect.question.dto.QuestionRequest;
import app.doconnect.doconnect.question.dto.QuestionResponse;
import app.doconnect.doconnect.question.entity.Question;
import app.doconnect.doconnect.topic.dto.TopicResponse;
import app.doconnect.doconnect.topic.entity.Topic;
import app.doconnect.doconnect.topic.service.TopicService;
import app.doconnect.doconnect.user.dto.UserResponse;
import app.doconnect.doconnect.user.entity.User;
import app.doconnect.doconnect.user.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import app.doconnect.doconnect.question.repository.QuestionRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/*
 * This class implements the QuestionService interface and provides the implementation for the methods.
 * addQuestion - to add a new question
 * getQuestionsByTopicId - to get all questions by topic ID
 * getAllQuestions - to get all questions
 * getQuestionById - to get a question by its ID
 * updateQuestion - to update a question by its ID
 * deleteQuestion - to delete a question by its ID
 */
@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private UserService userService;

    @Autowired
    private TopicService topicService;

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public QuestionResponse addQuestion(QuestionRequest questionRequest) {
        // Get the user by ID
        Long userId = questionRequest.getUserId();
        Optional<User> optionalUser = userService.findById(userId);

        // Check if the user exists
        if (optionalUser.isPresent()) {

            // Add the topics to the database if they do not already exist
            List<Topic> topics = topicService.addTopicList(questionRequest.getTopics());

            // Create a new Question object and set the values
            Question question = new Question();
            question.setTitle(questionRequest.getTitle());
            question.setBody(questionRequest.getBody());
            question.setUser(optionalUser.get());
            question.setDatePosted(new Date()); // Set the current date
            question.setTopics(topics);

            // Save the question to the database
            Question createdQuestion = questionRepository.save(question);

            // Create a UserResponse object and set the values
            UserResponse userResponse = new UserResponse();
            userResponse.setId(createdQuestion.getUser().getId());
            userResponse.setName(createdQuestion.getUser().getName());

            // Create a topic list and set the values
            List<String> topicNames = new ArrayList<>();
            for (Topic topic : createdQuestion.getTopics()) {
                topicNames.add(topic.getName());
            }

            // Create a new QuestionResponse object and set the values
            QuestionResponse questionResponse = new QuestionResponse();
            questionResponse.setId(createdQuestion.getId());
            questionResponse.setTitle(createdQuestion.getTitle());
            questionResponse.setBody(createdQuestion.getBody());
            questionResponse.setDatePosted(createdQuestion.getDatePosted());
            questionResponse.setTopics(topicNames);
            questionResponse.setUser(userResponse);

            return questionResponse;
        }
        return null;
    }

    @Override
    public List<QuestionResponse> getQuestionsByTopicId(Long topicId) {
        TopicResponse topicResponse = topicService.getTopicById(topicId);
        if (topicResponse != null) {
            List <Question> questions = questionRepository.findByTopics_Id(topicId);

            // Check if the list is empty
            if (questions.isEmpty()) {
                return null;
            }

            // Create a list of QuestionResponse objects
            List<QuestionResponse> questionResponses = new ArrayList<>();

            for (Question question : questions) {
                // Create a new QuestionResponse object and set the values
                QuestionResponse questionResponse = new QuestionResponse();

                // Create a new UserResponse object and set the values
                UserResponse userResponse = new UserResponse();
                userResponse.setId(question.getUser().getId());
                userResponse.setName(question.getUser().getName());

                // Create a topic list and set the values
                List<String> topicNames = new ArrayList<>();
                for (Topic topic : question.getTopics()) {
                    topicNames.add(topic.getName());
                }

                // Set the values of the QuestionResponse object
                questionResponse.setId(question.getId());
                questionResponse.setTitle(question.getTitle());
                questionResponse.setBody(question.getBody());
                questionResponse.setDatePosted(question.getDatePosted());
                questionResponse.setTopics(topicNames);
                questionResponse.setUser(userResponse);

                // Add the QuestionResponse object to the list
                questionResponses.add(questionResponse);
            }
            return questionResponses;
        }
        return null;
    }

    @Override
    public List<QuestionResponse> getAllQuestions() {   // TODO: Add pagination and optimize the query
        List<Question> questions = questionRepository.findAll();

        // Create a list of QuestionResponse objects
        List<QuestionResponse> questionResponses = new ArrayList<>();
        for (Question question : questions) {

            // Create a new QuestionResponse object and set the values
            QuestionResponse questionResponse = new QuestionResponse();

            // Create a new UserResponse object and set the values
            UserResponse userResponse = new UserResponse();
            userResponse.setId(question.getUser().getId());
            userResponse.setName(question.getUser().getName());

            // Create a topic list and set the values
            List<String> topicNames = new ArrayList<>();
            for (Topic topic : question.getTopics()) {
                topicNames.add(topic.getName());
            }

            // Set the values of the QuestionResponse object
            questionResponse.setId(question.getId());
            questionResponse.setTitle(question.getTitle());
            questionResponse.setBody(question.getBody());
            questionResponse.setDatePosted(question.getDatePosted());
            questionResponse.setTopics(topicNames);
            questionResponse.setUser(userResponse);

            // Add the QuestionResponse object to the list
            questionResponses.add(questionResponse);
        }
        return questionResponses;
    }

    @Override
    public QuestionResponse getQuestionById(Long id) {
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();

            // Create a new QuestionResponse object and set the values
            QuestionResponse questionResponse = new QuestionResponse();

            // Create a new UserResponse object and set the values
            UserResponse userResponse = new UserResponse();
            userResponse.setId(question.getUser().getId());
            userResponse.setName(question.getUser().getName());

            // Create a topic list and set the values
            List<String> topicNames = new ArrayList<>();
            for (Topic topic : question.getTopics()) {
                topicNames.add(topic.getName());
            }

            questionResponse.setId(question.getId());
            questionResponse.setTitle(question.getTitle());
            questionResponse.setBody(question.getBody());
            questionResponse.setDatePosted(question.getDatePosted());
            questionResponse.setTopics(topicNames);
            questionResponse.setUser(userResponse);

            return questionResponse;
        }
        return null;
    }

    @Override
    public QuestionResponse updateQuestion(Long id, QuestionRequest questionRequest) {
        // Get the question by ID
        Optional<Question> optionalQuestion = questionRepository.findById(id);

        // Check if the question exists
        if (optionalQuestion.isPresent()) {

            // Add the topics to the database if they do not already exist
            List<Topic> topics = topicService.addTopicList(questionRequest.getTopics());

            // Get the question object
            Question question = optionalQuestion.get();
            question.setTitle(questionRequest.getTitle());
            question.setBody(questionRequest.getBody());
            question.setTopics(topics);

            // Save the updated question to the database
            Question updatedQuestion = questionRepository.save(question);

            // Create a new QuestionResponse object and set the values
            QuestionResponse questionResponse = new QuestionResponse();

            // Create a new UserResponse object and set the values
            UserResponse userResponse = new UserResponse();
            userResponse.setId(updatedQuestion.getUser().getId());
            userResponse.setName(updatedQuestion.getUser().getName());

            // Create a topic list and set the values
            List<String> topicNames = new ArrayList<>();
            for (Topic topic : updatedQuestion.getTopics()) {
                topicNames.add(topic.getName());
            }

            // Set the values of the QuestionResponse object
            questionResponse.setId(updatedQuestion.getId());
            questionResponse.setTitle(updatedQuestion.getTitle());
            questionResponse.setBody(updatedQuestion.getBody());
            questionResponse.setDatePosted(updatedQuestion.getDatePosted());
            questionResponse.setTopics(topicNames);
            questionResponse.setUser(userResponse);

            return questionResponse;
        }
        return null;
    }

    @Override
    @Transactional
    public QuestionResponse deleteQuestion(Long id) {
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();

            // Create a new QuestionResponse object
            QuestionResponse questionResponse = new QuestionResponse();

            // Create a new UserResponse object and set the values
            UserResponse userResponse = new UserResponse();
            userResponse.setId(question.getUser().getId());
            userResponse.setName(question.getUser().getName());

            // Create a topic list and set the values
            List<String> topicNames = new ArrayList<>();
            for (Topic topic : question.getTopics()) {
                topicNames.add(topic.getName());
            }

            // Set the values of the QuestionResponse object
            questionResponse.setId(question.getId());
            questionResponse.setTitle(question.getTitle());
            questionResponse.setBody(question.getBody());
            questionResponse.setDatePosted(question.getDatePosted());
            questionResponse.setTopics(topicNames);
            questionResponse.setUser(userResponse);

            // Delete the question after fetching the details
            questionRepository.deleteById(id);

            return questionResponse;
        }
        return null;
    }

}
