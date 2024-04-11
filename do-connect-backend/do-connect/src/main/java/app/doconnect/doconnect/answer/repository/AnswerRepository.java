package app.doconnect.doconnect.answer.repository;

import app.doconnect.doconnect.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long>{
    List<Answer> findAllByQuestionId(Long questionId);
}
