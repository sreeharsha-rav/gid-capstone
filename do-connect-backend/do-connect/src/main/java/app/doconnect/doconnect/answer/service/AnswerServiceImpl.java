package app.doconnect.doconnect.answer.service;

import app.doconnect.doconnect.answer.dto.AnswerRequest;
import app.doconnect.doconnect.answer.dto.AnswerResponse;
import app.doconnect.doconnect.answer.entity.Answer;
import app.doconnect.doconnect.answer.repository.AnswerRepository;
import app.doconnect.doconnect.question.dto.QuestionResponse;
import app.doconnect.doconnect.question.entity.Question;
import app.doconnect.doconnect.question.repository.QuestionRepository;
import app.doconnect.doconnect.question.service.QuestionService;
import app.doconnect.doconnect.user.dto.UserResponse;
import app.doconnect.doconnect.user.entity.User;
import app.doconnect.doconnect.user.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/*
 * Service class to implement the methods for the Answer service
 * createAnswer - to create a new answer
 * getAnswer - to get an answer by its ID
 * getAllAnswers - to get all answers
 * getAnswersByQuestionId - to get all answers by a question ID
 * updateAnswer - to update an answer by its ID
 * deleteAnswer - to delete an answer by its ID
 */
@Service
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    private UserService userService;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public AnswerResponse createAnswer(AnswerRequest answerRequest) {
        // Check if given question ID exists
        Long questionId = answerRequest.getQuestionId();
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);

        if (optionalQuestion.isPresent()) {
            // Get user from the request
            Long userId = answerRequest.getUserId();
            Optional<User> optionalUser = userService.findById(userId);

            if (!optionalUser.isPresent()) { // If user does not exist, abort
                return null;
            }

            // Create new answer object
            Answer answer = new Answer();
            answer.setAnswer(answerRequest.getAnswer());
            answer.setDatePosted(new Date());
            answer.setQuestion(optionalQuestion.get());
            answer.setUser(optionalUser.get());

            // Save the answer object
            Answer savedAnswer = answerRepository.save(answer);

            // Create user response object
            UserResponse userResponse = new UserResponse();
            userResponse.setId(savedAnswer.getUser().getId());
            userResponse.setName(savedAnswer.getUser().getName());

            // Create answer response object
            AnswerResponse answerResponse = new AnswerResponse();
            answerResponse.setId(savedAnswer.getId());
            answerResponse.setAnswer(savedAnswer.getAnswer());
            answerResponse.setDatePosted(savedAnswer.getDatePosted());
            answerResponse.setQuestionId(savedAnswer.getQuestion().getId()); // Get question ID from the question object
            answerResponse.setUser(userResponse);

            return answerResponse;
        }
        return null;
    }

    @Override
    public AnswerResponse getAnswer(Long id) {
        Answer answer = answerRepository.findById(id).orElse(null);
        if (answer != null) {
            // Create user response object
            UserResponse userResponse = new UserResponse();
            userResponse.setId(answer.getUser().getId());
            userResponse.setName(answer.getUser().getName());

            // Create answer response object
            AnswerResponse answerResponse = new AnswerResponse();
            answerResponse.setId(answer.getId());
            answerResponse.setAnswer(answer.getAnswer());
            answerResponse.setDatePosted(answer.getDatePosted());
            answerResponse.setQuestionId(answer.getQuestion().getId()); // Get question ID from the question object
            answerResponse.setUser(userResponse);

            return answerResponse;
        }
        return null;
    }

    @Override
    public List<AnswerResponse> getAllAnswers() {
        List<Answer> answers = answerRepository.findAll();
        if (answers != null) {
            // Create a list of answer response objects
            List<AnswerResponse> answerResponses = new ArrayList<>();
            for (Answer answer : answers) {
                // Create user response object
                UserResponse userResponse = new UserResponse();
                userResponse.setId(answer.getUser().getId());
                userResponse.setName(answer.getUser().getName());

                // Create answer response object
                AnswerResponse answerResponse = new AnswerResponse();
                answerResponse.setId(answer.getId());
                answerResponse.setAnswer(answer.getAnswer());
                answerResponse.setDatePosted(answer.getDatePosted());
                answerResponse.setQuestionId(answer.getQuestion().getId()); // Get question ID from the question object
                answerResponse.setUser(userResponse);

                answerResponses.add(answerResponse);
            }
            return answerResponses;
        }
        return null;
    }

    @Override
    public List<AnswerResponse> getAnswersByQuestionId(Long questionId) {
        List<Answer> answers = answerRepository.findAllByQuestionId(questionId);
        if (answers != null) {
            // Create a list of answer response objects
            List<AnswerResponse> answerResponses = new ArrayList<>();
            for (Answer answer : answers) {
                // Create user response object
                UserResponse userResponse = new UserResponse();
                userResponse.setId(answer.getUser().getId());
                userResponse.setName(answer.getUser().getName());

                // Create answer response object
                AnswerResponse answerResponse = new AnswerResponse();
                answerResponse.setId(answer.getId());
                answerResponse.setAnswer(answer.getAnswer());
                answerResponse.setDatePosted(answer.getDatePosted());
                answerResponse.setQuestionId(answer.getQuestion().getId()); // Get question ID from the question object
                answerResponse.setUser(userResponse);

                answerResponses.add(answerResponse);
            }
            return answerResponses;
        }
        return null;
    }

    @Override
    public AnswerResponse updateAnswer(Long id, AnswerRequest answerRequest) {
        Answer existingAnswer = answerRepository.findById(id).orElse(null);
        if (existingAnswer != null) {
            // Check if given question ID exists
            Long questionId = answerRequest.getQuestionId();
            Optional<Question> optionalQuestion = questionRepository.findById(questionId);

            if (optionalQuestion.isPresent()) {
                // Get user from the request
                Long userId = answerRequest.getUserId();
                Optional<User> optionalUser = userService.findById(userId);

                if (!optionalUser.isPresent()) { // If user does not exist, abort
                    return null;
                }

                // Update the answer object
                existingAnswer.setAnswer(answerRequest.getAnswer());
                existingAnswer.setDatePosted(new Date());
                existingAnswer.setQuestion(optionalQuestion.get());
                existingAnswer.setUser(optionalUser.get());

                // Save the answer object
                Answer savedAnswer = answerRepository.save(existingAnswer);

                // Create user response object
                UserResponse userResponse = new UserResponse();
                userResponse.setId(savedAnswer.getUser().getId());
                userResponse.setName(savedAnswer.getUser().getName());

                // Create answer response object
                AnswerResponse answerResponse = new AnswerResponse();
                answerResponse.setId(savedAnswer.getId());
                answerResponse.setAnswer(savedAnswer.getAnswer());
                answerResponse.setDatePosted(savedAnswer.getDatePosted());
                answerResponse.setQuestionId(savedAnswer.getQuestion().getId()); // Get question ID from the question object
                answerResponse.setUser(userResponse);

                return answerResponse;
            }
        }
        return null;
    }

    @Override
    @Transactional
    public AnswerResponse deleteAnswer(Long id) {
        Answer existingAnswer = answerRepository.findById(id).orElse(null);
        if (existingAnswer != null) {
            // Create user response object
            UserResponse userResponse = new UserResponse();
            userResponse.setId(existingAnswer.getUser().getId());
            userResponse.setName(existingAnswer.getUser().getName());

            // Create answer response object
            AnswerResponse answerResponse = new AnswerResponse();
            answerResponse.setId(existingAnswer.getId());
            answerResponse.setAnswer(existingAnswer.getAnswer());
            answerResponse.setDatePosted(existingAnswer.getDatePosted());
            answerResponse.setQuestionId(existingAnswer.getQuestion().getId()); // Get question ID from the question object
            answerResponse.setUser(userResponse);

            // Delete the answer object after creating the response object
            answerRepository.delete(existingAnswer);

            return answerResponse;
        }
        return null;
    }

}
