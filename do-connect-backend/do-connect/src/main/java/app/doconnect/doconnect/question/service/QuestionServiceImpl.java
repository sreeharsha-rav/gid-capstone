package app.doconnect.doconnect.question.service;

import app.doconnect.doconnect.question.dto.QuestionDTO;
import app.doconnect.doconnect.question.entity.Question;
import app.doconnect.doconnect.question.repository.QuestionRespository;
import app.doconnect.doconnect.user.entity.User;
import app.doconnect.doconnect.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRespository questionRespository;

    @Override
    public QuestionDTO addQuestion(QuestionDTO questionDTO) {
        Optional<User> optionalUser = userRepository.findById(questionDTO.getUserId());
        if (optionalUser.isPresent()) {
            Question question = new Question();
            question.setTitle(questionDTO.getTitle());
            question.setBody(questionDTO.getBody());
            question.setTopics(questionDTO.getTopics());
            question.setDatePosted(new Date());
            Question createdQuestion = questionRespository.save(question);
            // Create a new QuestionDTO object and set the values
            QuestionDTO createdQuestionDTO = new QuestionDTO();
            createdQuestionDTO.setId(createdQuestion.getId());
            createdQuestionDTO.setTitle(createdQuestion.getTitle());
            return createdQuestionDTO;
        }
        return null;
    }
}
