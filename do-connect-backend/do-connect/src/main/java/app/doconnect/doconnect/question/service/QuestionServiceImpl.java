package app.doconnect.doconnect.question.service;

import app.doconnect.doconnect.question.dto.QuestionDTO;
import app.doconnect.doconnect.question.dto.QuestionRequest;
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
    public QuestionDTO addQuestion(QuestionRequest questionRequest) {
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
            // Create a new QuestionDTO object and set the values
            QuestionDTO createdQuestionDTO = new QuestionDTO();
            createdQuestionDTO.setId(createdQuestion.getId());
            createdQuestionDTO.setTitle(createdQuestion.getTitle());
            createdQuestionDTO.setBody(createdQuestion.getBody());
            createdQuestionDTO.setTopics(createdQuestion.getTopics());
            createdQuestionDTO.setUserId(createdQuestion.getUser().getId());
            return createdQuestionDTO;
        }
        return null;
    }

    @Override
    public List<QuestionDTO> getAllQuestions() {
        List<Question> questions = questionRespository.findAll();
        List<QuestionDTO> questionDTOs = new ArrayList<>();
        for (Question question : questions) {
            QuestionDTO questionDTO = new QuestionDTO();
            questionDTO.setId(question.getId());
            questionDTO.setTitle(question.getTitle());
            questionDTOs.add(questionDTO);
        }
        return questionDTOs;
    }

    @Override
    public QuestionDTO getQuestionById(Long id) {
        Optional<Question> optionalQuestion = questionRespository.findById(id);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            QuestionDTO questionDTO = new QuestionDTO();
            questionDTO.setId(question.getId());
            questionDTO.setTitle(question.getTitle());
            return questionDTO;
        }
        return null;
    }

    @Override
    public QuestionDTO updateQuestion(Long id, QuestionRequest questionRequest) {
        Optional<Question> optionalQuestion = questionRespository.findById(id);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            question.setTitle(questionRequest.getTitle());
            question.setBody(questionRequest.getBody());
            question.setTopics(questionRequest.getTopics());
            Question updatedQuestion = questionRespository.save(question);
            QuestionDTO updatedQuestionDTO = new QuestionDTO();
            updatedQuestionDTO.setId(updatedQuestion.getId());
            updatedQuestionDTO.setTitle(updatedQuestion.getTitle());
            return updatedQuestionDTO;
        }
        return null;
    }

    @Override
    public QuestionDTO deleteQuestion(Long id) {
        Optional<Question> optionalQuestion = questionRespository.findById(id);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            questionRespository.deleteById(id);
            QuestionDTO questionDTO = new QuestionDTO();
            questionDTO.setId(question.getId());
            questionDTO.setTitle(question.getTitle());
            return questionDTO;
        }
        return null;
    }

}
