package app.doconnect.doconnect.question.service;

import app.doconnect.doconnect.question.dto.QuestionRequest;
import app.doconnect.doconnect.question.dto.QuestionResponse;
import app.doconnect.doconnect.question.entity.Question;
import app.doconnect.doconnect.question.repository.QuestionRespository;
import app.doconnect.doconnect.user.entity.User;
import app.doconnect.doconnect.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRespository questionRespository;

    @Override
    public QuestionResponse addQuestion(QuestionRequest questionRequest) {
        Optional<User> optionalUser = userRepository.findById(questionRequest.getUserId());
        if (optionalUser.isPresent()) {
            Question question = new Question();
            question.setTitle(questionRequest.getTitle());
            question.setBody(questionRequest.getBody());
            question.setTopics(questionRequest.getTopics());
            question.setUser(optionalUser.get());
            question.setDatePosted(new Date());
            System.out.println("question = " + question);
            Question createdQuestion = questionRespository.save(question);
            // Create a new QuestionResponse object and set the values
            QuestionResponse questionResponse = new QuestionResponse();
            questionResponse.setId(createdQuestion.getId());
            questionResponse.setTitle(createdQuestion.getTitle());
            questionResponse.setBody(createdQuestion.getBody());
            questionResponse.setTopics(createdQuestion.getTopics());
            questionResponse.setUserId(createdQuestion.getUser().getId());
            questionResponse.setDatePosted(createdQuestion.getDatePosted());
            return questionResponse;
        }
        return null;
    }

    @Override
    public List<QuestionResponse> getAllQuestions() {
        // TODO: Add pagination and optimize
        List<Question> questions = questionRespository.findAll();
        List<QuestionResponse> questionResponses = new ArrayList<>();
        for (Question question : questions) {
            QuestionResponse questionResponse = new QuestionResponse();
            questionResponse.setId(question.getId());
            questionResponse.setTitle(question.getTitle());
            questionResponse.setBody(question.getBody());
            questionResponse.setTopics(question.getTopics());
            questionResponse.setUserId(question.getUser().getId());
            questionResponse.setDatePosted(question.getDatePosted());
            questionResponses.add(questionResponse);
        }
        return questionResponses;
    }

    @Override
    public QuestionResponse getQuestionById(Long id) {
        Optional<Question> optionalQuestion = questionRespository.findById(id);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            QuestionResponse questionResponse = new QuestionResponse();
            questionResponse.setId(question.getId());
            questionResponse.setTitle(question.getTitle());
            questionResponse.setBody(question.getBody());
            questionResponse.setTopics(question.getTopics());
            questionResponse.setUserId(question.getUser().getId());
            questionResponse.setDatePosted(question.getDatePosted());
            return questionResponse;
        }
        return null;
    }

    @Override
    public QuestionResponse updateQuestion(Long id, QuestionRequest questionRequest) {
        Optional<Question> optionalQuestion = questionRespository.findById(id);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            question.setTitle(questionRequest.getTitle());
            question.setBody(questionRequest.getBody());
            question.setTopics(questionRequest.getTopics());
            Question updatedQuestion = questionRespository.save(question);
            // Create a new QuestionResponse object and set the values
            QuestionResponse questionResponse = new QuestionResponse();
            questionResponse.setId(updatedQuestion.getId());
            questionResponse.setTitle(updatedQuestion.getTitle());
            questionResponse.setBody(updatedQuestion.getBody());
            questionResponse.setTopics(updatedQuestion.getTopics());
            questionResponse.setUserId(updatedQuestion.getUser().getId());
            questionResponse.setDatePosted(updatedQuestion.getDatePosted());
            return questionResponse;
        }
        return null;
    }

    @Override
    public QuestionResponse deleteQuestion(Long id) {
        Optional<Question> optionalQuestion = questionRespository.findById(id);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            questionRespository.deleteById(id);
            QuestionResponse questionResponse = new QuestionResponse();
            questionResponse.setId(question.getId());
            questionResponse.setTitle(question.getTitle());
            questionResponse.setBody(question.getBody());
            questionResponse.setTopics(question.getTopics());
            questionResponse.setUserId(question.getUser().getId());
            questionResponse.setDatePosted(question.getDatePosted());
            return questionResponse;
        }
        return null;
    }

}
